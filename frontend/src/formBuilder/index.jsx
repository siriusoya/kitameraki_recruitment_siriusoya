import { useState } from "react";

import Controls from "./controls";
import Form from "./forms";
import { DragDropContext } from "react-beautiful-dnd";

function FormBuilder() {
  const [formData, setFormData] = useState([]);

  const onDragEnd = (data) => {
    const { draggableId, source, destination } = data;
    
    if (source && destination) {
      if (source.droppableId === "controls_droppable") {
        const newFormControl = {
          id: `${formData.length}`,
          type: draggableId,
          config: {}
        };
        const newFormData = [...formData];
        newFormData.splice(destination.index, 0, newFormControl);
        setFormData(newFormData);
        console.log(formData)
      }
      if (source.droppableId === "form_droppable") {
        if (source.index !== destination.index) {
          const newFormData = [...formData];
          const movedFormControl = newFormData.splice(source.index, 1)[0];
          newFormData.splice(destination.index, 0, movedFormControl);
          setFormData(newFormData);
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="settingContainer">
        <div className="controls">
          <Controls />
        </div>
        <div className="forms">
          <Form formData={formData} />
        </div>
      </div>
    </DragDropContext>
  );
}

export default FormBuilder;




