async function addToCartFood(productName, productPrice) {
    try {
        // Tạo một đối tượng chứa thông tin sản phẩm
        const productData = {
            name_food: productName,
            price_food: productPrice
        };

        // Gửi yêu cầu POST đến máy chủ bất đồng bộ sử dụng fetch
        const response = await axios.post('auth/user/foods/create', productData);

        if (response.status === 200) {
            console.log(response.data.message); // In ra thông báo từ máy chủ
        } else {
            console.error('Lỗi:', response.status);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}
