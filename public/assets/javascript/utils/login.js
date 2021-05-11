
const btn = document.getElementById('submit-sgn-btn');

async function signUpFormHandler(event) {
    event.preventDefault();
    const email = document.getElementById('email1').value.trim();
    const password = document.getElementById('password1').value.trim();
    const emailAlert = document.getElementById('emailHelp');
    const passwordAlert = document.getElementById('passHelp');

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        if (response.status === 201) {
            window.location.replace('/dashboard');
        } else if (response.status === 404) {
            emailAlert.textContent = "No User With That Email Exists!"
        } else if (response.status === 400) {
            passwordAlert.textContent = "Invalid Password"
        }
    }
}
btn.addEventListener('click', signUpFormHandler)

