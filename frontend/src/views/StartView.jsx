import { useEffect, useState } from "react";
import { Todo } from "../components/Todo";

export function StartView() {
  const [todos, setTodos] = useState(null);

  const getAllTodos = async () => {
    const rawData = await fetch("http://localhost:3000/api/todo/get");
    const data = rawData.json();
    return data;
  };

  const handleDelete = async (id) => {
    try {
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

      setTodos(null);

      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Delete went wrong:", error);
    }
  };

  useEffect(() => {
    getAllTodos().then((data) => setTodos(data));
  }, [todos]);

  if (todos === null) {
    return <h1>Wait</h1>;
  }

  return (
    <main>
      {todos.map((todo) => (
        <Todo key={todo.todoId} todo={todo} onDelete={handleDelete} />
      ))}
    </main>
  );
}
