import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

type props = {
  todos: any;
  formState: any;
  setTodos: any;
  initialForm: any;
  setFormState: any;
};

export default function Nav({
  todos,
  setTodos,
  formState,
  initialForm,
  setFormState,
}: props) {
  const OnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev: {}) => ({ ...prev, [name]: value }));
  };
  const OnSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([
      {
        id: nanoid(),
        title: formState.title,
        content: formState.content,
        isDone: false,
      },
      ...todos,
    ]);
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
      <button>추가하기</button>
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
