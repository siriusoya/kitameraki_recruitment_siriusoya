import { useEffect, useState } from "react";

function TaskCard(props) {
  const { task } = props;
  const { fetchTaskList } = props;

  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
  });

  function deleteTask(taskId) {
    fetch(`http://localhost:3000/tasks/${taskId}/delete`, {
      method: "DELETE",
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
        console.log(data.message);
        fetchTaskList();
      })
      .catch((err) => {
        const message = err.message;
        swal("Error", message, "error");
      });
  }

  function deleteHandler(e, taskId) {
    e.preventDefault();
    deleteTask(taskId);
  }

  function updateTask(taskData, taskId) {
    fetch(`http://localhost:3000/tasks/${taskId}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => console.log("berhasil"))
      .catch((err) => console.log(err));
  }

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  
  const debouncedHandleTitleChange = debounce((newTitle) => {
    
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      title: newTitle,
    }));

    const updatedTaskData = { ...taskData, title: newTitle }; 

    
    setTimeout(() => {
      updateTask(updatedTaskData, task.id);
    });
  }, 700); 

  const debouncedHandleDescriptionChange = debounce((newDescription) => {
    
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      description: newDescription,
    }));

    const updatedTaskData = { ...taskData, description: newDescription }; 

    
    setTimeout(() => {
      updateTask(updatedTaskData, task.id);
    });
  }, 700); 

  const handleTitleChange = (e) => {
    debouncedHandleTitleChange(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    debouncedHandleDescriptionChange(e.target.value);
  };

  return (
    <>
      <div className="taskCard">
        <p className="taskFieldTitle">Title</p>
        <hr />
        <input
          type="text"
          className="updateInput"
          value={taskData.title}
          onChange={handleTitleChange}
        />
        <p className="taskFieldTitle">Description</p>
        <hr />
        <textarea 
        rows="4" 
        cols="50"
        className="descUpdate"
        value={taskData.description}
        onChange={handleDescriptionChange}
        >
        {taskData.description}
        </textarea>
        
        <button
          className="deleteButton"
          onClick={(e) => deleteHandler(e, task.id)}
        >
          Delete Task
        </button>
      </div>
    </>
  );
}

export default TaskCard;
