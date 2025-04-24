import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './features/tasks/TaskList';
import './styles.css';
import { ThemeProvider, ThemeContext } from "./ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

const Main = () => {
  const { isDark, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <button onClick={toggleTheme}>
        Switch to {isDark ? "Light" : "Dark"} Mode
      </button>
      <div className="app">
        <h1>Task Manager App</h1>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
};

export default App;
