function handleTrangchu() {
  window.location.href = "home.html";
}

function handleFood() {
  window.location.href = "food.html";
}

function handleDrink() {
  window.location.href = "drink.html";
}

function handlePay() {
  window.location.href = "thanhtoan.html";
}

function handleNews() {
  window.location.href = "tintuc.html";
}

function handleAddress() {
  window.location.href = "diachi.html";
}

function handleBill() {
  window.location.href = "bill.html";
}

function inforUser() {
  window.location.href = "user.html";
}

function handleLogoutUser() {
  localStorage.removeItem("access_token");
  window.location.href = "login.html";
}

async function getName() {
  try {
    //show name
    const accessToken = localStorage.getItem("access_token");
    const payloadDecoded = jwt_decode(accessToken);
    document.querySelector(".name_user").innerText = payloadDecoded.username;
  } catch (error) {
    //error
    if (error.response && error.response.status === 401) {
      window.location.href = "/login.html";
    }
  }
}
getName();
