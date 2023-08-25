function handleTrangchu(){
    window.location.href = 'home_page.html';
}

function handleFood(){
    window.location.href = 'Food.html';
}

function handleDrink(){
    window.location.href = 'Drink.html';
}

function handleBill(){
    window.location.href = 'thanhtoan.html';
}

function handleNews(){
    window.location.href = 'tintuc.html';
}

function handleAddress(){
    window.location.href = 'diachi.html';
}

function handleLogoutUser(){
    localStorage.removeItem('access_token');
    window.location.href = 'login.html';
}

async function getListTask(){
    try {
        // call api get listuser
        const name = await axios.get('auth/admin/user');
        //show name
        const accessToken = localStorage.getItem('access_token')
        const payloadDecoded = jwt_decode(accessToken);
        document.querySelector('.name_user').innerText = payloadDecoded.username;

        const response = await axios.get('auth/user/foods');
        showListFood(response);

    } catch (error) {
        //error
        if(error.response.status === 401){
            window.location.href = "/login.html";
        }
    }
}
getListTask();

function showListFood(response){
    let htmlFood = ``;
    response.data.forEach(function(food){
        htmlFood +=`<div class="product">
                        <span class="product-name">${food.name}</span>
                        <span class="product-price">${food.price}</span>
                        <input type="number" class="product-quantity" value="1" min="1">
                        <button class="remove-product">Xóa</button>
                    </div>`;
    });
    document.querySelector('.food_list').innerHTML = htmlFood;
}