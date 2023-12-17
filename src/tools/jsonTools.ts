import axios from "axios";
import { nanoid } from "nanoid";

const JSON_SERVER_BASE_URL = "http://localhost:4000/todos";
type T = { id: string; title: string; content: string; isDone: boolean };

export const postTodos = async (formState: T) => {
  const newTodo = {
    id: nanoid(),
    title: formState.title,
    content: formState.content,
    isDone: false,
  };
  try {
    const { data } = await axios.post(JSON_SERVER_BASE_URL, newTodo);
    console.log(data);
  } catch (err) {
    alert("에러발생");
  }
};

export const getTodos = async () => {
  const { data } = await axios.get(JSON_SERVER_BASE_URL);
  //   const { id, title, content, isDone } = data;
  console.log("첫 데이터", data);
};

export const deleteTodos1 = async (id: string) => {
  try {
    const re = await axios.delete(`${JSON_SERVER_BASE_URL}/${id}`);
    // console.log("이거", re);
  } catch (err) {
    // console.log("저거", err);
    alert("실패");
  }
};

export const updateTodos1 = async (id: string, isDone: boolean) => {
  const { data } = await axios.patch(`${JSON_SERVER_BASE_URL}/${id}`, {
    isDone: !isDone,
  });
};

export {};
