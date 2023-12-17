import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setTodos } from "../redux/mo/modules/todoSlice";
import { postTodos } from "../tools/jsonTools";
import axios from "axios";

export default function Nav() {
  type T = { id: string; title: string; content: string; isDone: boolean };
  const dispatch = useDispatch();
  const JSON_SERVER_BASE_URL = "http://localhost:4000/todos";
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
  const OnSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postTodos(formState);
    getTodos();
    setFormState(initialForm);
  };

  const getTodos = async () => {
    const { data } = await axios.get(JSON_SERVER_BASE_URL);
    const { id, title, content, isDone } = data;
    console.log("첫 데이터", data);
    dispatch(setTodos(data));
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
