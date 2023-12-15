import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { nanoid } from "nanoid";

function App() {
  // const [title, setTitle] = useState<string>("");
  // const [content, setContent] = useState<string>("");
  type T = { id: string; title: string; content: string; isDone: boolean };
  const [todos, setTodos] = useState<T[]>([]);
  const initialForm = {
    id: "",
    title: "",
    content: "",
    isDone: false,
  };
  const [formState, setFormState] = useState<T>(initialForm);

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

  const OnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const DeleteHandler = (id: string) => {
    const fiteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    const confirmedData = window.confirm("정말로 삭제할꺼에여?");
    if (confirmedData) {
      setTodos(fiteredTodos);
    }
  };
  const UpdateHandler = (id: string) => {
    const ChangedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodos(ChangedTodos);
  };
  const notYetTodos = todos.filter((todo) => {
    return todo.isDone === false;
  });
  const completedTodos = todos.filter((todo) => {
    return todo.isDone === true;
  });
  return (
    <Container className="App">
      {" "}
      <Content>
        <ZeMOK>투두리스트</ZeMOK>
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
        <div style={{ backgroundColor: "black", color: "white" }}>미완</div>
        <Section1>
          <>
            {notYetTodos.map((todo) => {
              return (
                <ListWrapper key={todo.id}>
                  <div>아이디 : {todo.id}</div>
                  <div>제목 : {todo.title}</div>
                  <div>내용 : {todo.content}</div>
                  <div>상태 : {todo.isDone ? "완료" : "미완료"}</div>
                  <button onClick={() => UpdateHandler(todo.id)}>완료</button>
                  <button onClick={() => DeleteHandler(todo.id)}>
                    삭제하기
                  </button>
                </ListWrapper>
              );
            })}
          </>
        </Section1>
        <div style={{ backgroundColor: "black", color: "white" }}>완료</div>
        <Section2>
          <>
            {completedTodos.map((todo) => {
              return (
                <ListWrapper key={todo.id}>
                  <div>아이디 : {todo.id}</div>
                  <div>제목 : {todo.title}</div>
                  <div>내용 : {todo.content}</div>
                  <div>상태 : {todo.isDone ? "완료" : "미완료"}</div>
                  <button onClick={() => UpdateHandler(todo.id)}>취소</button>
                  <button onClick={() => DeleteHandler(todo.id)}>
                    삭제하기
                  </button>
                </ListWrapper>
              );
            })}
          </>
        </Section2>{" "}
      </Content>
    </Container>
  );
}

export default App;

const Container = styled.body`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  min-width: 800px;
`;
const ZeMOK = styled.div`
  background-color: yellow;
  font-size: 50px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Header = styled.form`
  background-color: lightcyan;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Section1 = styled.section`
  background-color: lightblue;
  height: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
const Section2 = styled.section`
  background-color: lightpink;
  height: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const ListWrapper = styled.div`
  height: 180px;
  width: 180px;
  background-color: lightgoldenrodyellow;
`;
