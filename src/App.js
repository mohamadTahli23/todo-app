import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const initialsTodos = [
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: "من الصفحة رقم 20",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: "من الصفحة رقم 20",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "قراءة كتاب",
      details: "من الصفحة رقم 20",
      isCompleted: false,
    },
  ];
  const theme = createTheme({
    typography: {
      fontFamily: ["Tajawal"],
    },
    palette: {
      primary: {
        main: "#004d40",
      },
    },
  });
  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#191b1f",
    direction: "rtl",
  };
  const [todos, setTodos] = useState(initialsTodos);

  return (
    <ThemeProvider theme={theme}>
      <div style={mainStyle} className="App">
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList></TodoList>
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
