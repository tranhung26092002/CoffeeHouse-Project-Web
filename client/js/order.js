//show name manager
const accessToken = localStorage.getItem("access_token");
const payloadDecode = jwt_decode(accessToken);
document.querySelector(".username").innerText = payloadDecode.username;

async function getCustomer() {
  try {
    // Lấy userId từ URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get("userId");
    const username = urlParams.get("username");
    document.querySelector(".customername").innerText = username;

    // call api get listuser
    const response = await axios.get(`auth/manager/users/products/${userId}`);
    showList(response);
  } catch (error) {
    //error
    if (error.response.status === 401) {
      window.location.href = "/login.html";
    }
  }
}
getCustomer();

function showList(response) {
  let htmlBill = ``;
  // Kiểm tra nếu không có dữ liệu hóa đơn
  if (!response.data || response.data.length === 0) {
    document.querySelector(".bill").innerHTML = "<p>Không có hóa đơn nào.</p>";
    return;
  }
  response.data.forEach(function (bill, index) {
    const createdAtDate = new Date(bill.createdAt);
    htmlBill += `<div class="bill-container">
                  <h1>Hóa đơn số : ${index + 1}</h1>
                  <div class="bill-details">
                    <div class="customer-details">
                      <h2>Thông tin khách hàng</h2>
                      <p>Tên: ${bill.name}</p>
                      <p>Email: ${bill.email}</p>
                      <p>Số điện thoại: ${bill.phoneNumber}</p>
                      <p>Địa chỉ: ${bill.address}</p>
                    </div>
                    <div class="payment-details">
                      <h2>Thông tin thanh toán</h2>
                      <p>Tổng số tiền: ${bill.totalAmount}</p>
                      <p>Mã giảm giá: ${bill.discountCode}</p>
                      <p>Phương thức thanh toán: ${bill.paymentMethod}</p>
                      <p>Phương thức giao hàng: ${bill.deliveryMethod}</p>
                    </div>
                  </div>

                  <div class="created-at">
                    <h2>Thời gian tạo hóa đơn</h2>
                    <p>Ngày: ${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()} - ${createdAtDate.getHours()}:${createdAtDate.getMinutes()}</p>
                  </div>

                  <div class="product-list">
                    <h2>Danh sách sản phẩm</h2>
                    <ul id="product-list-ul">
                      ${bill.products.map((product) => `<li>${product.name} - ${product.price} x ${product.quantity} = ${product.price * product.quantity} VND</li>`).join('')}</ul>
                  </div>
                </div>`;
  });
  document.querySelector(".list_bill").innerHTML = htmlBill;
}

function handlePrint() {
  alert("In thành công.");
  window.location.href = "/manager.html";
}

function handleLogoutUser() {
  localStorage.removeItem("access_token");
  window.location.href = "/login.html";
}
