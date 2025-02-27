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
    <article className="todo-box">
      <div className="buttons-div">
        <input
          className="checkbox"
          checked={isCompleted ? true : false}
          onChange={handleCompleted}
          type="checkbox"
        />
        <button className="delete-btn" onClick={() => onDelete(todo.todoId)}>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
      <div className="todo-info">
        <h3 className="todo-title">{todo.todoName}</h3>{" "}
        <p className={`todo-description ${isCompleted ? "completed" : ""}`}>
          {todo.todoDescription}
        </p>
        <button className="edit-btn">
          {" "}
          <ion-icon name="create-outline"></ion-icon>
        </button>
      </div>
    </article>
  );
}
