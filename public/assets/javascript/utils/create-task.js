const btn = document.getElementById('create-task-btn');
const taskAlert = document.getElementById('task-alert');
const addReminderConfirm = document.getElementById('reminder-check');
const user_id = document.getElementById('create-task-btn').getAttribute("data-user_id");
const taskForm = document.getElementById('form');

// functions to hide show elements
const show = (element) => {
    element.removeAttribute("class", "collapse")
}
const hide = (element) => {
    element.setAttribute("class", "collapse")
}


async function createTaskFormHandler(event) {
    event.preventDefault()
    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const date = moment(document.querySelector('#date').value).format('MM-DD-YYYY');
    const time = document.querySelector('#time').value;
    const important = document.querySelector('#important').checked;
    const category_id = document.querySelector('#category').value;

    if (name && description && date && time && category_id) {
        fetch('/api/events/', {
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
        }).then(res=>{
            if (res.status != 201){
                alert(res.statusText)
                return
            }
            return res.json()
        }).then(response=>{
                document.getElementById('success-title').textContent=(`${name} has been created for ${date} at ${time}`)
                document.getElementById('create-reminder-btn').setAttribute('data-event_id',`${response.id}`)
                show(addReminderConfirm);
        }).catch(e=>{
            console.log(e)
        })
    } else {
        show(taskAlert);
        function remove() {
            setTimeout(() => {
                hide(taskAlert);
            }, 5000);
        }
        remove()
    }
}

btn.addEventListener("click", createTaskFormHandler);


