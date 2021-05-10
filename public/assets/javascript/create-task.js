
const btn = document.getElementById('create-task-btn');



function createTaskFormHandler(event) {
    event.preventDefault()
    const eventName = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const date = moment(document.querySelector('#date').value).format('MM-DD-YYYY');
    const time = document.querySelector('#time').value;
    const important = document.querySelector('#important').checked;
    const category = document.querySelector('#category').value;

    if (eventName && description && date && time && category) {
        console.log("yes")
        console.log(eventName, description, date, time, important, category)
    } else {
        console.log("no")
    }
}











btn.addEventListener("click", createTaskFormHandler)

