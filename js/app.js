const form = document.getElementById("task-form");
const projectNameInput = document.getElementById("project-name");
const taskNameInput = document.getElementById("task-name");
const dueDateInput = document.getElementById("due-date");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
	taskList.innerHTML = "";

	if (tasks.length === 0) {
		emptyMessage.hidden = false;
		return;
	}

	emptyMessage.hidden = true;

	tasks.forEach(function (task) {
		const taskCard = document.createElement("article");

		const taskTitle = document.createElement("h3");
		taskTitle.textContent = task.taskName;

		const projectInfo = document.createElement("p");
		projectInfo.textContent = `Project: ${task.projectName}`;

		const dueInfo = document.createElement("p");
		dueInfo.textContent = `Due: ${task.dueDate}`;

		taskCard.appendChild(taskTitle);
		taskCard.appendChild(projectInfo);
		taskCard.appendChild(dueInfo);

		taskList.appendChild(taskCard);
	});
}

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const projectName = projectNameInput.value.trim();
	const taskName = taskNameInput.value.trim();
	const dueDate = dueDateInput.value;

	const newTask = {
		projectName: projectName,
		taskName: taskName,
		dueDate: dueDate
	};

	tasks.push(newTask);

	saveTasks();
	displayTasks();

	form.reset();
});

displayTasks();