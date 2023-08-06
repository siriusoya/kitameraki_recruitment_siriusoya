const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get('/', Controller.taskList);

module.exports = router;