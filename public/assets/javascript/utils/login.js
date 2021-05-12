
const btn = document.getElementById('submit-sgn-btn');

async function signUpFormHandler(event) {
    event.preventDefault();
    const email = document.getElementById('email1').value.trim();
    const password = document.getElementById('password1').value.trim();
    const emailAlert = document.getElementById('emailHelp');
    const passwordAlert = document.getElementById('passHelp');

    if (email && password) {
        fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response=>{
            
            if (response.ok) {
                console.log(response)
                return response.json()
            } else if (response.status === 404) {
                emailAlert.textContent = "No User With That Email Exists!"
                return false
            } else if (response.status === 400) {
                passwordAlert.textContent = "Invalid Password"
                return false
            }
        }).then(d=>{
            console.log(d)
            if(d){
                window.location.replace('/dashboard')
            }else{
                alert('Server Error!\nPlease try again');
                window.location.reload()
            }
        })

        // check the response status
       
    }
}
btn.addEventListener('click', signUpFormHandler)

