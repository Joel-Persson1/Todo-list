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
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Enter your todo title</label>
          <input type="text" ref={header} />
        </div>
        <div>
          <label>Enter your todo description</label>
          <input type="text" ref={description} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
