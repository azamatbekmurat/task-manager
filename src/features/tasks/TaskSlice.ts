import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const loadFromStorage = (): Task[] => {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};

const initialState: TaskState = {
  tasks: loadFromStorage(),
};

const saveToStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
      saveToStorage(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveToStorage(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveToStorage(state.tasks);
    },
    updateTaskOrder: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveToStorage(state.tasks);
    }
  },
});

export const { addTask, toggleTask, deleteTask, updateTaskOrder } = taskSlice.actions;
export default taskSlice.reducer;
