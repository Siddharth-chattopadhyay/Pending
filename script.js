
const cardHolder = document.getElementById("cardholder");

const modal = document.getElementById("form-create-new-task");
const create = document.getElementById("btn-create-new");

const title = modal.querySelector("#title");
const desc = modal.querySelector("#description");
const cat = modal.querySelector("#category");
const due = modal.querySelector("#due-date");
const stat = modal.querySelector("#status");

function save(){
    tasks.push({
        "title": title.value,
        "description": desc.value,
        "category": cat.value,
        "due": due.value,
        "status": stat.value
    });
    title.value = "";
    desc.value = "";
    cat.value = "";
    due.value = "";
    stat.value = "pending";
};

const tasklist = document.getElementById("tasklist");

const tasks = [];
class Task{

    createTask(newUId, title, description, category, due_date, status){

    }
    updateTask(UId, title, description, category, due_date, status){}
    deleteTask(UId){}
    markComplete(UId){}
    refresh(filter){
        tasklist.innerHTML = "";
        const filtered = tasks
            .filter(v => filter?.title === "" || filter.title === v.title)
            .filter(v => filter?.category === "" || filter.category === v.category)
            .filter(v => filter?.stat === undefined || filter?.stat === "any" || filter.stat === v.stat);
        // for (const task of filtered)

    }
}