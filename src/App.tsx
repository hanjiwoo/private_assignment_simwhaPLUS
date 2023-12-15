import React from "react";
import "./App.css";
import styled from "styled-components";
import Nav from "./pages/Nav";
import TodosList from "./pages/TodosList";

function App() {
  type T = { id: string; title: string; content: string; isDone: boolean };
  // const [todos, setTodos] = useState<T[]>([]);

  console.log();

  return (
    <Container className="App">
      {" "}
      <Content>
        <ZeMOK>투두리스트</ZeMOK>
        <Nav />
        <TodosList listType={false} />
        <TodosList listType={true} />
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
  background-color: lightcoral;
  font-size: 50px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// const Section2 = styled.section`
//   background-color: lightpink;
//   height: 200px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 10px;
// `;

// const ListWrapper = styled.div`
//   height: 180px;
//   width: 180px;
//   background-color: lightgoldenrodyellow;
// `;
