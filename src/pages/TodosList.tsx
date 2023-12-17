import React from "react";
import styled from "styled-components";
// import {
//   __deleteTodo,
//   __editTodo,
//   __getTodos,
// } from "../redux/mo/modules/todoSlice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, editTodo, getTodos } from "../redux/mo/modules/queryFns";

export default function TodosList({ listType }: { listType: boolean }) {
  type T = { id: string; title: string; content: string; isDone: boolean };

  const JSON_SERVER_BASE_URL = "http://localhost:4000/todos";

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  const queryClient = useQueryClient();
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const { mutate: mutateToEdit } = useMutation({
    mutationFn: editTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const DeleteHandler = (id: string) => {
    const confirmedData = window.confirm("정말로 삭제할꺼에여?");
    if (confirmedData) {
      mutateToDelete(id);
    }
  };
  const UpdateHandler = (id: string, isDone: boolean) => {
    mutateToEdit({ id, isDone });
  };

  const notYetTodos = todos?.filter((todo: T) => {
    return todo.isDone === false;
  });
  const completedTodos = todos?.filter((todo: T) => {
    return todo.isDone === true;
  });

  const changedTodos = listType ? completedTodos : notYetTodos;

  if (isLoading) {
    return <>로딩중....</>;
  }

  return (
    <>
      {" "}
      <div style={{ backgroundColor: "black", color: "white" }}>
        {listType ? "완료된투두" : "해야할투두"}
      </div>
      <Section1>
        <>
          {changedTodos?.map((todo: T) => {
            return (
              <ListWrapper key={todo.id}>
                <div>아이디 : {todo.id}</div>
                <div>제목 : {todo.title}</div>
                <div>내용 : {todo.content}</div>
                <div>상태 : {todo.isDone ? "완료" : "미완료"}</div>
                <button onClick={() => UpdateHandler(todo.id, todo.isDone)}>
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
