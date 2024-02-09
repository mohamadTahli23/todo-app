import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = currentTodos.filter((el) => {
        return el.id != action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updated": {
      const updatedTodos = currentTodos.map((el) => {
        if (el.id == action.payload.id) {
          return {
            ...el,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return el;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    case "toggledCompleted": {
      const updatedTodos = currentTodos.map((el) => {
        if (el.id == action.payload.id) {
          const updatedTodo = {
            ...el,
            isCompleted: !el.isCompleted,
          };
          return updatedTodo;
        }
        return el;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknown Action" + action.type);
    }
  }

  return [];
}
