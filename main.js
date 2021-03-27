
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
    let hour = data2.getHours();
    let minutes = data2.getMinutes();
    let date;
    let time;
    let dateTime = [];

            if(month<10){
                month = "0"+month;
            }else if(day<10){
                day = "0"+day;
            }
            date = year +""+ month +""+ day;
            dateTime.push(date)
            if(hour<10){
                hour = "0"+hour;
            }else if(minutes<10){
                minutes = "0"+minutes;
            }
            time = hour +""+ minutes;
            dateTime.push(time);

    return dateTime;
}


const getDateInHtmlFormat = (date) =>{
    let year = date[0].slice(0,4); 
    let month = date[0].slice(4,6); 
    let day = date[0].slice(6,8); 
    let hour = date[1].slice(0,2); 
    let minutes = date[1].slice(2,4); 
    let dateTime = [];

    dateTime.push(year+"-"+month+"-"+day);
    dateTime.push(hour+":"+minutes);

    return dateTime;
}




const setHtmlDateAttributes = (date) =>{
    dateTaskInput.min =  date[0];
    dateTaskInput.value =  date[0];
    timeTaskInput.min =  date[1];
    timeTaskInput.value =  date[1];
}

setHtmlDateAttributes(getDateInHtmlFormat(getDateCorrect(new Date(Date.now()))));



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
    let markerDateTask;
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
    label.textContent = inputAddTask.value.toUpperCase()+" Data wykonania zadania :   "+moment(tasks[taskId-1].completionDate).format('YYYY-MM-DD hh:mm');;
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

