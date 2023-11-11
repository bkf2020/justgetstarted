var taskStarted = localStorage.getItem("taskStarted");
var taskStartedName = localStorage.getItem("taskStartedName");
var endOfTaskStarted = localStorage.getItem("endOfTaskStarted");
var tasks = localStorage.getItem("tasks");
var cnt = localStorage.getItem("cnt");
var idTaskStarted = localStorage.getItem("idTaskStarted");
if(localStorage.getItem("taskStarted") === null) taskStarted = false;
if(localStorage.getItem("taskStartedName") === null) taskStartedName = "";
if(localStorage.getItem("endOfTaskStarted") === null) endOfTaskStarted = 0;
if(localStorage.getItem("cnt") === null) cnt = 0;
if(localStorage.getItem("idTaskStarted") === null) idTaskStarted = "";

if(localStorage.getItem("tasks") === null) tasks = [];
else {
    tasks = JSON.parse(tasks);
}

if(taskStarted) {
    taskStarted = false;
    startTask((Math.round(endOfTaskStarted) - Date.now()) / (60 * 1000), taskStartedName, idTaskStarted);
}
var tasks2 = tasks;
tasks = [];
for(var i = 0; i < tasks2.length; i++) {
    addTask(tasks2[i]["text"], tasks2[i]["length"], tasks2[i]["id"]);
}

function startTask(lengthOfTaskMins, taskName, id) {
    if(taskStarted) {
        alert("Cannot start a new task");
        return;
    }
    taskStarted = true;
    localStorage.setItem("taskStarted", taskStarted);
    localStorage.setItem("taskStartedName", taskName);
    console.log(id);
    localStorage.setItem("idTaskStarted", id);
    document.getElementById("taskTime").style = "";
    document.getElementById("timer").setAttribute("current-time", Date.now());
    var millisecondsToEnd = lengthOfTaskMins * 60 * 1000;
    document.getElementById("timer").setAttribute("end-time", Date.now() + millisecondsToEnd);
    localStorage.setItem("endOfTaskStarted", Date.now() + millisecondsToEnd);
    document.getElementById("currentTask").innerText = "Current task: " + taskName;
    updateTimers();
}

function endTask(id) {
    taskStarted = false;
    localStorage.setItem("taskStarted", taskStarted);
    var tasks2 = tasks;
    tasks = []
    for(var i = 0; i < tasks2.length; i++) {
        if(tasks2[i]["id"] !== id) tasks.push(tasks2[i]);
    }
    try {
        document.getElementById(id).remove();
    } catch {
    }
}

function addTask(taskName, taskLength, id) {
    var newTaskRow = document.createElement("tr");
    newTaskRow.setAttribute("id", id);

    var newTask = document.createElement("td");
    newTask.innerText = taskName;
    newTaskRow.appendChild(newTask);
    
    var newLength = document.createElement("td");
    newLength.innerText = Math.round(taskLength);
    newTaskRow.appendChild(newLength);

    var buttonColumn = document.createElement("td");
    var startTimerButton = document.createElement("button");
    startTimerButton.innerText = "Start task";
    startTimerButton.classList.add("button");
    startTimerButton.classList.add("is-small");
    startTimerButton.classList.add("is-outlined");
    startTimerButton.classList.add("is-success");
    startTimerButton.addEventListener("click", function(event) {
        startTask(newLength.innerText, newTask.innerText, id);
    });
    buttonColumn.appendChild(startTimerButton);
    newTaskRow.appendChild(buttonColumn);

    if(newTask.innerText === "") return;
    if(Math.round(taskLength) <= 0) {
        alert("Please enter a valid INTEGER GREATER than 0 for the task time.");
        return;
    }
    tasks.push({"text": newTask.innerText, "length": newLength.innerText, "id": id});
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("tasks").appendChild(newTaskRow);
    document.getElementById("inputTask").value = "";
    document.getElementById("inputLength").value = "";
}

document.getElementById("addButton").addEventListener("click", function(event) {
    console.log("taskRow" + cnt.toString());
    var id = "taskRow" + cnt.toString();
    addTask(document.getElementById("inputTask").value, document.getElementById("inputLength").value, id);
    cnt++;
    localStorage.setItem("cnt", cnt);
});

