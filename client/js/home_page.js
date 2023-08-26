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

async function getName(){
    try {
        //show name
        const accessToken = localStorage.getItem('access_token')
        const payloadDecoded = jwt_decode(accessToken);
        document.querySelector('.name_user').innerText = payloadDecoded.username;

    } catch (error) {
        //error
        if(error.response && error.response.status === 401){
            window.location.href = '/login.html';
        }
    }
}
getName();
