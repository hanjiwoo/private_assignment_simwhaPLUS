import { createSlice } from "@reduxjs/toolkit";

type T = { id: string; title: string; content: string; isDone: boolean };

const initialState: T[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },

    // addTodos: (state, action) => {
    //   const newtodo = action.payload;
    //   return [newtodo, ...state];
    // },
    // deleteTodo: (state, action) => {
    //   const id = action.payload;
    //   const fiteredTodos = state.filter((todo: T) => {
    //     return todo.id !== id;
    //   });
    //   return fiteredTodos;
    // },
    // updateTodo: (state, action) => {
    //   const id = action.payload;
    //   const ChangedTodos = state.map((todo: T) => {
    //     if (id === todo.id) {
    //       return { ...todo, isDone: !todo.isDone };
    //     } else {
    //       return todo;
    //     }
    //   });
    //   return ChangedTodos;
    // },
  },
});

export default todoSlice.reducer;
export const { /*addTodos, deleteTodo, updateTodo,*/ setTodos } =
  todoSlice.actions;
