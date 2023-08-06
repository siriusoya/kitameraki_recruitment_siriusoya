const Model = require("../models/model");

class Controller {
  static taskList(req, res) {
    Model.readTasks((err, taskList) => {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      } else {
        res.status(200).json({
          message: "Succeeded getting articles data",
          data: taskList,
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
}

module.exports = Controller;
