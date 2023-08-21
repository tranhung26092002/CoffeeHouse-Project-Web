async function handleRegister(){
    try {
            // lay thong tin 
        const username = document.getElementById('new_username').value;
        const email = document.getElementById('new_email').value;
        const password = document.getElementById('new_password').value;
        // gui value
        const response =await axios.post('api/auth/register', {
            new_username: username,
            new_email: email,
            new_password: password
        })
        if(response.status === 200){
            window.location.href = "/login.html";
        }
    } catch (error) {
        console.log(error);
    }
}
