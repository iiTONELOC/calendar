
const btn = document.getElementById('submit-sgn-btn');

async function signUpFormHandler(event) {
    event.preventDefault();
    const email = document.getElementById('email1').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password1').value.trim();
    // alert fields
    const emailAlert = document.getElementById('emailHelp');
    const userAlert = document.getElementById('userHelp');
    const passwordAlert = document.getElementById('passHelp');
    // submit btn

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.status === 201) {
            return window.location.replace('/dashboard');
        } else if (response.status === 202) {
            emailAlert.textContent="Email Already Exists!"
        }else if(response.status === 400){
            emailAlert.textContent="Please enter a valid email address!"
        }
    }
}
btn.addEventListener('click', signUpFormHandler)

