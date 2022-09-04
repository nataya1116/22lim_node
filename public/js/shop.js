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
        }
    });
}

function skinBuy(userId, productId, productPoint, userPoint, btnId) {
    if(productPoint > userPoint) {
        alert("보유한 코인의 갯수가 모자랍니다.");
        return;
    }

    const url = "/skin_user/buy";
    const data = { userId, productId, productPoint };

    $.post(url, data, (result) => {
        if(result == "suc"){
            btnId.onclick = function (data) {
                skinToUse(userId, productId, btnId);
            };
            btnId.innerHTML = "to use";
        }
    });
    
}

function skinToUse(userId, productId, btnId) {
    // buy-btn 클래스를 가진 버튼 중 disabled 처리되어 있는 버튼을 찾아 skinToUse() 함수를 넣는 처리를 해준다.

}