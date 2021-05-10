let eventName = document.querySelector('#title').value;
let description = document.querySelector('#description').value.trim();
let date = document.querySelector('#date').value;
let time = document.querySelector('#time').value;
let important = document.querySelector('#important').value;
let category = document.querySelector('#category').value;
const btn = document.getElementById('create-task-btn');



 function createTaskFormHandler (event){
    event.preventDefault()
    console.log(eventName)
    if(eventName && description && date && time && category ){
        console.log("yes")
        console.log(eventName,description,date,time,important,category)
    }else{
        console.log("no")
    }
}











btn.addEventListener("click",createTaskFormHandler)

