// TIME CONSTANTS

const timeEl = document.getElementById('time');

// SET TIME

const time = moment(new Date()).format('LTS');



function updateTime() {
    setInterval(function () {
        const updatedTime = moment(new Date()).format('LTS')
        timeEl.textContent = updatedTime
    }, 500)
}
updateTime();