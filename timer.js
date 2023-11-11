function updateTimers() {
	var timer = document.getElementById('timer');
	var millisecondsLeft = timer.getAttribute('end-time') - Date.now();
	if(millisecondsLeft >= 1000) {
		var totSeconds = Math.floor(millisecondsLeft / 1000);
		var seconds = totSeconds % 60;
		totSeconds -= totSeconds % 60;
		totSeconds /= 60;
			
		var minutes = totSeconds % 60;
		totSeconds -= totSeconds % 60;
		totSeconds /= 60;

		var hours = totSeconds % 24;
		totSeconds -= totSeconds % 24;
		totSeconds /= 24;
						
		var days = totSeconds;

		var timeToDisplay = days.toString() + "d " + hours.toString() + "h " + minutes.toString() + "m " + seconds.toString() + "s";
		timer.innerText = timeToDisplay;
		setTimeout(updateTimers, 100);
	} else {
        var timeToDisplay = "Task is finished, removed from list";
        timer.innerText = timeToDisplay;
        endTask(localStorage.getItem("idTaskStarted"));
	}
}