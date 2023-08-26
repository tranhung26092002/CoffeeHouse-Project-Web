
async function getList(){
    try {
        const response = await axios.get('auth/user/products');
        showListProduct(response);
        displayProducts(response);
    } catch (error) {
        //error
        if(error.response.status === 401){
            window.location.href = '/login.html';
        }
    }
}
getList();

function showListProduct(response){

    let totalAmount = 0;

    let htmlProduct = `<table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody id="payment-items">`;
    response.data.forEach(function(product){
        htmlProduct +=`<tr>
                        <td>${product.name}</td>
                        <td>${product.price} đồng</td>
                        <td><input type="number"  value="1" min="1"></td>
                        <td>
                            <button 
                                id="${product._id}"
                                class="delete"
                                onclick="handleDeleteProduct(this.id)">Xóa
                            </button>
                        </td>
                    </tr>`;
                    
        const productPrice = parseFloat(product.price);
        totalAmount += productPrice;
    });
    
    htmlProduct += `   </tbody>
                </table>`;

    document.querySelector('.list_container').innerHTML = htmlProduct;
    document.getElementById('total-amount').textContent =`${totalAmount} đồng`;

}
  


async function handleDeleteProduct(productId){
    try {
        // call api 
        const response = await axios.delete(`auth/user/products/delete/${productId}`);
        if(response.status === 200){
            window.location.reload();
        }
    } catch (error) {
        if(error.response.status === 401){
            window.location.href = "/login.html";
        }
    }
}
