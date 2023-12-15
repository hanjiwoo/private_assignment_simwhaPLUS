import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../redux/mo/modules/todoSlice";

export default function Nav() {
  type T = { id: string; title: string; content: string; isDone: boolean };
  const todos = useSelector((state: any) => state.todos);
  const dipatch = useDispatch();
  const initialForm = {
    id: "",
    title: "",
    content: "",
    isDone: false,
  };
  const [formState, setFormState] = useState<T>(initialForm);

  const OnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev: T) => ({ ...prev, [name]: value }));
  };
  const OnSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dipatch(
      setTodos({
        id: nanoid(),
        title: formState.title,
        content: formState.content,
        isDone: false,
      })
    );
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
