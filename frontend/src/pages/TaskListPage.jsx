import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TaskCard from "../components/TaskCard";
import delay from "../helpers/delay"

function TaskListPage() {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const [taskList, setTaskList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  const handleIntersection = async (entries) => {
    if (entries[0].isIntersecting) {
      console.log('Element is in viewport!');
      await delay(1250);
      setPageIndex(prevPageIndex => prevPageIndex + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, 
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchTaskList();
  }, [pageIndex]);

  function fetchTaskList() {
    fetch(
      "http://localhost:3000/tasks?" +
        new URLSearchParams({
          page: pageIndex,
        }),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
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
          {taskList.map((task) => {
            return (
              <TaskCard
                task={task}
                fetchTaskList={fetchTaskList}
                key={task.id}
              />
            );
          })}
        </div>
        <img
          id="loader"
          ref={targetRef}
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
        />
      </div>
    </>
  );
}

export default TaskListPage;
