
async function getUser(){
    try {
        // Lấy ID của người dùng từ token
        const accessToken = localStorage.getItem('access_token')
        const payloadDecoded = jwt_decode(accessToken);
        const userId = payloadDecoded._id; 

        // call api get inforUser
        const response = await axios.get(`auth/user/infor/${userId}`);
        showUser(response);

    } catch (error) {
        //error
        if(error.response && error.response.status === 401){
            window.location.href = '/login.html';
        }
    }
}
getUser();

function showUser(response) {
    const userData = response.data; // Giả sử 'response.data' chứa thông tin người dùng

    // Cập nhật giá trị của các phần tử HTML để hiển thị thông tin người dùng
    document.getElementById('username').value = userData.username;
    document.getElementById('email').value = userData.email;
    document.getElementById('role').value = userData.role;

    const roleSelect = document.getElementById('role');
    // Duyệt qua tất cả các tùy chọn và chọn tùy chọn có giá trị trùng khớp với dữ liệu người dùng
    for (let i = 0; i < roleSelect.options.length; i++) {
        if (roleSelect.options[i].value === userData.role) {
            roleSelect.selectedIndex = i;
            break; // Đã tìm thấy giá trị, không cần duyệt tiếp
        }
    }
    let htmlUpdate =   `<button 
                            id="${userData._id}"
                            onclick="handleSubmitUpdateUser(this.id)"
                            type="button" class="btn btn-primary">Update User
                        </button>`;
    document.querySelector('.card-footer').innerHTML = htmlUpdate;
}

async function handleSubmitUpdateUser(userId){
    try {
        // lay thong tin 
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const new_password = document.getElementById('new_password').value;
        
        if (new_password === '') {

            alert('Vui lòng nhập mật khẩu mới.');
        } else {
            // gui value
            const response =await axios.put(`auth/user/infor/update/${userId}`, {
                username: username,
                email: email,
                password: password,
                new_password: new_password,
            });
            if(response.status === 200){
                //Hiển thị cửa sổ thông báo xác nhận thành công
                alert('Cập nhật thành công.');
                window.location.href = '/login.html';
            }
        }
    } catch (error) {
        if(error.response && error.response.status === 400){
            // Hiển thị cửa sổ thông báo xác nhận 
            alert('Mật khẩu cũ không đúng.');
        }    
    }
}
