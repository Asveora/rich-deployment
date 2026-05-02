	// SCTN-NETWORK-MEMBER-COUNTS
	// Fetches the data from both the Stoat and Matrix APIs.
  
	Promise.all([
		fetch("https://api.stoat.chat/invites/5wB2Zzb0").then(r => {
			if (!r.ok) throw new Error("Stoat fetch failed");
			return r.json();
		}),
		fetch("https://matrix-member-count.asveora-social.workers.dev").then(r => {
			if (!r.ok) throw new Error("Matrix fetch failed");
			return r.json();
		})
	])
  
	// Combines the fetched numbers from Stoat and Matrix.
  
	.then(([stoatData, matrixData]) => {
		const stoatCount = Number(stoatData.member_count) || 0;
		const matrixCount = Number(matrixData.count) || 0;

		const total = stoatCount + matrixCount;

		document.getElementById("totalCount").textContent = total;
	})
  
	// Helps with debugging any possible conflicts or problems with pulling in API data.
  
	.catch(error => {
		console.error(error);
		document.getElementById("totalCount").textContent = "Error";
	});