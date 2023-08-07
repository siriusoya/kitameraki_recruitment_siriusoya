const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get('/tasks', Controller.taskList);

router.delete('/tasks/:taskId/delete', Controller.deleteTask);

router.post('/tasks/add', Controller.addTask);

router.put("/tasks/:taskId/edit", Controller.updateTask);

module.exports = router;