import React, { useState } from "react";
import styled from "styled-components";
// import { __addTodo } from "../redux/mo/modules/todoSlice";
import { nanoid } from "nanoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodos } from "../redux/mo/modules/queryFns";

export default function Nav() {
  type T = { id: string; title: string; content: string; isDone: boolean };
  const JSON_SERVER_BASE_URL = "http://localhost:4000/todos";
  const initialForm = {
    id: "",
    title: "",
    content: "",
    isDone: false,
  };
  const [formState, setFormState] = useState<T>(initialForm);

  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addTodos,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const OnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev: T) => ({ ...prev, [name]: value }));
  };
  const OnSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const newTodo = {
      id: nanoid(),
      title: formState.title,
      content: formState.content,
      isDone: false,
    };
    e.preventDefault();

    mutateToAdd(newTodo);
    setFormState(initialForm);
  };

  return (
    <Header onSubmit={OnSubmitHandler}>
      <span>제목</span>{" "}
      <input
        name="title"
        value={formState.title}
        onChange={OnchangeHandler}
      ></input>
      <span>내용</span>{" "}
      <input
        name="content"
        value={formState.content}
        onChange={OnchangeHandler}
      ></input>
      <br />
      <button disabled={!formState.title || !formState.content}>
        추가하기
      </button>
    </Header>
  );
}
const Header = styled.form`
  background-color: lightcyan;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
