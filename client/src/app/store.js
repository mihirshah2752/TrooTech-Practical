import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Pages/ToDo/ToDoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
