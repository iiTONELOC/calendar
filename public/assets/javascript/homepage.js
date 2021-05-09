
// HANDLE BUTTON CLICKS REDIRECT TO APPROPRIATE PAGES
// BTN CONSTANTS
const login = document.getElementById('login-btn');
const signUp = document.getElementById('sign-up-btn');

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