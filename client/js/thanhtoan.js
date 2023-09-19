async function getList() {
  try {
    const response = await axios.get("auth/user/products");
    showListProduct(response);
  } catch (error) {
    //error
    if (error.response && error.response.status === 401) {
      window.location.href = "/login.html";
    }
  }
}
getList();

function showListProduct(response) {
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
  response.data.forEach(function (product) {
    htmlProduct += `<tr>
                        <td>${product.name}</td>
                        <td>${product.price} đồng</td>
                        <td>
                            <div class="quantity-container">
                            <button class="quantity"  onclick="decrementQuantity('${product._id}')">-</button>
                            <input class="quantity_input" id="${product._id}" type="number" role="spinbutton" aria-valuenow="1" value="${product.quantity}">
                            <button class="quantity"  onclick="incrementQuantity('${product._id}')">+</button>
                            </div> 
                        </td>
                        <td>
                            <button 
                                id="${product._id}"
                                class="delete"
                                onclick="handleDeleteProduct(this.id)">X
                            </button>
                        </td>
                    </tr>`;

    const productPrice = parseFloat(product.price);
    const productQuantity = parseInt(product.quantity);

    const productTotal = productPrice * productQuantity;
    totalAmount += productTotal;
  });

  htmlProduct += `   </tbody>
                </table>`;

  document.querySelector(".list_container").innerHTML = htmlProduct;
  document.getElementById("total-amount").textContent = `${totalAmount} đồng`;
}

async function handleDeleteProduct(productId) {
  try {
    // call api
    const response = await axios.delete(
      `auth/user/products/delete/${productId}`
    );
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/login.html";
    }
  }
}

async function decrementQuantity(productId) {
  try {
    // lay thong tin
    const quantityInput = document.getElementById(productId);
    const quantity = parseInt(quantityInput.value);

    // Giảm giá trị số lượng
    if (quantity > 1) {
      quantityInput.value = quantity - 1;
    }

    const response = await axios.put(`auth/user/products/update/${productId}`, {
      quantity: quantityInput.value,
    });
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
async function incrementQuantity(productId) {
  try {
    // Lấy thông tin số lượng
    const quantityInput = document.getElementById(productId);
    const quantity = parseInt(quantityInput.value) + 1;
    quantityInput.value = quantity;

    const response = await axios.put(`auth/user/products/update/${productId}`, {
      quantity: quantityInput.value,
    });
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
  }
}

async function checkout() {
  try {
    // lay infor
    const phoneNumber = document.getElementById("phoneNumber").value;
    const address = document.getElementById("address").value;
    const discountCode = document.getElementById("discountCode").value;
    const selectedPaymentMethod = document.querySelector(
      'input[name="method-payment"]:checked'
    ).value;
    const selectedDeliverytMethod = document.querySelector(
      'input[name="method-delivery"]:checked'
    ).value;

    // gui value
    const response = await axios.post("auth/user/infor/bill/create", {
      phoneNumber: phoneNumber,
      address: address,
      discountCode: discountCode,
      deliverytMethod: selectedDeliverytMethod,
      paymentMethod: selectedPaymentMethod,
    });
    if (response.status == 200) {
      console.log(response);
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Hiển thị cửa sổ thông báo xác nhận
      alert("Lỗi xác thực tài khoản. Thử lại!");
    }
  }
}
