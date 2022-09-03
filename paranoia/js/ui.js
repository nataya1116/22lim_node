const itemList = []


window.onload =function(){
    baseBgm()
    _start_page.style.zIndex = 999;

}

// const mainButton = false
_main_button.onclick = function(){
        _setting_board.style.zIndex = 0;
        _start_page.style.zIndex = 999;
        location.reload("_play_page");
}
// }======================================================================
_loadfile_button.onclick = function(){
    _setting_board.style.zIndex = 0;
    _load_filed.style.zIndex = 999;
}
//======================================================================




_start_btn.onclick = function(){
        document.addEventListener("keydown", event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
            }
        });
        paragraph(prologText);
        document.querySelectorAll('#container_box>div').forEach(el => {
            el.style.zIndex = "";
        })
        _prolog.style.zIndex = 999;
        mapState = "_prolog";
    };
    // 하위 인벤토리 창이 먼저 뜨고 거기에 엑스레이 필름을 누르면  상위 보드 뜨게 하기


    _loadfile_button.onclick = function(){
        settingBoardHidden();
        loadFileView()
        document.querySelectorAll('#container_box>div').forEach(el => {
                        el.style.zIndex = "";
                    })
        _load_filed.style.zIndex = 999;
    }

//===============================================================
    

let isInventory = new Inventory([]);


// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++
const ctx = "";

const stuffTempArr = createStuffObj(stuffsStg1, ctx, offsetSt1);
// console.log(stuffTempArr); 
const stuffTempArr2 = createStuffObj(stuffsStg2, ctx, offsetSt1);
// console.log(stuffTempArr2);
// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++

// let settingBoardView = false
// console.log(isInventory.importList());
window.addEventListener(  
    'keydown', function(event){
    if(mapState !== "_play_page") return;

    if(event.key == "i" || event.key == "ㅑ"){
        if(isInventoryView){
            inventoryHidden();
        }else if(isPopupOpen === false){
            inventoryView();
        }
        
    }
    if(event.key == "Escape"){
        if(isSettingBoardView){
            settingBoardHidden();
        }else if(isPopupOpen === false){
            settingBoardView();
        }
        if(_load_filed.style.zIndex=="999"){
            loadFileHidden()
        }
    }

    if(event.key == ' ') {
        if(mapState !== "_play_page") return ;
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

        if(!!stuff){

            if(stuff.name === "구급함"){

                console.log("구급함이다");
                // 저장부분 보여주기만
                if(isSaveFileView){
                    saveFileHidden();
                    return;
                } else if(isPopupOpen === false) {
                    saveFileView();
                    return;
                }
            }

            if(stuff.name === "게시판" && boardCnt === 2){
                gsap.to('#_stg_back', {
                    zIndex : 1000,
                    opacity: 0.4,
                    repeat : 3,
                    yoyo : true,
                    duration:0.2,
                    display : "block",
                    onComplete(){
                        gsap.to('#_stg_back',{
                            opacity: 1,
                            display : "block"
                        })
                        changeImageBgm()
                        image.src = '/img/background/backgroundAfterStg1.png';
                        foregroundImage.src = '/img/background/foreGroundAfterStg1.png';
                    }
                });
                pauseimgChM();
            }

            if (stuff.name === "게시판") boardCnt++;

            if(isTextBoxView){
                textBoxHidden();
                return;
            }else if(isPopupOpen === false){ 
                const ret = stuff.contact(); 
                console.log(ret);
                textBoxView(ret.msg);
                if(!!ret.item.name) itemget(ret.item.name, ret.item.info, true);
                return;
            }
        }
    
        
        const portal = portalsMapSt1.find((portal) => {
            let col = rectangularCollision({
                rectangle1: playerRaycastSt1.raycast(),
                // rectangle2: {width : portal.width, height : portal.height, position : portal.position}
                rectangle2: portal
            });
    
            if(!!col) {
                return portal;
            }
        })
        // !!느낌표 두개는 값이 있을 때를 말해줌
        if(!!portal){
            if(portal.isDead){
                portalDead = true;
                console.log(portal.isDead);
                return;
            }
            console.log(portal);
            if(isQuizeBox){
                quizeBoxHidden();
                return;
            }else if(isPopupOpen === false){

                // TODO 뒤지는 거랑 맵 스테이트 게임 오버로 수정

                const ret = portal.contact();
                isQuizeBox = true;
                
                // // 이동 가능
                // if(ret.move) {
                //     // 이동 화면 또는 사진

                //     return;
                // }

                quizeBoxView(ret.msg, portal.name, portal.isKeyboard);
                return;
            }
        }
    }

    // 퀴즈 값 받을 때
    if(event.key == "Enter"){
        if(isQuizeBox){
            const portal = portalsMapSt1.find(i => { return i.name  === _answer_input.data })
            const ret = portal.inputPw(_answer_input.value);

            // // 이동 가능
            // if(ret.move) {
            //     // 이동 화면 또는 사진
                
            //     return;
            // }

            quizeBoxView(ret.msg, "", false);

        }
    }
});

let prolSkip = document.querySelector(".prolSkip")
 

// function btnSkip(event){
//     event.push = ".prolSkip"
//     event.style.fontSize = "27px";
// }

prolSkip.onclick = function(){
    document.querySelectorAll('#container_box>div').forEach(el => {
            el.style.zIndex = 999;
            el.style.display = "none";
        })
        _play_page.style.zIndex = 999;
        pauseBaseM()
        doorBgm()
        _play_page.style.display = "block";
        mapState = "_play_page";
        gsap.to('#_map_change', {
            zIndex : 1000,
            opacity: 0.7,
            repeat : 2,
            yoyo : true,
            display : "block",
            // transition : "opacity 0.3s ease-out-in 0s",
            duration:0.2,
            onComplete(){
                gsap.to('#_map_change',{
                    zIndex : 0
                })
                flyingKnife = true;
            }
        });
        // // setTimeout(function() {
        // //     // event.prolSkip.style.fontSize = "27px";
        // //     console.log("됨?")
        // // }, 3000);
        // setTimeout(btnSkip,3000);
}



const prologText = document.getElementById('_prolog_text');

document.querySelectorAll('.item_td').forEach(e=>{
    e.addEventListener('click',function(){
        document.querySelectorAll('.item_td').forEach(e=>{
            e.classList.remove('active')
        })
        this.classList.add('active');
    })
})