function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const task = document.getElementById(data);
  ev.target.closest('.column').querySelector('.task-container').appendChild(task);
  saveTasks();

document.getElementById('task-container').addEventListener('input', function() {
  console.log(this.value);
});



}

function addTask(columnId) {
  const taskText = prompt("Enter task:");
  if (taskText) {
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.ondragstart = drag;
    task.id = "task-" + new Date().getTime();
    task.innerText = taskText;
    document.getElementById(columnId + "-tasks").appendChild(task);
    saveTasks();
  }
}

function saveTasks() {
  const columns = ['todo', 'inprogress', 'done'];
  const data = {};
  columns.forEach(col => {
    const tasks = Array.from(document.getElementById(col + "-tasks").children)
      .map(task => task.innerText);
    data[col] = tasks;
  });
  localStorage.setItem("tasks", JSON.stringify(data));
}

function loadTasks() {
  const data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) return;
  Object.entries(data).forEach(([col, tasks]) => {
    const container = document.getElementById(col + "-tasks");
    container.innerHTML = "";
    tasks.forEach(text => {
      const task = document.createElement("div");
      task.className = "task";
      task.draggable = true;
      task.ondragstart = drag;
      task.id = "task-" + new Date().getTime() + Math.random();
      task.innerText = text;
      container.appendChild(task);




    });
  });
}

window.onload = loadTasks;
