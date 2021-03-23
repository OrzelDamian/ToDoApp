const addButton = document.querySelector('.btn-add');
const inputAddTask = document.querySelector('.input-add-task');
const list = document.querySelector('.list');
const dateTaskInput = document.querySelector(".date-task-input");
const timeTaskInput = document.querySelector(".time-task-input");
const tasks = []
let taskId = 0;



const data2 = new Date(Date.now());


console.log(data2.getUTCFullYear())
console.log(data2.getUTCDate())
console.log(data2.getDay())




console.log(dateTaskInput.min);

console.log(data2.getFullYear()+"-0"+data2.getUTCMonth()+"-0"+data2.getDay())

// dateTaskInput.min = data.getFullYear()+"-0"+data.getMonth()+"-0"+data.getDay();

console.log(dateTaskInput.min);

const deleteTask = (li)=>{
    li.remove();
}

const addTask = ()=>{
    let label;
    let button;
    let  newTask;


 

    dateTask = document.querySelector(".date-task-input").value
    timeTask = document.querySelector(".time-task-input").value


    console.log(dateTask);
    console.log(timeTask);
    taskId+=1;


    tasks.push(
        {
            id:taskId,
            taskName:inputAddTask.value.toUpperCase(),
            // completionDate:

        }
    )
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

