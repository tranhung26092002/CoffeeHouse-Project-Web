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
    showListProduct(response);
  } catch (error) {
    //error
    if (error.response.status === 401) {
      window.location.href = "/login.html";
    }
  }
}
getCustomer();

function showListProduct(response) {
  let totalAmount = 0;
  let htmlUser = `<table class="table table-hover text-nowrap">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Productname</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>`;
  response.data.forEach(function (product, index) {
    const productPrice = parseFloat(product.price);
    const productQuantity = parseInt(product.quantity);
    const productTotal = productPrice * productQuantity;
    totalAmount += productTotal;

    htmlUser += `<tr>
                        <td>${index + 1}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>${productTotal}</td>
                    </tr>`;
  });
  htmlUser += `   </tbody>
                </table>`;

  document.querySelector(".list_user").innerHTML = htmlUser;
  document.getElementById(
    "total-amount"
  ).textContent = `Bill for you : ${totalAmount} đồng`;
}

function handlePrint() {
  alert("In thành công.");
  window.location.href = "/manager.html";
}

function handleLogoutUser() {
  localStorage.removeItem("access_token");
  window.location.href = "/login.html";
}
