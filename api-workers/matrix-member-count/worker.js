	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	// MATRIX CLIENT LOGIC
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

	// If you are confused about any part of this code or the worker configuration process, please reach out within the Asveora Network Plaza community at https://stt.gg/5wB2Zzb0!
	// This worker was built for use with Cloudflare and its systems through its dashboard. Everything mentioned here will be dashboard related and managed through it.
	// This first section of the worker.js file will set up the MatrixClient class which will have members that define key values that we need for logging in and retrieving access tokens.
	// It will first start with retrieving the "session" key (written as sessionKey in code) which has been stored in your Workers KV namespace called "MATRIX_AUTH" under Workers KV.
	// If you DO NOT have a "MATRIX_AUTH" namespace, set one up under Workers KV or else none of this will work. In that namespace create a "session" key. Store the following code as its value.
	//
	// {
	//		"access_token": "YOUR_MATRIX_ACCESS_TOKEN",
	//		"user_id": "@yourusername:yourhomeserveraddress.org",
	//		"device_id": "YOUR_DEVICE_ID",
	//		"saved_at": 1710000000000
	// }
	//
	// DO NOT COPY THE double forward slashes at the start of each line. Those are just to denote that what you are reading here is a javascript comment (and so javascript interpret this as code).
	// If you need to find the values for your matrix access token and device id, please read the get-matrix-tokens-README.txt file.
	// Make sure that you are replacing the user id with your username after the @ sign and then your full homeserver address after the colon including its proper domain ending.
	// Some homeservers might have a domain ending of .com, .xyz, .org, .net, .chat, etc.
	
	class MatrixClient {
		constructor(env) {
		this.env = env;
		this.baseUrl = "https://matrix-client.matrix.org"; // Change this URL if you are using a homeserver other than matrix.org (which you probably will be).
		this.accessToken = null;
		this.sessionKey = "session";
		}

		// oooooooooooooooooooooooooooooo
		// KV SESSION HANDLING
		// oooooooooooooooooooooooooooooo
		
		// This will pull in the values we put in our session key and turn the data into a string that can be used to exchange data with the web server.

		async loadSession() {
		return await this.env.MATRIX_KV.get(this.sessionKey, "json");
		}

		async saveSession(data) {
		await this.env.MATRIX_KV.put(this.sessionKey, JSON.stringify(data));
		}

		// oooooooooooooooooooooooooooooo
		// MATRIX LOGIN AUTHORIZATION
		// oooooooooooooooooooooooooooooo
		
		// This will handle the login process with the provided MATRIX_USER and MATRIX_PASSWORD values that you should have stored as secrets.
		// These secrets should be stored under "Variables and Secrets" under the "Settings" tab of your matrix-member-count worker in the Cloudflare dashboard.
		// The function will login and check for the validity of the access token. If the access token has expired it will login until it receives a fresh access token.
		
		async login() {
		const res = await fetch(`${this.baseUrl}/_matrix/client/v3/login`, {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			type: "m.login.password",
			identifier: {
			  type: "m.id.user",
			  user: this.env.MATRIX_USER,
			},
			password: this.env.MATRIX_PASSWORD,
		  }),
		});

		if (!res.ok) {
		  throw new Error(`Login failed: ${await res.text()}`);
		}

		const data = await res.json();

		this.accessToken = data.access_token;

		await this.saveSession({
		  access_token: data.access_token,
		  user_id: data.user_id,
		  device_id: data.device_id,
		  saved_at: Date.now(),
		});

		return this.accessToken;
		}

		async ensureAuth() {
		if (this.accessToken) return this.accessToken;

		const session = await this.loadSession();

		if (session?.access_token) {
		  this.accessToken = session.access_token;
		  return this.accessToken;
		}

		return await this.login();
		}

		// oooooooooooooooooooooooooooooo
		// CORE REQUEST WRAPPER
		// oooooooooooooooooooooooooooooo
		
		// Necessary check for the validity of the current token. If it has expired, a new login will be executed. Stay aware of "M_UNKNOWN_TOKEN" which will signal the expiration.
		
		async request(path) {
		await this.ensureAuth();

		let res = await fetch(this.baseUrl + path, {
		  headers: {
			Authorization: `Bearer ${this.accessToken}`,
		  },
		});

		// Token invalid → re-login once
		if (res.status === 401) {
		  const err = await res.clone().json().catch(() => null);

		  if (err?.errcode === "M_UNKNOWN_TOKEN") {
			await this.login();

			res = await fetch(this.baseUrl + path, {
			  headers: {
				Authorization: `Bearer ${this.accessToken}`,
			  },
			});
		  }
		}

		return res;
		}

		// oooooooooooooooooooooooooooooo
		// ROOM MEMBER COUNT
		// oooooooooooooooooooooooooooooo
		
		// This will pull in the target data from the API concerning the number of participants within a Matrix room. Spaces are treated as rooms in Matrix.
		
		async getJoinedCount(roomId) {
		const res = await this.request(
		  `/_matrix/client/v3/rooms/${roomId}/joined_members`
		);

		if (!res.ok) {
		  throw new Error(await res.text());
		}

		const data = await res.json();

		return data.joined ? Object.keys(data.joined).length : 0;
		}
	}

	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	// WORKER LOGIC
	// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	
	// If you are confused about any part of this code or the worker configuration process, please reach out within the Asveora Network Plaza community at https://stt.gg/5wB2Zzb0!
	// You MUST update your allowedOrigins from the default links provided or else you will not be able to display the requested data on your landhub page or any other HTML page.
	// If your landhub has the domain name of "mylandhub.app" then you must replace the three links below with your link.
	// If you have multiple domains that you want to approve requests for then you must list those domains each on their own line and separated by a comma as demonstrated.
	
	export default {
		async fetch(request, env) {
			const allowedOrigins = [
				"https://www.asveora.social",
				"https://framework.asveora.social",
				"https://wheelcore.asveora.social"
			];

			const origin = request.headers.get("Origin");
			const corsHeader = allowedOrigins.includes(origin) ? origin : "null";

			// oooooooooooooooooooooooooooooo
			// CORS preflight
			// oooooooooooooooooooooooooooooo
			
			// This ensures that it is safe to send the request through.
		
			if (request.method === "OPTIONS") {
				return new Response(null, {
					headers: {
						"Access-Control-Allow-Origin": corsHeader,
						"Access-Control-Allow-Methods": "GET, OPTIONS",
						"Access-Control-Allow-Headers": "Content-Type",
					},
				});
			}

			// oooooooooooooooooooooooooooooo
			// ENFORCEMENT OF ORIGINS
			// oooooooooooooooooooooooooooooo
			
			// This ensures that no other domain origins can use this API worker you built other than the ones that you listed under allowedOrigins.
			// This is VERY important since you do not want unauthorized use of your API worker to drive up requests that you have no control over.
			
			if (origin && !allowedOrigins.includes(origin)) {
				return new Response("Forbidden", { status: 403 });
			}

			const ROOM_ID = "!jtUktAqaZAHPnhNBDH:matrix.org";

			const matrix = new MatrixClient(env);

			try {
				const count = await matrix.getJoinedCount(ROOM_ID);

				return new Response(JSON.stringify({ count }), {
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": corsHeader,
						"Cache-Control": "public, max-age=60",
					},
				});
			} catch (err) {
				return new Response(
					JSON.stringify({ error: err.message }),
					{ status: 500 }
				);
			}
		}
	};