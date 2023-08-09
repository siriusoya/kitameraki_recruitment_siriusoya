import { Droppable, Draggable } from "react-beautiful-dnd";
import { TextField } from "@fluentui/react/lib/TextField";
import { SpinButton } from "@fluentui/react/lib/SpinButton";
import { DatePicker } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import { registerIcons } from '@fluentui/react/lib/Styling';
import { ChevronDownIcon } from '@fluentui/react-icons-mdl2';

export default function FormData({ formData }) {

  

  const renderInput = (inputType) => {
    switch (inputType) {
      case "TextField":
        return <TextField label="Text Field" />;
      case "SpinButton":
        return <SpinButton label="Spin Button" min={0} max={100} step={1} />;
      case "DatePicker":
        return <DatePicker label="Date Picker" />;
      default:
        return null;
    }
  };


  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="formSettingPage">
      <h1>Form Setting</h1>
      <h4>Standard Fields</h4>
          <Stack tokens={{ childrenGap: 15 }}>
            <TextField
              label="Title"
              required
            />
            <TextField
              label="Description"
              multiline
              rows={4}
            />
          </Stack>
          <h4>Optional Fields</h4>
      <Droppable droppableId="form_droppable" type="controls">
        {(provided, snapshot) => (
          <div
          className="droppableArea"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {formData.map((data, index) => (
              <Draggable
                key={`form_draggable_${index}`}
                draggableId={`form_draggable_${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <div
                      {...provided.dragHandleProps}
                      className="optionalForms"
                    >
                      {renderInput(data.type)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div>
        <button className="submitButton" onClick={handleSubmit} variant="contained" color="primary">
          Update Form
        </button>
      </div>
    </div>
  );
}
