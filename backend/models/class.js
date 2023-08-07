class Task {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

class Factory {
    static createTask(id, title, description) {
        return new Task(id, title, description)
    }

}

module.exports = Factory;