import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  updateValue: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      const manipulatedValue = [...state.value, action.payload];
      state.value = manipulatedValue;
    },
    fetchToDo: (state, action) => {
      state.value = [...action.payload];
    },
    deleteToDo: (state, action) => {
      const newData = state.value.filter((item) => item.id !== action.payload);
      state.value = [...newData];
    },
    updateToDo: (state, action) => {
      const index = state.value.findIndex(
        (obj) => obj.id === action.payload.id
      );
      state.value[index] = { ...action.payload };
      state.updateValue = null;
    },
    selectedToDo: (state, action) => {
      const newData = state.value.filter((item) => item.id === action.payload);
      state.updateValue = { ...newData[0] };
    },
  },
});

export const { addToDo, fetchToDo, deleteToDo, updateToDo, selectedToDo } =
  todoSlice.actions;

export const selectToDo = (state) => state.todo.value;
export const selectUpdateToDo = (state) => state.todo.updateValue;

export default todoSlice.reducer;
