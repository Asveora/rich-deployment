	//SCTN-REDIRECT-FUNCTION
	//This function determines what address visitors will be redirected to when they are met with this redirect page. Simply change the URL that the visitors will be redirected to.
  
	let seconds = 10;  
	const countdownElement = document.getElementById("countdown");  
 
	const interval = setInterval(function() {  
		seconds--;  
		countdownElement.textContent = seconds;  
 
		if (seconds <= 0) {  
			clearInterval(interval); // Stops the countdown of the function.
			window.location.href = "profile-home.html"; // This is the URL that the visitor will be redirected to.
		}
	// Controls the amount of time between each countdown interval. Calculated in Milliseconds where 1000 MS = 1S!
	//For exmaple, if you set the value to 2000, there would be a two second delay between the total number of countdown seconds.
	//This would mean that if you set "let seconds" to 6 you would have to wait 12 seconds for the countdown to finish. Leave the value at 1000 to match real seconds.
	}, 1000);