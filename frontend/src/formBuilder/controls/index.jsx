import { Droppable, Draggable } from "react-beautiful-dnd";


const controls = [
    {
      value: "TextField",
      label: "Text field",
      imgSrc: "https://pic.onlinewebfonts.com/thumbnails/icons_489639.svg",
    },
    {
      value: "DatePicker",
      label: "Date time",
      imgSrc: "https://pic.onlinewebfonts.com/thumbnails/icons_421931.svg",
    },
    {
      value: "SpinButton",
      label: "Number",
      imgSrc: "https://pic.onlinewebfonts.com/thumbnails/icons_255824.svg",
    },
  ];

function Controls() {
  return (
    <Droppable
      droppableId="controls_droppable"
      type="controls"
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <div
          className="controlsCont"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2>Components</h2>
          <hr className="compHr" />
          {controls.map((control, index) => (
            <Draggable
              key={`control_draggable_${control.value}`}
              draggableId={control.value}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="iconContainer"
                >
                  <div
                    
                    key={control.value}
                    className="iconContainer"
                  >
                    <div>
                      <img className="controlImg" src={control.imgSrc} />
                    </div>
                    <div >
                      {control.label}
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Controls;
