var taskStarted = false;

function startTask(lengthOfTaskMins, taskName) {
    if(taskStarted) {
        alert("Cannot start a new task");
        return;
    }
    taskStarted = true;
    document.getElementById("taskTime").style = "";
    document.getElementById("timer").setAttribute("current-time", Date.now());
    var millisecondsToEnd = lengthOfTaskMins * 60 * 1000;
    document.getElementById("timer").setAttribute("end-time", Date.now() + millisecondsToEnd);
    document.getElementById("currentTask").innerText = "Current task: " + taskName; 
    updateTimers();
}

document.getElementById("addButton").addEventListener("click", function(event) {
    var newTaskRow = document.createElement("tr");
    
    var newTask = document.createElement("td");
    newTask.innerText = document.getElementById("inputTask").value;
    newTaskRow.appendChild(newTask);
    
    var newLength = document.createElement("td");
    newLength.innerText = Math.round(document.getElementById("inputLength").value);
    newTaskRow.appendChild(newLength);

    var buttonColumn = document.createElement("td");
    var startTimerButton = document.createElement("button");
    startTimerButton.innerText = "Start task";
    startTimerButton.classList.add("button");
    startTimerButton.classList.add("is-small");
    startTimerButton.classList.add("is-outlined");
    startTimerButton.classList.add("is-success");
    startTimerButton.addEventListener("click", function(event) {
        startTask(newLength.innerText, newTask.innerText);
    });
    buttonColumn.appendChild(startTimerButton);
    newTaskRow.appendChild(buttonColumn);

    if(newTask.innerText === "") return;
    if(Math.round(document.getElementById("inputLength").value) <= 0) {
        alert("Please enter a valid INTEGER GREATER than 0 for the task time.");
        return;
    }

    document.getElementById("tasks").appendChild(newTaskRow);
    document.getElementById("inputTask").value = "";
    document.getElementById("inputLength").value = "";
});

