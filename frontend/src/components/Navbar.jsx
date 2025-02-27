import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="nav">
      <Link className="add-todo" to="addTodo">
        Add Todo
      </Link>
    </nav>
  );
}
