import React from "react";
import { useEffect, useState } from "react";
import { TextField, MaskedTextField } from "@fluentui/react/lib/TextField";
import { useNavigate } from "react-router-dom";
import { Stack } from "@fluentui/react/lib/Stack";

function FormPage() {
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  function addTask(taskInput) {
    fetch("http://localhost:3000/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(taskInput),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Internal Server Error");
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  }

  const handleSubmit = () => {
    if (!taskInput.title.length) {
      setErrorMessage('Title is required!')
    } else {
      addTask(taskInput);
    }
    
  };

  return (
    <>
      <div className="formPageContainer">
        <h1 className="taskListPageTitle">Add a new task</h1>
        <p className="errorMessage">{errorMessage}</p>
        <div className="formContainer">
          <Stack tokens={{ childrenGap: 15 }}>
            <TextField
              label="Title"
              required
              value={taskInput.title}
              onChange={(e) => {
                setTaskInput({
                  ...taskInput,
                  title: e.target.value,
                });
              }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={taskInput.description}
              onChange={(e) => {
                setTaskInput({
                  ...taskInput,
                  description: e.target.value,
                });
              }}
            />
          </Stack>
          <button className="submitButton" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default FormPage;
