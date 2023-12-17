import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getTodos = async () => {
  const { data } = await axios.get<T[]>(JSON_SERVER_BASE_URL);
  //   const { id, title, content, isDone } = data;
  console.log("첫 데이터", data);
  return data;
};

type T = { id: string; title: string; content: string; isDone: boolean };
const JSON_SERVER_BASE_URL = "http://localhost:4000/todos";
type U = {
  todos: T[];
  isLoading: boolean;
  isError: boolean;
  error: any;
};

const initialState: U = {
  todos: [],
  isLoading: true,
  isError: false,
  error: null,
};

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (_, thunkAPI: any) => {
    try {
      const todos = await getTodos();
      return todos;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const __editTodo = createAsyncThunk(
  "editTodo",
  async ({ id, isDone }: { id: string; isDone: boolean }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`${JSON_SERVER_BASE_URL}/${id}`, {
        isDone: !isDone,
      });

      const todos = await getTodos();
      return todos;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "deleteTodo",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${JSON_SERVER_BASE_URL}/${id}`);
      const todos = await getTodos();
      return todos;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __addTodo = createAsyncThunk(
  "addTodo",
  async (newTodo: T, thunkAPI: any) => {
    try {
      await axios.post(JSON_SERVER_BASE_URL, newTodo);
      const todos = await getTodos();
      return todos;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // setTodos: (state, action) => {
    //   return action.payload;
    // },
    //
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

  extraReducers: (builder) => {
    builder.addCase(__addTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(__getTodos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(__deleteTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(__editTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(__editTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(__editTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default todoSlice.reducer;
// export const { /*addTodos, deleteTodo, updateTodo,*/ setTodos } =
//   todoSlice.actions;
