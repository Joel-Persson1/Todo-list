import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function AddNewTodo() {
  const header = useRef("");
  const description = useRef("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoName = header.current.value;
    const todoDescription = description.current.value;

    const todoData = { todoName, todoDescription };

    try {
      const response = await fetch("http://localhost:3000/api/todo/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const result = await response.json();
      console.log("Success:", result);
      navigate("/");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={header} />
      <input type="text" ref={description} />
      <button type="submit">Submit</button>
    </form>
  );
}
