import { createBrowserRouter } from "react-router-dom";

import FormPage from "./pages/FormPage";
import TaskListPage from "./pages/TaskListPage";
import FormBuilder from "./formBuilder"
import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <TaskListPage />,
      },
      {
        path: "/add-task",
        element: <FormPage />,
      },
      {
        path: "/form-setting",
        element: <FormBuilder />,
      },
    ],
  },
]);

export default router;
