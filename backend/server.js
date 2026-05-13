const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

let tasks = [
  {
    id: 1,
    title: 'Complete mini project',
    completed: false,
    priority: 'High',
    createdAt: new Date()
  }
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    priority: req.body.priority || 'Medium',
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.json(newTask);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: 'Task deleted' });
});

// Toggle complete
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  res.json({ message: 'Task updated' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});