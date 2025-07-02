const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksList = document.getElementById('tasks-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const texto = taskInput.value.trim();
  if (texto === '') return;

  const newTask = {
    id: crypto.randomUUID(),
    texto,
    time: new Date().toDateString().replace(' ', ',')
  };

  tasks.unshift(newTask);
  saveTasks(); 
  taskInput.value = '';
  renderTasks();
});

function eliminarTarea(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  tasksList.innerHTML = '';
  tasks.forEach(task => {
    const taskEl = document.createElement('div');
    taskEl.className = 'task-container';

    taskEl.innerHTML = `
      <div>
        <div class="task-text">${task.texto}</div>
        <div class="task-info">
          <div class="task-progress"><progress value="0" max="100"></progress> 0%</div>
          <div class="task-time">${task.time}</div>
        </div>
      </div>
      <div class="task-icon" data-id="${task.id}">🗑️</div>
    `;

    taskEl.querySelector('.task-icon').addEventListener('click', () => eliminarTarea(task.id));

    tasksList.appendChild(taskEl);
  });
}

// Guardar tareas en localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
