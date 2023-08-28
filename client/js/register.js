function isGmailAddress(email) {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

async function handleRegister(){
    try {
            // lay thong tin 
        const username = document.getElementById('new_username').value;
        const email = document.getElementById('new_email').value;
        const password = document.getElementById('new_password').value;

        const emailAddress = email;
        if (isGmailAddress(emailAddress)) {
            // gui value
            const response =await axios.post('api/auth/register', {
                new_username: username,
                new_email: email,
                new_password: password
            });
            if(response.status === 200){
                window.location.href = "/login.html";
                alert('Tạo tài khoản mới thành công.');
                }        
        } else {
            alert('Địa chỉ Email không hợp lệ.');
        }
    } catch (error) {
        if(error.response && error.response.status === 400){
            // Hiển thị cửa sổ thông báo xác nhận 
            alert('Tài khoản đã tồn tại hoặc định dạng chưa đúng.');
        }    
    }
}