import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from './Todoslice';

const store = configureStore({
    reducer: {
        tasks: TodoSlice
    },
});

export default store;
