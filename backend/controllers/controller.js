const Model = require("../models/model");

class Controller {
  static taskList(req, res) {
    Model.readTasks((err, taskList) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        const ITEMS_PER_PAGE = 3;
        const page = parseInt(req.query.page) || 1;
        const currentIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = currentIndex + ITEMS_PER_PAGE;

        const paginatedData = taskList.slice(0, endIndex);

        console.log(paginatedData)

        res.status(200).json({
          message: "Succeeded getting articles data",
          data: paginatedData,
        });
      }
    });
  }

  static deleteTask(req, res) {
    const { taskId } = req.params;
    Model.deleteById(taskId, (err, deletedTask) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(200).json({
          message: "Task has been deleted successfully",
        });
      }
    });
  }

  static addTask(req, res) {
    const { title, description } = req.body;
    Model.addTask(title, description, (err, newTask) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(201).json({
          message: "Task has been added successfully",
        });
      }
    });
  }

  static updateTask(req, res) {
    const { taskId } = req.params;
    const { title, description } = req.body;
    Model.updateTask(taskId, title, description, (err, newTask) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(201).json({
          message: "Task has been updated successfully",
        });
      }
    });
  }
}

module.exports = Controller;
