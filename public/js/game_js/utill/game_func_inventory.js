function itemget(name, info, useing){
    let items = _item.querySelectorAll(".item_td");
    // 아이템 정보를 만들어 주고(넣어주고)
    isInventory.insert(new Item(name, info, useing));
    // 추가한 아이템의 배열을 가져오고
    let arr = isInventory.importList();
    // 추가한 아이템 배열(arr)을 updateItem 함수에 전달
    updateItem(arr);
    console.log(isInventory);
}

function removeItem(name){
    // 추가한 아이템의 배열을 가져오고
    // 가져온 배열에서 없앨 아이템을 이름으로 구분해서 제거한다.
    isInventory.out(name); 
    //why 중복?
    let arr = isInventory.importList();
     // 제거한 후 아이템 배열(arr)을 updateItem 함수에 전달
    updateItem(arr);
}


function updateItem(arr){
    let items = _item.querySelectorAll(".item_td");
    for (let i = 0; i < items.length; i++) {
        if(i < arr.length)
        {
            items[i].innerHTML = arr[i].name;
            items[i].classList.add('have');
            items[i].onclick = function(){
                _item_use.style.display = "flex";
                _item_text.querySelector('span').innerHTML = arr[i].info;  
                _item_text.querySelector('button').onclick = function(){


                    // TODO 사물과 충돌 상태인지 체크 구현
                    const stuff = stuffsMapSt1.find((stuff) => {
                        let col = rectangularCollision({
                            rectangle1: playerRaycastSt1.raycast(),
                            rectangle2: {width : stuff.width, height : stuff.height, position : stuff.position}
                            // rectangle2: stuff
                        });
                
                        if(!!col) {
                            return stuff;
                        }
                    });

                    if(!stuff){
                        inventoryHidden();
                        return;
                    } 
            
                    // 세이브 생략
                    if (stuff.name === "구급함") {
                        inventoryHidden();
                        return;
                    }

                    const ret = stuff.putItem(arr[i]);
                    if(!ret.item.name) arr[i].useing = false;
                    // console.log(ret);
                    // ---------------------테스트---------------------

                    // 배열안에 useing 정보가 false면 
                    if(arr[i].useing === false)
                    {   
                        // 삭제한다.
                        // 위에서 선언한 removeItem 함수를 가져와서
                        // 배열안에 false인 useing 값을 가지고 있는 객체의 이름을 지워준다.     
                        removeItem( arr[i].name);
                    }
                    // isPopupOpen = false;
                    inventoryHidden();
                    // textBoxView(ret.msg);
                }      
            };
        }   
        else{
            items[i].innerHTML = "";
            items[i].classList.remove('have');
        }
    }
    // 클릭후 현재 아이템 배열의 현황을 보여준다. 
    // 즉 isInventory.importList() 현재 아이템 배열이라는 것을 알 수 있다.
    // console.log(isInventory.importList());
}
