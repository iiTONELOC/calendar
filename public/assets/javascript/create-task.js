
const btn = document.getElementById('create-task-btn');
const taskAlert = document.getElementById('task-alert');



async function createTaskFormHandler(event) {
    event.preventDefault()
    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const date = moment(document.querySelector('#date').value).format('MM-DD-YYYY');
    const time = document.querySelector('#time').value;
    const important = document.querySelector('#important').checked;
    const category_id = document.querySelector('#category').value;
    const user_id = document.getElementById('create-task-btn').getAttribute("data-user_id");

    if (name&& description && date && time && category_id) {
        const response = await fetch('/api/events/', {
            method: 'post',
            body: JSON.stringify({
               name,
               description,
               category_id,
               user_id,
               date,
               time,
               important
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.status === 201){
            alert(`SUCCESS\n ${name} was successfully added to events!`)
        }

    } else {
        taskAlert.removeAttribute("class","collapse")
        function remove(){
            setTimeout(() => {
                taskAlert.setAttribute("class","collapse")
            }, 5000);
        }
        remove()
    }
}











btn.addEventListener("click", createTaskFormHandler);

