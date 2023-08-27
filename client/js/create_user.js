async function handleSubmitAddUser(){
    try {
        // lay thong tin 
        const username = document.getElementById('new_username').value;
        const email = document.getElementById('new_email').value;
        const password = document.getElementById('new_password').value;
        const role = document.getElementById('role').value;
        // gui value
        const response =await axios.post('auth/admin/users/create', {
            new_username: username,
            new_email: email,
            new_password: password,
            role: role
        })
        if(response.status === 200){
            window.location.href = "admin_page.html";
        }
    } catch (error) {
        console.log('error');
    }
}