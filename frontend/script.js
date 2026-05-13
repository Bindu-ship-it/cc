const API_URL = 'https://cc-xncf.onrender.com/tasks';

async function loadTasks() {

  const response = await fetch(API_URL);
  let tasks = await response.json();

  const search = document
    .getElementById('searchInput')
    .value
    .toLowerCase();

  tasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search)
  );

  document.getElementById('taskCount').innerText =
    `Total Tasks: ${tasks.length}`;

  const taskList = document.getElementById('taskList');

  taskList.innerHTML = '';

  tasks.forEach(task => {

    const li = document.createElement('li');

    li.className = task.completed ? 'completed' : '';

    li.innerHTML = `
      <div class="task-header">

        <div>
          <strong>${task.title}</strong>
          <br>
          <small>
            ${new Date(task.createdAt).toLocaleString()}
          </small>
        </div>

        <span class="priority ${task.priority}">
          ${task.priority}
        </span>

      </div>

      <br>

      <button onclick="toggleTask(${task.id})">
        ${task.completed ? 'Undo' : 'Complete'}
      </button>

      <button onclick="deleteTask(${task.id})">
        Delete
      </button>
    `;

    taskList.appendChild(li);
  });
}

async function addTask() {

  const input = document.getElementById('taskInput');

  const priority = document.getElementById('priority').value;

  if (!input.value) {
    alert('Enter task');
    return;
  }

  await fetch(API_URL, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      title: input.value,
      priority
    })
  });

  input.value = '';

  loadTasks();
}

async function deleteTask(id) {

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  loadTasks();
}

async function toggleTask(id) {

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT'
  });

  loadTasks();
}

loadTasks();