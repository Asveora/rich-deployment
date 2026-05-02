	// SCTN-EVENT-BANNERS-AREA
	// Cycles through the list of event banners.
	// Base code written by www.chirpinternet.eu and modified by AmzroSevca!

	window.addEventListener("DOMContentLoaded", (e) => {
		document.querySelectorAll(".lhub-dash-fading-slideshow > a").forEach((current) => {
			current.addEventListener("animationend", (e) => {
				e.target.parentNode.appendChild(e.target);
			});
		});

	});