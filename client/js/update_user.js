// Lấy userId từ URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('userId');

// Sử dụng userId để lấy thông tin của người dùng từ nguồn dữ liệu (ví dụ: API hoặc cơ sở dữ liệu)
if (userId) {
    // Gửi yêu cầu API và hiển thị thông tin người dùng
    getUser(userId);
} else {
    console.error('userId không hợp lệ');
}

// Sau đó, hiển thị thông tin này trên trang Update
async function getUser(userId){
    try {
        // call api get listuser
        const response = await axios.get(`auth/admin/users/user/${userId}`);
        showUser(response);

    } catch (error) {
        //error
        if(error.response && error.response.status === 401){
            window.location.href = '/login.html';
        }
    }
}
getUser(userId);

function showUser(response) {
    const userData = response.data; // Giả sử 'response.data' chứa thông tin người dùng

    // Cập nhật giá trị của các phần tử HTML để hiển thị thông tin người dùng
    document.getElementById('username').value = userData.username;
    document.getElementById('email').value = userData.email;

    const roleSelect = document.getElementById('role');
    // Duyệt qua tất cả các tùy chọn và chọn tùy chọn có giá trị trùng khớp với dữ liệu người dùng
    for (let i = 0; i < roleSelect.options.length; i++) {
        if (roleSelect.options[i].value === userData.role) {
            roleSelect.selectedIndex = i;
            break; // Đã tìm thấy giá trị, không cần duyệt tiếp
        }
    }
    let htmlUpdate = `<div>
                            <button 
                                id="${userData._id}"
                                onclick="handleSubmitUpdateUser(this.id)"
                                type="button" class="btn btn-primary">Update User
                            </button>
                        </div>`;
    document.querySelector('.card-footer').innerHTML = htmlUpdate;
}

async function handleSubmitUpdateUser(userId){
    try {
        // lay thong tin 
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const new_password = document.getElementById('new_password').value;
        const role = document.getElementById('role').value;
        
        if (new_password === '') {
            alert('Vui lòng nhập mật khẩu mới.');
        } else {
            const response =await axios.put(`auth/admin/users/update/${userId}`, {
                username: username,
                email: email,
                password: password,
                new_password: new_password,
                role: role
            })
            if(response.status === 200){
                //Hiển thị cửa sổ thông báo xác nhận thành công
                alert('Cập nhật thành công.');
                window.location.href = '/admin_page.html';
            }
        }
    } catch (error) {
        if(error.response && error.response.status === 400){
            // Hiển thị cửa sổ thông báo xác nhận 
            alert('Mật khẩu cũ không đúng.');
        }    
    }
}
