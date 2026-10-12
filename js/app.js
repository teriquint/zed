const form = document.getElementById("task-form");
const projectNameInput = document.getElementById("project-name");
const taskNameInput = document.getElementById("task-name");
const dueDateInput = document.getElementById("due-date");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const projectName = projectNameInput.value.trim();
	const taskName = taskNameInput.value.trim();
	const dueDate = dueDateInput.value;

	const taskCard = document.createElement("article");

	taskCard.innerHTML = `
		<h3>${taskName}</h3>
		<p><strong>Project:</strong> ${projectName}</p>
		<p><strong>Due:</strong> ${dueDate}</p>
	`;

	taskList.appendChild(taskCard);

	emptyMessage.hidden = true;

	form.reset();
});