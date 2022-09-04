function skinWish (userId, productId, aId) {
    if(!userId) {
        alert("로그인을 먼저 해주세요.");
        return;
    }

    const url = "/skin_wish/create";
    const data = { userId, productId };
    const imgId = aId.childNodes[0];

    $.post(url, data, (productWish) => {
        if(productWish){
            aId.onclick = function () {
                skinWishCancel(userId, productId, productWish.id, aId);
            };
            imgId.src = "/img/heart2.png";
        }else{
            alert("실패하였습니다.");
        }
    });
}

function skinWishCancel (userId, productId, productWishId, aId) {
    if(!userId) {
        alert("로그인을 먼저 해주세요.");
        return;
    }

    const url = "/skin_wish/delete";
    const data = { productWishId };
    const imgId = aId.childNodes[0];

    $.post(url, data, (result) => {
        if(result == "suc"){
            aId.onclick = function (data) {
                skinWish(userId, productId, aId);
            };
            imgId.src = "/img/heart1.png";
        }else{
            alert("실패하였습니다.");
        }
    });
}

function skinBuy(userId, productId, productPoint, btnId) {
    if(!userId) {
        alert("로그인을 먼저 해주세요.");
        return;
    }

    const userPoint = Number(user_point.innerHTML || 0);
    // console.log(user_point.value);
    
    if(productPoint > userPoint) {
        alert("보유한 코인의 갯수가 모자랍니다.");
        return;
    }

    const url = "/skin_user/buy";
    const data = { userId, productId };

    $.post(url, data, (result) => {
        if(result.result == "suc"){
            btnId.onclick = function () {
                skinToUse(userId, productId, btnId);
            };
            btnId.innerHTML = "to use";
            btnId.style.backgroundColor = "#c4c4c4";
            btnId.style.color = "#000";
            user_point.innerHTML = result.point;
        }else{
            alert("실패하였습니다.");
        }
    });
    
}

function skinToUse(userId, productId, btnId) {
    if(!userId) {
        alert("로그인을 먼저 해주세요.");
        return;
    }

    const url = "/skin_user/use"
    const data = { userId, productId };

    $.post(url, data, (result) => {
        if(result == "suc"){
            // buy-btn 클래스를 가진 버튼 중 disabled 처리되어 있는 버튼을 찾아 skinToUse() 함수를 넣는 처리를 해준다.
            const buyBtnList = document.querySelectorAll(".buy-btn");
            buyBtnList.forEach((btn) => {
                if(btn.disabled){
                    btn.disabled = false;
                    btn.innerHTML = "to use";
                    btn.style.backgroundColor = "#c4c4c4";
                    btn.style.color = "#000";
                    btn.onclick = function () {
                        skinToUse(userId, productId, btn);
                    };
                }
            });

            btnId.disabled = true;
            btnId.innerHTML = "in use";
            btnId.onclick = null;
            btnId.style.backgroundColor = "black";
            btnId.style.color = "white";

        }else{
            alert("실패하였습니다.");
        }
    })
    

}