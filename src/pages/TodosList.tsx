import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteTodo, updateTodo } from "../redux/mo/modules/todoSlice";

export default function TodosList({ listType }: { listType: boolean }) {
  type T = { id: string; title: string; content: string; isDone: boolean };
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  const DeleteHandler = (id: string) => {
    // const fiteredTodos = todos.filter((todo: T) => {
    //   return todo.id !== id;
    // });
    const confirmedData = window.confirm("정말로 삭제할꺼에여?");
    if (confirmedData) {
      // setTodos(fiteredTodos);
      dispatch(deleteTodo(id));
    }
  };
  const UpdateHandler = (id: string) => {
    // const ChangedTodos = todos.map((todo: T) => {
    //   if (id === todo.id) {
    //     return { ...todo, isDone: !todo.isDone };
    //   } else {
    //     return todo;
    //   }
    // });
    // setTodos(ChangedTodos);
    dispatch(updateTodo(id));
  };

  const notYetTodos = todos.filter((todo: T) => {
    return todo.isDone === false;
  });
  const completedTodos = todos.filter((todo: T) => {
    return todo.isDone === true;
  });

  const changedTodos = listType ? completedTodos : notYetTodos;
  return (
    <>
      {" "}
      <div style={{ backgroundColor: "black", color: "white" }}>
        {listType ? "완료된투두" : "해야할투두"}
      </div>
      <Section1>
        <>
          {changedTodos.map((todo: T) => {
            return (
              <ListWrapper key={todo.id}>
                <div>아이디 : {todo.id}</div>
                <div>제목 : {todo.title}</div>
                <div>내용 : {todo.content}</div>
                <div>상태 : {todo.isDone ? "완료" : "미완료"}</div>
                <button onClick={() => UpdateHandler(todo.id)}>
                  {listType ? "취소" : "완료"}
                </button>
                <button onClick={() => DeleteHandler(todo.id)}>삭제하기</button>
              </ListWrapper>
            );
          })}
        </>
      </Section1>
    </>
  );
}
const Section1 = styled.section`
  height: 200px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background-color: lightblue;
`;
const ListWrapper = styled.div`
  height: 180px;
  width: 180px;
  background-color: lightgoldenrodyellow;
`;
