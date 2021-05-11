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
    const date = moment(document.querySelector('#date').value).format('MM-DD-YYYY');
    const time = document.querySelector('#time').value;
    const timeFrame = document.getElementById('reminder-period').value;
    const amountOfTime = document.getElementById('reminder-time').value;
    const event_id = createReminderBtn.getAttribute('data-event_id');
    console.log(`Timeframe: ${timeFrame}
    amount: ${amountOfTime}
    event: ${event_id}`)
}
createReminderBtn.addEventListener('click', submitReminderHandler);