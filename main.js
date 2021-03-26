const addButton = document.querySelector('.btn-add');
const inputAddTask = document.querySelector('.input-add-task');
const list = document.querySelector('.list');
const dateTaskInput = document.querySelector(".date-task-input");
const timeTaskInput = document.querySelector(".time-task-input");
const tasks = []
let taskId = 0;

const getDateCorrect = (data2) =>{
    let day = data2.getDate();
    let month = data2.getMonth()+1;
    let year = data2.getFullYear();
    let date;

    if(month<10){
        month = "0"+month;
    }else if(day<10){
        day = "0"+day;
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




const setHtmlDate = (date) =>{
    dateTaskInput.min =  date;
    dateTaskInput.value =  date;
}
const setHtmlTime = (date) =>{

    
    // Trzeba tutaj dodać zero kiedy mniejsze od 9
    timeTaskInput.min = date.getHours()[0]<10?":0"+date.getMinutes():+":"+date.getMinutes(); 
    timeTaskInput.value =  date.getHours()[0]<10?":0"+date.getMinutes():+":"+date.getMinutes();
}
setHtmlTime(new Date(Date.now()));
setHtmlDate(getDateTo(getDateCorrect(new Date(Date.now())),'html'));

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

    dateTime = new Date(dates[0], dates[1]-1, dates[2], dates[3], dates[4]);


    return dateTime.setSeconds(0);

}

const checkTime = (timeTaskInput) =>{
    let normal = true;
    if(timeTaskInput.value.slice(0,2) <= new Date(Date.now()).getHours()){
        document.querySelector("#errors b").textContent = "Nieprawidłowa godzina";
        normal = false;
    }else{
        document.querySelector("#errors b").textContent = "";
    }
    return normal;
}

const deleteTask = (li)=>{
    li.remove();
}



const addTask = ()=>{
    
    if(!checkTime(timeTaskInput)) return;

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
        if(task.completionDate - new Date(Date.now()).setSeconds(0,0) == 0){
            console.log("Nie wykonano zadania")
        }
    })
},1000*60)

addButton.onclick = addTask;

