const tasklist = document.getElementById("tasklist");

class Task{
    #tasks = [];
    createTask(title, description, category, due_date, status){
        this.#tasks.push({
            "uid": new Date().getMilliseconds(),
            "title": title,
            "description": description,
            "category": category,
            "due": due_date,
            "status": status
        });
    }
    updateTask(uid, title, description, category, due_date, status){
        const index = this.#tasks.findIndex(v => v.uid == uid);
        this.#tasks[index].title = title;
        this.#tasks[index].description = description;
        this.#tasks[index].category = category;
        this.#tasks[index].due = due_date;
        this.#tasks[index].status = status;
    }
    deleteTask(uid){
        this.#tasks.splice((this.#tasks.findIndex(v => v.uid == uid)), 1);
    }
    markComplete(uid){
        const index = this.#tasks.findIndex(v => v.uid == uid);
        this.#tasks[index].status = "completed";
    }
    refresh(filter){
        tasklist.innerHTML = "";
        const filtered = this.#tasks
            .filter(v => filter?.title === undefined || filter?.title === "" || filter.title === v.title)
            .filter(v => filter?.category === undefined || filter?.category === "" || filter.category === v.category)
            .filter(v => filter?.stat === undefined || filter?.stat === "any" || filter.stat === v.stat);
        for (const task of filtered)
            tasklist.innerHTML += TaskCard(task.uid, task.title, task.description, task.category, task.due, task.status);
    }
}

const cardHolder = document.getElementById("cardholder");

const modal = document.getElementById("form-create-new-task");
const create = document.getElementById("btn-create-new");


function TaskCard(uid, title, description, category, due_date, status){
    const tags = `<div class="card" style="width: 100%;"">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p><strong>Category</strong>: ${category}</p>
    <p><strong>Status</strong>: ${status}</p>
    <p><strong>Due Date</strong>: ${new Date(due_date).toLocaleString()}</p>
    <p class="card-text">${description}</p>
    <a class="btn btn-primary" onclick="markComplete(${uid})">Mark Complete</a>
    <a class="btn btn-danger" onclick="deleteTask(${uid})">Delete</a>
  </div>
</div>`;
return tags;
}

const title = modal.querySelector("#title");
const desc = modal.querySelector("#description");
const cat = modal.querySelector("#category");
const due = modal.querySelector("#due-date");
const stat = modal.querySelector("#status");

const taskManager = new Task;

function save(){
    taskManager.createTask(title.value, desc.value, cat.value, due.value, stat.value);
    taskManager.refresh();
    title.value = "";
    desc.value = "";
    cat.value = "";
    due.value = "";
    stat.value = "pending";
};

function markComplete(uid){
    taskManager.markComplete(uid);
    taskManager.refresh();
}

function deleteTask(uid){
    taskManager.deleteTask(uid);
    taskManager.refresh();
}