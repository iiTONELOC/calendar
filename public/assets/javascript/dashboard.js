// DATE TIME CONSTANTS
const dateEl = document.getElementById('date');
const timeEl = document.getElementById('time');

// SET DATE AND TIME
const date = moment(new Date()).format('dddd [the] Do [of] MMMM');
const time = moment(new Date()).format('LTS');

dateEl.textContent = date;
timeEl.textContent = time;


function updateTime() {
    setInterval(function () {
        const updatedTime = moment(new Date()).format('LTS')
        timeEl.textContent = updatedTime
    }, 500)
}
updateTime();