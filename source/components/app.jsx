import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css'; 
import logow from './logow.png'; 
import { FaLinkedin, FaGithub } from 'react-icons/fa';


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const handleEditTask = (editedTask) => {
    setTasks(tasks.map(task => task.id === editedTask.id ? editedTask : task));
    setTaskToEdit(null); 
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="app">
      <header className="header">
        <img src={logow} alt="Logo" className="header-logo" />
        <h1>To-Do List</h1>
      </header>
      <main>
        <TaskForm 
          onSubmit={taskToEdit ? handleEditTask : handleAddTask} 
          initialData={taskToEdit} 
        />
        <TaskList
          tasks={tasks}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />
      </main>
      <footer className="footer">
        <p className='ff'>© 2024 To-Do List App</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/wassimmourali/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/WassimMourali" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;