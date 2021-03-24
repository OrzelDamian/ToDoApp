const addButton = document.querySelector('.btn-add');
const inputAddTask = document.querySelector('.input-add-task');
const list = document.querySelector('.list');
const dateTaskInput = document.querySelector(".date-task-input");
const timeTaskInput = document.querySelector(".time-task-input");
const tasks = []
let taskId = 0;

const getDateCorrect = (data2) =>{
    let day = data2.getUTCDate();
    let month = data2.getUTCDay();
    let year = data2.getUTCFullYear();
    let date;

    if(data2.getUTCDay()<10){
        month = "0"+data2.getUTCDay();
    }else if(data2.getUTCDate()<10){
        day = "0"+data2.getUTCDate();
    }
    date = year + month + day;
    return date;
}

const getDateTo = (date, to) =>{
    let year = date.slice(0,4); 
    let month = date.slice(4,6); 
    let day = date.slice(6,8); 
    switch(to){
        case "html":{
            console.log("xxx")
            date = year+"-"+month+"-"+day;
            break;
        }
        default:{
            date = year+" "+month+" "+day;
            break;
        }
    }
    return date;
}




const setHtmlAttributes = (date) =>{
    dateTaskInput.min =  date;
}
setHtmlAttributes(getDateTo(getDateCorrect(new Date(Date.now())),'html'));

console.log(dateTaskInput.min);

// Dokończyć konwersja daty i godziny z html na formę Date();

const convertDateTimeHtmlToDate = (date, time)=>{
    let dateTime = date+""+time;
    let number;
    for(i=0;i<dateTime.length;i++){
        if(dateTime[i] ==="-" || dateTime === ":"){
            number = dateTime.slice(dateTime.length-1,i);
        }
    }
}


const deleteTask = (li)=>{
    li.remove();
}



const addTask = ()=>{
    let label;
    let button;
    let newTask;


 
    console.log(timeTaskInput.value);

    dateTask = document.querySelector(".date-task-input").value
    timeTask = document.querySelector(".time-task-input").value


    console.log(dateTask);
    console.log(timeTask);
    taskId+=1;


    // tasks.push(
    //     {
    //         id:taskId,
    //         taskName:inputAddTask.value.toUpperCase(),
    //         // completionDate:  

    //     }
    // )

    console.log(getDateCorrect(dateTaskInput.value,"") +" "+ timeTaskInput.value)
    console.log(new Date(dateTaskInput.value))


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

