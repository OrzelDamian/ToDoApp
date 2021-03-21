const addButton = document.querySelector('.btn-add');
const inputAddTask = document.querySelector('.input-add-task');
const list = document.querySelector('.list');

const deleteTask = (li)=>{
    li.remove();
}

const addTask = ()=>{
    let label;
    let button;
    let  newTask;
    newTask = document.createElement("li");
    label = document.createElement("label");
    label.textContent = inputAddTask.value.toUpperCase();
    button = document.createElement("button");
    button.textContent = "Usuń";
    button.setAttribute('class',"btn-delete");
    button.onclick = ()=> deleteTask(newTask);
    newTask.appendChild(label);
    newTask.appendChild(button);
    list.appendChild(newTask);
    inputAddTask.value = "";
}

addButton.onclick = addTask;

