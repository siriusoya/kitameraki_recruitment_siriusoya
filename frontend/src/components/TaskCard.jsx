
function TaskCard(props) {
    const { task } = props;
    const { fetchTaskList } = props;

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

      async function deleteHandler(e, taskId) {
        e.preventDefault();
        await deleteTask(taskId);
      }
  
      return (
          <>
            <div className="taskCard">
            <p className="taskFieldTitle">Title</p>
            <hr />
            <p className="taskFieldContent">{task.title}</p>
            <p className="taskFieldTitle">Description</p>
            <hr />
            <p className="taskFieldContent">{task.description}</p>
            <button className="deleteButton" onClick={(e) => deleteHandler(e, task.id)}>Delete Task</button>
            </div>
          </>
      )

}

export default TaskCard;