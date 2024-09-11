const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value;
    if (taskText) {
        const task = {
            text: taskText,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });
        li.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTasks();