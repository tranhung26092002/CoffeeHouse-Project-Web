
async function getBill() {
    try {
        // lay infor
        const phoneNumber = document.getElementById('phoneNumber').value;
        const address = document.getElementById('address').value;
        const discountCode = document.getElementById('discountCode').value;
        const selectedPaymentMethod = document.querySelector('input[name="method-payment"]:checked').value;
        const selectedDeliverytMethod = document.querySelector('input[name="method-delivery"]:checked').value;

        // gui value
        const response =await axios.post('auth/user/infor/bill/create', {
            phoneNumber: phoneNumber,
            address : address,
            discountCode: discountCode,
            deliverytMethod: selectedDeliverytMethod,
            paymentMethod: selectedPaymentMethod, 
        })
        if(response.status == 200){
            console.log(response);
        }
    } catch (error) {
        if(error.response && error.response.status === 400){
            // Hiển thị cửa sổ thông báo xác nhận 
            alert('Lỗi xác thực tài khoản. Thử lại!');
        }
    }
}