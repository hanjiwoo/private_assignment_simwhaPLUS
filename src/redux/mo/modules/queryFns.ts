import axios from "axios";

type T = { id: string; title: string; content: string; isDone: boolean };

const JSON_SERVER_BASE_URL = "http://localhost:4000/todos";

export const getTodos = async () => {
  const { data } = await axios.get<T[]>(JSON_SERVER_BASE_URL);
  return data;
};

export const addTodos = async (newTodo: T) => {
  await axios.post(JSON_SERVER_BASE_URL, newTodo);
};

export const deleteTodo = async (id: string) => {
  await axios.delete(`${JSON_SERVER_BASE_URL}/${id}`);
};

export const editTodo = async ({
  id,
  isDone,
}: {
  id: string;
  isDone: boolean;
}) => {
  await axios.patch(`${JSON_SERVER_BASE_URL}/${id}`, {
    isDone: !isDone,
  });
};
