async function addToCartProduct(productName, productPrice) {
    try {
        // Tạo một đối tượng chứa thông tin sản phẩm
        const productData = {
            name_product: productName,
            price_product: productPrice,
        };

        const response = await axios.post('auth/user/products/create', productData);

        if (response.status === 200) {
            console.log('Thêm thành công'); // In ra thông báo từ máy chủ
        } else {
            console.error('Lỗi:', response.status);
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}
