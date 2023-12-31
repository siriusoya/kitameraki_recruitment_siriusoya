import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="topnav">
        <NavLink to="/" className="navlink">
          <p>Task List</p>
        </NavLink>

        <NavLink to="/add-task" className="navlink">
          <p>Add A New Task</p>
        </NavLink>

        <NavLink to="/form-setting" className="navlink">
          <p>Form Setting</p>
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;
