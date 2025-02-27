import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export function Todo({ todo, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed ? true : false);

  const handleCompleted = () => {
    setIsCompleted((isCompleted) => !isCompleted);
  };

  const updateTodo = async () => {
    if (!todo?.todoId) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/todo/update/${todo.todoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: isCompleted }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      console.log("Todo updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    console.log(isCompleted);
    console.log("Updating todo with ID:", todo?.todoId);
    updateTodo();
  }, [isCompleted]);

  return (
    <div>
      <h3>{todo.todoName}</h3>
      <p className={isCompleted ? "completed" : ""}>{todo.todoDescription}</p>
      <input
        checked={isCompleted ? true : false}
        onChange={handleCompleted}
        type="checkbox"
      />
      <button onClick={() => onDelete(todo.todoId)}>DELETE</button>
    </div>
  );
}
