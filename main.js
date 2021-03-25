const addButton = document.querySelector('.btn-add');
const inputAddTask = document.querySelector('.input-add-task');
const list = document.querySelector('.list');
const dateTaskInput = document.querySelector(".date-task-input");
const timeTaskInput = document.querySelector(".time-task-input");
const tasks = []
let taskId = 0;

const getDateCorrect = (data2) =>{
    let day = data2.getDate();
    let month = data2.getMonth();
    let year = data2.getFullYear();
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


const convertDateTimeHtmlToDate = (date, time)=>{
    let dateTime = date+" "+time;
    let dates = [];
    let temp = 0;

    for(i=0;i<dateTime.length;i++){
        if(dateTime[i] ==="-" || dateTime[i] === ":" || dateTime[i] === " " || i === dateTime.length-1){

            if(i===dateTime.length-1){
                dates.push(dateTime.slice(temp,i+1));
            }else{
                dates.push(dateTime.slice(temp,i));
            }

            temp = i+1;
        }
    }

    dateTime = new Date(dates[0], dates[1], dates[2], dates[3], dates[4], 0);

    return dateTime.getTime();

}

const deleteTask = (li)=>{
    li.remove();
}



const addTask = ()=>{
    let label;
    let button;
    let newTask;


 

    dateTask = document.querySelector(".date-task-input").value
    timeTask = document.querySelector(".time-task-input").value



    taskId+=1;


    tasks.push(
        {
            id:taskId,
            taskName:inputAddTask.value.toUpperCase(),
            completionDate:convertDateTimeHtmlToDate(dateTask,timeTask)  

        }
    )
    tasks.forEach(x=>console.log(x));







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




setInterval(()=>{
    tasks.forEach(task=>{

        console.log(new Date(new Date(task.completionDate).setSeconds(0,0)))
        console.log(new Date(Date.now()))

        console.log(new Date(new Date(Date.now()).setSeconds(0,0)))

        console.log(task.completionDate +" "+ new Date(Date.now()).setSeconds(0));
        if(task.completionDate - Date.now() == 0){
            alert("Nie wykonano zadania")
        }
    })
},1000)

addButton.onclick = addTask;

