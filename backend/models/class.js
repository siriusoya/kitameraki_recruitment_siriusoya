class Tasks {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

class Factory {
    static createTasks(id, title, description) {
        return new Tasks(id, title, description)
    }

}

module.exports = Factory;