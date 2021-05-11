

const yesBtn = document.getElementById('yes-btn');
const reminderForm = document.getElementById('reminder-div');
const createReminderBtn = document.getElementById('create-reminder-btn');
const title = document.getElementById('task-title');




function yesClickHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#title').value.trim();
    
    
    // hide elements, show reminder form
    hide(addReminderConfirm);
    hide(taskForm);
    show(reminderForm);
    title.textContent = `Add a reminder for ${name}`
    
}


yesBtn.addEventListener("click", yesClickHandler);

async function submitReminderHandler (event){
    event.preventDefault();
    const date = moment(document.querySelector('#date').value).format('YYYY-MM-DD');
    const time = document.querySelector('#time').value;
    const timeFrame = document.getElementById('reminder-period').value;
    const amountOfTime = document.getElementById('reminder-time').value;
    const event_id = createReminderBtn.getAttribute('data-event_id');

    // create date object from date and time 
    const eventDateTime= new Date(`${date}T${time}`)
    // figure out reminder timing
    const before = moment(eventDateTime).subtract(amountOfTime, timeFrame).toString();
    // console.log(event_id,user_id)
    // create reminder
    fetch('/api/reminders', {
        method: 'post',
        body: JSON.stringify({
            event_id,
            before
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res=>{
        if(res.status != 200){
            alert(res.statusText)
            return
        }
        return res.json()
    }).then(()=>{
       return window.location.replace('/dashboard');
    }).catch(e=>{
        console.log(e)
    })
    
}
createReminderBtn.addEventListener('click', submitReminderHandler);