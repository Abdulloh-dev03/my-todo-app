import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};


export const todoTasks = createAsyncThunk('tasks/todoTasks', async () => {
  const response = await axios.get('https://tudu.pythonanywhere.com/api/v1/todos/');
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post('https://tudu.pythonanywhere.com/api/v1/todos/create/', task);
  return response.data;
});

export const editTask = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
  const response = await axios.patch(`https://tudu.pythonanywhere.com/api/v1/todos/${id}/update/`, task);
  return { id, task: response.data };
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`https://tudu.pythonanywhere.com/api/v1/todos/${id}/delete/`);
  return id;
});

const TodoSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todoTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(todoTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(todoTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { id, task } = action.payload;
        const index = state.tasks.findIndex((t) => t.id === id);
        if (index !== -1) {
          state.tasks[index] = task;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default TodoSlice.reducer;
