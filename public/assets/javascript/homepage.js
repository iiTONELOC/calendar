
// HANDLE BUTTON CLICKS REDIRECT TO APPROPRIATE PAGES
// BTN CONSTANTS
const login = document.getElementById('login-btn');
const signUp = document.getElementById('sign-up-btn');
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
const loginHandler = () => {
    window.location.replace('/login')
}
// event listener for login 
login.addEventListener('click', loginHandler);

const signUpHandler = () => {
    window.location.replace('/sign-up')
}
// event listener for signUp 
signUp.addEventListener('click', signUpHandler);