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

    $.post(url, data, (productWish) => {
        if(productWish){
            aId.onclick = function (data) {
                skinWish(userId, productId, aId);
            };
            imgId.src = "/img/heart1.png";
        }
    });
}

