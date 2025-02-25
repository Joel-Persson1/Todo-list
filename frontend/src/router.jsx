import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { StartView } from "./views/StartView";
import { AddNewTodo } from "./views/AddNewTodo";

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <StartView />,
        index: true,
      },
    ],
    element: <App />,
    path: "/",
  },
  {
    element: <AddNewTodo />,
    path: "addTodo",
  },
  {
    element: (
      <section>
        <h1>404 Page. The URL does not have any matches</h1>
      </section>
    ),
    path: "*",
  },
]);
