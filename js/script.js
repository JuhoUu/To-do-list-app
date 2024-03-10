document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const errorMessage = document.getElementById('error-message');
    const todoList = document.getElementById('todo-list');
    const openTasksCounter = document.getElementById('open-tasks-counter');

    // Ladataan taskit localStoragesta
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Koodi tehtävien renderöimiseksi näytölle
    function renderTasks() {
        todoList.innerHTML = '';
        let openTasksCount = 0;
    
        tasks.forEach((task, index) => {
            // Luodaan uusi listaelementti ja lisätään sille tarvittavat luokat
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            if (task.completed) {
                // Jos tehtävä on suoritettu, lisätään sille "completed"-luokka
                li.classList.add('completed');
            } else {
                // Muuten kasvatetaan avointen tehtävien laskuria
                openTasksCount++;
            }
    
            // Luodaan checkbox, joka merkitsee tehtävän suoritetuksi
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.classList.add('checkbox');
            checkbox.addEventListener('change', () => {
                toggleTask(index);
            });
            li.appendChild(checkbox);
    
            // Luodaan tekstielementti tehtävän tekstille
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            li.appendChild(taskText);
    
            // Luodaan poistonappi tehtävälle
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                removeTask(index);
            });
            li.appendChild(deleteButton);
    
            // Lisätään luotu listaelementti tehtävälistalle
            todoList.appendChild(li);
        });
    
        // Päivitetään avointen tehtävien laskuri näyttämään oikea lukumäärä
        openTasksCounter.textContent = openTasksCount;
    
        // Tallennetaan tehtävät paikalliseen tallennustilaan
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    

    // Funktio taskien lisäämiseksi
    function addTask(text) {
        tasks.push({ text, completed: false });
        renderTasks();
    }

    // Funktio taskien poistamiseksi
    function removeTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Funktio taskin tilan vaihtamiseksi
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Estetään lomakkeen lähettäminen ja lisätään taski  tehtävälistaan, jos syöte on vähintään kolme merkkiä pitkä
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
