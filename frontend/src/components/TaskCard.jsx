function TaskCard(props) {
    const { task } = props;
  
      return (
          <>
            <div className="taskCard">
            <p className="taskFieldTitle">Title</p>
            <hr />
            <p className="taskFieldContent">{task.title}</p>
            <p className="taskFieldTitle">Description</p>
            <hr />
            <p className="taskFieldContent">{task.description}</p>
            <button className="deleteButton">Delete Task</button>
            </div>
          </>
      )

}

export default TaskCard;