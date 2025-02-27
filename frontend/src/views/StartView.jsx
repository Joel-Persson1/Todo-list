import { useEffect, useState } from "react";
import { Todo } from "../components/Todo";

export function StartView() {
  const [todos, setTodos] = useState(null);

  const getAllTodos = async () => {
    try {
      const rawData = await fetch("http://localhost:3000/api/todo/get");
      const data = await rawData.json();

      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setTodos((oldTodos) => oldTodos.filter((todo) => todo.todoId !== id));

      const result = await fetch(
        `http://localhost:3000/api/todo/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!result.ok) {
        throw new Error("Failed to delete todo");
      }

      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Delete went wrong:", error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  if (todos === null) {
    return <h1>Wait</h1>;
  }

  return (
    <main className="grid">
      {todos.map((todo) => (
        <Todo key={todo.todoId} todo={todo} onDelete={handleDelete} />
      ))}
    </main>
  );
}
