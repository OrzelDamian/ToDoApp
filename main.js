
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
            }
            if(day<10){
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


    return dateTime;

}

const checkTime = (timeTaskInput) =>{
    let normal = true;
    console.log(timeTaskInput.value.slice(3,5)+ "XDD");


    console.log(
        parseInt(timeTaskInput.value.slice(0,2)) +"=="+ new Date(Date.now()).getHours() +"\n"+
        parseInt(timeTaskInput.value.slice(3,5)) +"=="+  new Date(Date.now()).getMinutes() +"\n"+
        

        parseInt(dateTaskInput.value.slice(8,11)) +"=="+  new Date(Date.now()).getDate() +"\n"+
        parseInt(dateTaskInput.value.slice(5,7)) +"=="+  (new Date(Date.now()).getMonth()+1)  +"\n"+
        parseInt(dateTaskInput.value.slice(0,4)) +"=="+  new Date(Date.now()).getFullYear()
        +"\n"+
        timeTaskInput.value.length
    );


    if(parseInt(timeTaskInput.value.slice(0,2)) <= new Date(Date.now()).getHours()
    &&
    parseInt(timeTaskInput.value.slice(3,5)) <= new Date(Date.now()).getMinutes()
    &&
    parseInt(dateTaskInput.value.slice(8,11)) === new Date(Date.now()).getDate()
    &&
    parseInt(dateTaskInput.value.slice(5,7)) === new Date(Date.now()).getMonth()+1
    &&
    parseInt(dateTaskInput.value.slice(0,4)) === new Date(Date.now()).getFullYear()
    ){
        document.querySelector("#errors b").textContent = "Nieprawid??owa data";
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

    let dateOfExecution;
    let button;
    let countdownTime;
    let newTask;
    let nameTask;
    let taskDetailWrapper;


    dateTask = document.querySelector(".date-task-input").value
    timeTask = document.querySelector(".time-task-input").value



    taskId+=1;


    tasks.push(
        {
            id:taskId,
            taskName:inputAddTask.value.toUpperCase(),
            completionDate:convertDateTimeHtmlToDate(dateTask,timeTask),
            timeToCompleteTheTask:  {
                days: new Date (convertDateTimeHtmlToDate(dateTask,timeTask)).getDate() - new Date(Date.now()).getDate(),
                hours: new Date (convertDateTimeHtmlToDate(dateTask,timeTask)).getHours() - new Date(Date.now()).getHours(),
                minutes: new Date (convertDateTimeHtmlToDate(dateTask,timeTask)).getMinutes() - new Date(Date.now()).getMinutes(),
                seconds: new Date (convertDateTimeHtmlToDate(dateTask,timeTask)).getSeconds() - new Date(Date.now()).getSeconds(),
            }

        }
    )



        



    newTask = document.createElement("li");
    newTask.setAttribute('data-id', "task-"+tasks[taskId-1].id);
    taskDetailWrapper = document.createElement("div");
    taskDetailWrapper.setAttribute("id", "task-detail-wrapper")
    taskDetailWrapper.setAttribute("class", "task-detail-wrapper")
    newTask.append(taskDetailWrapper);
    nameTask = document.createElement("label");
    nameTask.textContent = nameTask.textContent = "Nazwa zadania: " +tasks[taskId-1].taskName;
    taskDetailWrapper.append(nameTask);     
    dateOfExecution = document.createElement("label");
    dateOfExecution.textContent = " Data wykonania zadania : "+moment(tasks[taskId-1].completionDate).format('YYYY-MM-DD hh:mm');;
    button = document.createElement("button");
    button.textContent = "Usu??";
    button.setAttribute('class',"btn-delete");
    button.onclick = ()=> deleteTask(newTask);
    taskDetailWrapper.appendChild(dateOfExecution);
    countdownTime = document.createElement("label");
    countdownTime.setAttribute("id","countdown-time")
    countdownTime.setAttribute("class","countdown-time")
    countdownTime.textContent = "";
    taskDetailWrapper.append(countdownTime); 
    taskDetailWrapper.append(countdownTime); 
    newTask.appendChild(button);
   
    list.appendChild(newTask);
    inputAddTask.value = "";
}




setInterval(()=>{
    let days;
    tasks.forEach(task=>{
        if(new Date (task.completionDate).setSeconds(0,0) - new Date(Date.now()).setSeconds(0,0) == 0){
            console.log("Nie wykonano zadania")
        }else{
            if(new Date (task.completionDate).getSeconds() - new Date(Date.now()).getSeconds()<0){
                if(task.timeToCompleteTheTask["minutes"] = Math.abs(new Date (task.completionDate).getMinutes() - new Date(Date.now()).getMinutes())>1
                ){
                    task.timeToCompleteTheTask["minutes"] = Math.abs(new Date (task.completionDate).getMinutes() - new Date(Date.now()).getMinutes()-1);
                }else{
                    task.timeToCompleteTheTask["minutes"] = 0;
                }

                task.timeToCompleteTheTask["seconds"] = 60 - Math.abs(new Date (task.completionDate).getSeconds() - new Date(Date.now()).getSeconds());
                
                if((new Date (task.completionDate).getMinutes() - new Date(Date.now()).getMinutes())-1<0){
                    task.timeToCompleteTheTask["hours"] = 0;
                    task.timeToCompleteTheTask["minutes"] = 60 - Math.abs(new Date (task.completionDate).getMinutes() - new Date(Date.now()).getMinutes()-1);
                }else{
                    task.timeToCompleteTheTask["hours"] = new Date (task.completionDate).getHours() - new Date(Date.now()).getHours();
                }
            }else{
                if(new Date (task.completionDate).getMinutes() - new Date(Date.now()).getMinutes()-1<0){
                    task.timeToCompleteTheTask["hours"] = 0;
                    task.timeToCompleteTheTask["minutes"] = 60 - Math.abs(new Date (task.completionDate).getMinutes() - new Date(Date.now()).getMinutes())-1;
                }else{
                    task.timeToCompleteTheTask["hours"] = new Date (task.completionDate).getHours() - new Date(Date.now()).getHours();
                    task.timeToCompleteTheTask["minutes"] = new Date (task.completionDate).getMinutes() - new Date(Date.now()).getMinutes()-1;
                }
                task.timeToCompleteTheTask["seconds"] = new Date (task.completionDate).getSeconds() - new Date(Date.now()).getSeconds();
            }
            days = task.timeToCompleteTheTask["days"];
            if(days>0){
                days = task.timeToCompleteTheTask["days"]-1;
            }

            document.querySelector(`[data-id='task-${task.id}']>#task-detail-wrapper>#countdown-time`).textContent = "Do ko??ca wykonania zadania pozosta??o "
            + days+" dni:"
            + task.timeToCompleteTheTask["hours"]+" godzin:"
            + task.timeToCompleteTheTask["minutes"]+" minut:"
            + task.timeToCompleteTheTask["seconds"]+" sekund" 
        }
    })

}

,1000)

addButton.onclick = addTask;

// Godzina 00:00
// Check time
// Dni


