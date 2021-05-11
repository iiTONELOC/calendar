
const btn = document.getElementById('submit-sgn-btn');

async function signUpFormHandler(event) {
    event.preventDefault();
    const email = document.getElementById('email1').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password1').value.trim();
    const emailAlert = document.getElementById('emailHelp');
    const userAlert = document.getElementById('userHelp');
    const passwordAlert = document.getElementById('passHelp');

    if (username && email && password) {
        if (username.length < 4) {
            return userAlert.textContent = "Usernames must be at least 5 characters!"
        }
        fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res=>{
            if (res.status === 201) {
                return res.json()
            } else if (res.status === 202) {
                emailAlert.textContent = "Email Already Exists!"
            } else if (res.status === 400) {
                emailAlert.textContent = "Please enter a valid email address!"
            } else if (res.status === 411) {
                passwordAlert.textContent = "Passwords must be at least 4 characters!"
            }
        }).then(data=>{
            // this callback may be redundant, response could be handled on line 27 instead. 
            if(data){
                window.location.replace('/dashboard');
            }
        }).catch(e=>{
            console.log(e)
        })
       
               // check the response status
        
    }
}
btn.addEventListener('click', signUpFormHandler)

