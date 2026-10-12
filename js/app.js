let projects = [];
let tasks = [];

const projectForm = document.getElementById("project-form");
const taskForm = document.getElementById("task-form");

const projectSelect = document.getElementById("project-select");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");


function addProject(event) {
    event.preventDefault();

    const projectName =
        document.getElementById("new-project-name").value.trim();

    const projectDueDate =
        document.getElementById("new-project-due-date").value;

    if (!projectName || !projectDueDate) {
        return;
    }

    let projectExists = false;

    projects.forEach(function(project) {
        if (project.projectName === projectName) {
            projectExists = true;
        }
    });

    if (projectExists) {
        alert("That project already exists.");
        return;
    }

    const project = {
        projectName: projectName,
        projectDueDate: projectDueDate,
        completed: false
    };

    projects.push(project);

    saveProjects();
    projectForm.reset();

    displayProjectOptions();
    displayTasks();
}


function addTask(event) {
    event.preventDefault();

    const projectName =
        projectSelect.value;

    const taskName =
        document.getElementById("task-name").value.trim();

    const taskDetails =
        document.getElementById("task-details").value.trim();

    const dueDate =
        document.getElementById("due-date").value;

    if (!projectName || !taskName || !dueDate) {
        return;
    }

    const task = {
        projectName: projectName,
        taskName: taskName,
        details: taskDetails,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    taskForm.reset();

    displayTasks();
}


function formatDate(dueDate) {
    const parts = dueDate.split("-");

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const date = new Date(
        year,
        month - 1,
        day
    );

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

    const date = new Date(
        year,
        month - 1,
        day
    );

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

    const taskDate = new Date(
        year,
        month - 1,
        day
    );

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    if (taskDate < today) {
        return "Past Due";
    }

    if (taskDate.getTime() === today.getTime()) {
        return "Due Today";
    }

    return "In Process";
}


function displayProjectOptions() {
    projectSelect.innerHTML =
        '<option value="">Choose a project</option>';

    projects.forEach(function(project) {
        if (!project.completed) {
            projectSelect.innerHTML += `
                <option value="${project.projectName}">
                    ${project.projectName}
                </option>
            `;
        }
    });
}


function toggleComplete(index) {
    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    displayTasks();
}


function toggleProjectComplete(index) {
    projects[index].completed =
        !projects[index].completed;

    saveProjects();

    displayProjectOptions();
    displayTasks();
}


function toggleTaskDetails(index) {
    const details =
        document.getElementById(
            `task-details-${index}`
        );

    const button =
        document.getElementById(
            `details-button-${index}`
        );

    if (details.hidden) {
        details.hidden = false;
        button.textContent = "Hide Details";
    } else {
        details.hidden = true;
        button.textContent = "Details";
    }
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

    if (projects.length === 0) {
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;

    projects.sort(function(a, b) {
        return new Date(a.projectDueDate) -
            new Date(b.projectDueDate);
    });

    let currentMonth = "";

    projects.forEach(function(project, projectIndex) {
        const monthYear =
            getMonthYear(project.projectDueDate);

        if (monthYear !== currentMonth) {
            taskList.innerHTML += `
                <h2 class="month-heading">
                    ${monthYear}
                </h2>
            `;

            currentMonth = monthYear;
        }

        let projectStatus = "Active";

        if (project.completed) {
            projectStatus = "Completed";
        }

        let projectHTML = `
            <section class="project-section ${project.completed ? "project-completed" : ""}">

                <div class="project-heading">

                    <h3>
                        ${project.projectName}
                    </h3>

                    <p>
                        Project Due:
                        ${formatDate(project.projectDueDate)}
                    </p>

                    <p>
                        Project Status:
                        ${projectStatus}
                    </p>

                    <button
                        onclick="toggleProjectComplete(${projectIndex})"
                    >
                        ${project.completed
                            ? "Reopen Project"
                            : "Complete Project"}
                    </button>

                </div>

                <article class="project-card">

                    <div class="project-tasks">
        `;

        let projectHasTasks = false;

        tasks.forEach(function(task, index) {
            if (task.projectName === project.projectName) {
                projectHasTasks = true;

                let status =
                    getDeadlineStatus(task.dueDate);

                let statusClass =
                    "task-in-process";

                if (status === "Past Due") {
                    statusClass =
                        "task-overdue";
                }

                if (task.completed) {
                    status =
                        "Completed";

                    statusClass =
                        "task-completed";
                }

                projectHTML += `
                    <section
                        class="task-item ${statusClass}"
                    >

                        <h4>
                            ${task.taskName}
                        </h4>

                        <p>
                            Task Due:
                            ${formatDate(task.dueDate)}
                        </p>

                        <p>
                            Status:
                            ${status}
                        </p>

                        <button
                            id="details-button-${index}"
                            onclick="toggleTaskDetails(${index})"
                        >
                            Details
                        </button>

                        <button
                            onclick="toggleComplete(${index})"
                        >
                            ${task.completed
                                ? "Mark Incomplete"
                                : "Mark Complete"}
                        </button>

                        <button
                            onclick="deleteTask(${index})"
                        >
                            Delete
                        </button>

                        <div
                            id="task-details-${index}"
                            class="task-details"
                            hidden
                        >

                            <p>
                                <strong>
                                    Details:
                                </strong>
                            </p>

                            <p>
                                ${task.details
                                    ? task.details
                                    : "No details have been added for this task."}
                            </p>

                        </div>

                    </section>
                `;
            }
        });

        if (!projectHasTasks) {
            projectHTML += `
                <p>
                    No tasks have been added
                    to this project yet.
                </p>
            `;
        }

        projectHTML += `
                    </div>

                </article>

            </section>
        `;

        taskList.innerHTML += projectHTML;
    });
}


function saveProjects() {
    try {
        localStorage.setItem(
            "projects",
            JSON.stringify(projects)
        );
    } catch (error) {
        alert(
            "Unable to save projects."
        );
    }
}


function loadProjects() {
    try {
        const saved =
            localStorage.getItem("projects");

        if (saved) {
            projects =
                JSON.parse(saved);
        } else {
            projects = [];
        }

    } catch (error) {
        projects = [];
    }
}


function saveTasks() {
    try {
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );
    } catch (error) {
        alert(
            "Unable to save tasks."
        );
    }
}


function loadTasks() {
    try {
        const saved =
            localStorage.getItem("tasks");

        if (saved) {
            tasks =
                JSON.parse(saved);
        } else {
            tasks = [];
        }

    } catch (error) {
        tasks = [];
    }
}


projectForm.addEventListener(
    "submit",
    addProject
);

taskForm.addEventListener(
    "submit",
    addTask
);


loadProjects();
loadTasks();

displayProjectOptions();
displayTasks();
