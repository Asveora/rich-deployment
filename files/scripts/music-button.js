	//SCTN-MUSIC-BUTTON-FUNCTION
	//This music button function determines what music plays when the button is clicked on. Change the link within the quotes of new Audio to a link of any supported audio filetype.

	const audio = new Audio("https://cdn.asveora.social/PageBin/profile-v4/Sound-Select/alphaproxy-chillhop-mix-136000.mp3");
	const buttons = document.querySelectorAll(".profile-home-music-button");

	buttons.forEach(button => {
		button.addEventListener("click", () => {
			audio.play();
		});
	});