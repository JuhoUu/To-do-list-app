document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const errorMessage = document.getElementById('error-message');
    const todoList = document.getElementById('todo-list');
    const openTasksCounter = document.getElementById('open-tasks-counter');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        todoList.innerHTML = '';
        let openTasksCount = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            if (task.completed) {
                li.classList.add('completed');
            } else {
                openTasksCount++;
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.classList.add('checkbox');
            checkbox.addEventListener('change', () => {
                toggleTask(index);
            });
            li.appendChild(checkbox);

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            li.appendChild(taskText);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                removeTask(index);
            });
            li.appendChild(deleteButton);

            todoList.appendChild(li);
        });

        openTasksCounter.textContent = openTasksCount;

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add new task
    function addTask(text) {
        tasks.push({ text, completed: false });
        renderTasks();
    }

    // Function to remove task
    function removeTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText.length >= 3) { // Tarkistetaan, että tehtävä sisältää vähintään kolme merkkiä
            addTask(taskText);
            todoInput.value = '';
            errorMessage.textContent = '';
            todoInput.classList.remove('is-invalid');
        } else {
            errorMessage.textContent = '';
            todoInput.classList.add('is-invalid');
        }
    });

    renderTasks();
});
