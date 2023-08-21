async function handleLogin(){
    // lay infor
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // gui value
    const response =await axios.post('api/auth/login', {
        email: email,
        password: password
    })
    if(response.status == 200){
        const accessToken = response.data.accessToken;
        //decode lay ra thong tin payload
        const payloadDecoded = jwt_decode(accessToken);

        if(payloadDecoded.role === 'customer'){
            window.location.href = '/home_page.html';     
        }else{
            window.location.href = '/admin_page.html';
        }
        // save accesstoken to client
        localStorage.setItem('access_token', accessToken);
    }
}