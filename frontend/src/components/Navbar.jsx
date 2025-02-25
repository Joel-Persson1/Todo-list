import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <Link to="addTodo">Add Todo</Link>
    </nav>
  );
}
