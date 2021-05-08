const logout = document.getElementById('logout');

const logoutHandler = async () =>{
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 204){
       document.location.replace("/");
       return
    }
}
logout.addEventListener('click', logoutHandler)