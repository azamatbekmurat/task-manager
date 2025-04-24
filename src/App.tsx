import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './features/tasks/TaskList';
import './styles.css';

function App() {
  return (
    <div className="app">
      <h1>Task Manager App</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;
