let tasks = [];

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

function addTask(event) {
    event.preventDefault();

    const projectName = document.getElementById("project-name").value.trim();
    const projectDueDate = document.getElementById("project-due-date").value;
    const taskName = document.getElementById("task-name").value.trim();
    const dueDate = document.getElementById("due-date").value;

    if (!projectName || !projectDueDate || !taskName || !dueDate) {
        return;
    }

    const task = {
        projectName: projectName,
        projectDueDate: projectDueDate,
        taskName: taskName,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    form.reset();

    displayTasks();
}

function formatDate(dueDate) {
    const parts = dueDate.split("-");

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function getMonthYear(dueDate) {
    const parts = dueDate.split("-");

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
}

function getDeadlineStatus(dueDate) {
    const parts = dueDate.split("-");

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const taskDate = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (taskDate < today) {
        return "Overdue";
    }

    if (taskDate.getTime() === today.getTime()) {
        return "Due Today";
    }

    return "Upcoming";
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    const task = tasks[index];

    if (confirm(`Delete "${task.taskName}"?`)) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;

    const projects = [];

    tasks.forEach(function(task, index) {
        let matchingProject = null;

        for (let i = 0; i < projects.length; i++) {
            if (
                projects[i].projectName === task.projectName &&
                projects[i].projectDueDate === task.projectDueDate
            ) {
                matchingProject = projects[i];
            }
        }

        if (!matchingProject) {
            matchingProject = {
                projectName: task.projectName,
                projectDueDate: task.projectDueDate,
                tasks: []
            };

            projects.push(matchingProject);
        }

        matchingProject.tasks.push({
            task: task,
            index: index
        });
    });

    projects.sort(function(a, b) {
        return new Date(a.projectDueDate) - new Date(b.projectDueDate);
    });

    let currentMonth = "";

    projects.forEach(function(project) {
        const monthYear = getMonthYear(project.projectDueDate);

        if (monthYear !== currentMonth) {
            taskList.innerHTML += `
                <h2 class="month-heading">${monthYear}</h2>
            `;

            currentMonth = monthYear;
        }

        let projectHTML = `
            <article class="project-card">
                <h3>${project.projectName}</h3>
                <p>Project Due: ${formatDate(project.projectDueDate)}</p>

                <div class="project-tasks">
        `;

        project.tasks.forEach(function(item) {
            const task = item.task;
            const index = item.index;

            let status = getDeadlineStatus(task.dueDate);

            if (task.completed) {
                status = "Completed";
            }

            projectHTML += `
                <section class="task-item">
                    <h4>${task.taskName}</h4>
                    <p>Task Due: ${formatDate(task.dueDate)}</p>
                    <p>Status: ${status}</p>

                    <button onclick="toggleComplete(${index})">
                        ${task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>

                    <button onclick="deleteTask(${index})">
                        Delete
                    </button>
                </section>
            `;
        });

        projectHTML += `
                </div>
            </article>
        `;

        taskList.innerHTML += projectHTML;
    });
}

function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        alert("Unable to save tasks. Storage may be disabled.");
    }
}

function loadTasks() {
    try {
        const saved = localStorage.getItem("tasks");

        if (saved) {
            tasks = JSON.parse(saved);
        } else {
            tasks = [];
        }
    } catch (error) {
        tasks = [];
    }
}

form.addEventListener("submit", addTask);

loadTasks();
displayTasks();
