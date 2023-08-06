import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TaskCard from "../components/TaskCard";

function TaskListPage() {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchTaskList();
  }, []);

  function fetchTaskList() {
    fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setTaskList(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        const message = err.message;
        swal("Error", message, "error");
      });
  }

  return (
    <>
      <div className="taskListPageContainer">
        <h1 className="taskListPageTitle">My Task List</h1>
        <div className="taskCardContainer">
        { taskList.map((task) => {
          return <TaskCard task={task} key={task.id} />;
        }) }
        </div>
      </div>
    </>
  );
}

export default TaskListPage;
