const fs = require("fs");
const Factory = require("./class.js");

class Model {
  static readTasks(cb) {
    fs.readFile("./data/tasks.json", "utf-8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        let taskList = JSON.parse(data).map((el) => {
          return Factory.createTask(el.id, el.title, el.description);
        });
        cb(null, taskList);
      }
    });
  }

  static saveTasks(tasks, cb) {
    const string = JSON.stringify(tasks, null, 2);
            fs.writeFile("./data/tasks.json", string, (err) =>{
                    cb(err);
            })
}

  static addTask(title, description, cb) {
    this.readTasks((err, tasks) => {
      if (err) {
        cb(err);
      } else {
        const id = tasks.length ? tasks.at(-1).id + 1 : 1;
        const newTask = Factory.createTask(id, title, description);
        tasks.push(newTask);

        this.saveTasks(tasks, (err) => {
          if (err) {
            cb(err);
          } else {
            cb(null, newTask);
          }
        });
      }
    });
  }

  static deleteById(id, cb) {
    this.readTasks((err, tasks) => {
        if(err) {
            cb(err);
        } else {
            const index = tasks.findIndex((el) => el.id == id);
            const deletedTask = tasks.splice(index, 1);

            this.saveTasks(tasks, (err) => {
                if(err) {
                    cb(err);
                } else {
                    cb(null, deletedTask[0]);
                }
            })
        }
    })
}

  static updateTask(id, title, description, cb) {
    this.readTasks((err, tasks) => {
      if(err) {
          cb(err);
      } else {
        const index = tasks.findIndex((el) => el.id == id);
          tasks[index].title = title;
          tasks[index].description = description;

          this.saveTasks(tasks, (err) => {
            if(err) {
                cb(err);
            } else {
                cb(null);
            }
        })
      }
    })
  }
}

module.exports = Model;
