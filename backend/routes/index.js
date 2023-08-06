const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get('/tasks', Controller.taskList);

router.delete('/tasks/:taskId/delete', Controller.deleteTask);

router.post('/tasks/add', Controller.addTask);

module.exports = router;