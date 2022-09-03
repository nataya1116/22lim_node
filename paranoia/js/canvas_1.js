const canvas = document.getElementById('_stg1');
const c = canvas.getContext('2d');

// console.log(collisions);
canvas.width = 1024;
canvas.height = 576;
let mapState = "_start_page";

const collisionsMapSt1 = [];
// 70인 이유는 tiled상 지도의 너비가 70이기 때문
for (let i = 0; i < collisionsStg1.length; i += 70) {
    collisionsMapSt1.push(collisionsStg1.slice(i, 70 + i))
    // console.log(collisions.slice(i, 70 + i)); 이렇게 반복하면서 배열안에 타일번호를 콘솔로
    // 확인할 수 있다.
}

// 송곳을 나오게 하는 컨트롤러
let awlSt1Control = false;

const boundariesSt1 = [];
// const objCols = [];
const offsetSt1 = {
    x: -1464,
    y: -180
};

const stuffsMapSt1 = createStuffObj(stuffsStg1, c, offsetSt1);
console.log(stuffsMapSt1);

const portalsMapSt1 = createPortalObj(portalsStg1, c, offsetSt1);
console.log(portalsMapSt1);


// 충돌 부분 2차원배열 만들어주는 부분
collisionsMapSt1.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1337) 
            boundariesSt1.push(new Boundary({
                position: {
				  //  Boundary.width, Boundary.height는 바운더리 클래스에서 쓴 정적 메서드로
				      // new 인스턴스 생성 없이 호출해온 것이다.
                    x: j * Boundary.width + offsetSt1.x,
                    y: i * Boundary.height + offsetSt1.y
                },
            }))
    })
})

console.log(boundariesSt1);
// console.log(objCols);




// 이미지 불러온 부분
const image = new Image()
image.src = '/img/background/backGroundBeforeStg1.png';

const foregroundImage = new Image()
foregroundImage.src = '/img/background/foreGroundBeforeStg1.png';
//20220710 통 플레이어 이미지
const playerImage = new Image();
playerImage.src = '/img/character/$Dr Frankenstien (resizing).png';

const knifeImage1 = new Image();
knifeImage1.src = '/img/playimage/knife.png';

const knifeImage2 = new Image();
knifeImage2.src = '/img/playimage/knife.png';



// 게임 오버 되는 부분
let gameover = function(){
    // console.log(mapState);
    // 맵 스테이트가 게임오버창이 아닐때
    if(mapState !== "_game_over")return;
    // 스타트 페이지로 일정시간이 지나면 돌아가게 만든다
    setTimeout(() => {
        mapState = "_start_page";
        if(mapState ==="_start_page"){
            _start_page.style.zIndex = 99999;
        }
        location.reload("_play_page");

    }, 3000);

}


// 송곳 이미지 불러옴
const awlImageShort = new Image();
awlImageShort.src = '/img/playImage/awl_1.png';

const awlImageMedium = new Image();
awlImageMedium.src = '/img/playImage/awl_2.png';

const awlImageLong = new Image();
awlImageLong.src = '/img/playImage/awl_3.png';


// 송곳 객체 생성
const awlSt1 = new Sprite({
    position : {
        x : 478,
        y : 255
    },
    image : awlImageShort,
    sprites : {
        short : awlImageShort,
        medium : awlImageMedium,
        long : awlImageLong
    }
});
console.log(awlSt1.position.x);
console.log(awlSt1.position.y);


const playerSt1 = new Sprite({
    position: {
        // 맵 가운데에 위치하게 고
        x: canvas.width / 2 - 180 / 4 / 2,
        y: canvas.height / 2 - 320 / 6
    },
    image: playerImage,
    frames: {
        // 이미지 X축 나눌 갯수
        max: 3,
        //20220710 이미지 Y축 나눌 갯수
        maxY: 4,
        //20220710 이미지 Y축 인덱스(아래로 나눈거의 몇번째인지)
        valY: 0,
        // 이미지 X축 인덱스
        valX: 1
    },
    sprites: {
        up: playerImage,
        left: playerImage,
        right: playerImage,
        down: playerImage
    },
})
// console.log(playerSt1.position.x);
// console.log(playerSt1.position.y);
// console.log(player.height);
// console.log(player.width);


const playerColSt1 = new Boundary({
    position: {
        // 맵 가운데에 위치하게 고정
        x: playerSt1.position.x + playerSt1.width / 4.8,
        y: playerSt1.position.y + playerSt1.height / 1.8
    },
    width : 30,
    height : 30
});

const playerRaycastSt1 = new Character({
    position: {
        // 맵 가운데에 위치하게 고정
        x: playerColSt1.position.x,
        y: playerColSt1.position.y  
    },
    raycast_direction : 'down'
});

const backgroundSt1 = new Sprite({
    position: {
        x: offsetSt1.x,
        y: offsetSt1.y
    },
    image: image
})
// console.log(background);

const foregroundSt1 = new Sprite({
    position: {
        x: offsetSt1.x,
        y: offsetSt1.y
    },
    image: foregroundImage
})

const knifeSt1 = new Sprite({
    position:{
        x: offsetSt1.x+790 *2.5,
        y: offsetSt1.y+400 *2.5
    },
    image: knifeImage1
})
const knifeSt2 = new Sprite({
    position:{
        x: offsetSt1.x+769 *2.5,
        y: offsetSt1.y+600 *2.5
    },
    image: knifeImage2
})



// 키가 눌리지 않았을 때
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
 	},
    space: {
        pressed: false
    }
   // 이 안에서 콘솔 찍어서 확인 가능
}


// 방향키 움직일 때 같이 움직일 맵요소를 넣어준 곳
const movablesSt1 = [
    backgroundSt1, ...boundariesSt1,
    foregroundSt1, knifeSt1 ,knifeSt2
    , awlSt1
]


// 송곳 올라오게 이미지 교체해주는 함수
function attack(start) {
    if(start) {
    // 송곳을 여기서 그려준후 attack함수는 아래에 애니메이트 함수 내에서 실행한다
    awlSt1.draw();
        // 키입력 못하는 변수를 true로 넣어주면 된다
        // 송곳의 frames은 1이고 애니메이트 함수가 실행되면서 1씩 올라간다
        awlSt1.frames.elapsed++;
        // elapsed를 10으로 나눈 값에 따라 케이스가 달라진다
        switch (awlSt1.frames.elapsed / 7) {
            // 0 / 10 은 0 이므로 case 0을 탄다
            case 0:
                awlSt1.image =  awlSt1.Sprite.short;
                // 이 이미지를 기준 position으로 잡고
                break;

            // 10 / 10은 1 이므로 case 1을 탄다
            case 1:
                awlSt1.image =  awlSt1.Sprite.medium;
                // short이미지의 height 길이만큼 position 값을 빼준다  
                awlSt1.position.y -= 9;
                break;

            // 20 / 10은 2 이므로 case 2를 탄다
            case 2:
                awlSt1.image =  awlSt1.Sprite.long;
                // short이미지의 height 길이 2배 만큼 position 값을 빼준다 
                awlSt1.position.y -= 34;
                break;
                // 케이스의 숫자를 올리면 속도를 느리게 할 수 있다
            case 4:{
                _game_over.style.zIndex = 9999  ;
                _game_over.style.display = "block";
                console.log("죽음");
                mapState = '_game_over';
                break;
            }
            default:
                break;
        }
    }
}


// 플레이어와 충돌 처리 한 부분 값 비교해서 충돌 여부 확인해주는 곳
// rectangle1가 플레이어 이미지
function rectangularCollision({rectangle1, rectangle2}) {
    // console.log(rectangle1);
    // console.log(rectangle2);
     if( rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
        {
            return  rectangle2;
        }
}

// 애니메이트 함수를 실행해줄 함수를 만들고
function animateLoop(){
    animate(backgroundSt1, foregroundSt1, boundariesSt1, playerSt1, playerColSt1, playerRaycastSt1, movablesSt1, knifeSt1,knifeSt2);
};
// 함수를 실행시키고 전달시켜준다
animateLoop();
// 전역변수를 애니메이트의 파라미터로 받아준다
function animate(background, foreground, boundaries, player, playerCol, playerRaycast, movables,knife1,knife2) {
    // console.log(background); 아왜안ㅇㄷ9애ㅐ애애애
    window.requestAnimationFrame(animateLoop);
    speed++;

    if(speed % 3 === 0) return;
    
    
    // console.log(background);

    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    })

    stuffsMapSt1.forEach((stuff) => {
        stuff.draw();
    })

    portalsMapSt1.forEach((portal) => {
        portal.draw();
    })
//  ===============오브젝트 충돌체를 그려주는 함수 끝 ==================

// 문이랑 상호작용할때의 조건///////////////////
    if(portalDead) {
            // 전역으로 컨트롤러를 false였다가 true로 바꿔준다
            awlSt1Control = true;
            // 송곳 나오는 함수 실행
            attack(awlSt1Control);
        }
        //////////////////////////////////////////////////////////////
    // console.log(awlSt1.position.x);
    // console.log(awlSt1.position.y);
    
    player.draw();
    playerCol.draw();
    if("_play_page" === mapState && flyingKnife){
        smash (player,knife1);
        smash (player, knife2)
    }
    ///=============================================칼 날리는 조건문 
    if(gameover !== null)
    {
        gameover();
    }
    foreground.draw();
    playerRaycast.raycast();
    // c.fillStyle = 'rgba(0, 100, 100, 0.2)';
    // c.fillRect(419, 278,40,40 );

    // c.fillStyle = 'rgba(0, 0, 100, 0.2)';
    // c.fillRect(422, 279.1111111111111,80,30 );
    
	let moving = true;
    player.moving = false;
    // 플레이어 w,a,d,s 이동시 백그라운드 포지션 변경 실제로는 배경이 이동하지만
    // 화면상 캐릭터가 움직이는것 처럼 보이게함
    // w키 --------------------------------------------------------------------------------------------------
	if (keys.w.pressed && lastKey === 'w') {
		// 플레이어 움직일 때
        player.moving = true
        player.image = player.Sprite.up
        // 래이캐스트 방향
		playerRaycast.raycast_direction = "up";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 3;
        // 23346타일이 담긴 boundaries 길이 만큼 돌아준다
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
			 // 캐릭터와 맵 충돌 부분
            if (rectangularCollision({
                rectangle1: playerCol,
                // 충돌 부분과 position을 넣어준다
				rectangle2: {
                    ...boundary,
					// w키를 눌렀을 때 Y축으로 맵이 내려가야하기때문에
                    // boundary.position.y에 3을 더해준다
					position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })) 
            {
				// 부딪혔을때 콘솔에 보여줌
				console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                //배경이동 속도
                movable.position.y += 3
            });
            stuffsMapSt1.forEach((stuff) => {
                stuff.position.y += 3;
            });
            portalsMapSt1.forEach((portal) => {
                portal.position.y += 3;
            });
        }
            // background.position.y = background.position.y +=3
        // testBoundary.position.y +=3
    }
    // a키 --------------------------------------------------------------------------------------------------
    else if (keys.a.pressed && lastKey === 'a') {
		player.moving = true
        player.image = player.Sprite.left
        playerRaycast.raycast_direction = "left";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 1;
        // let el = {width: player.width/3,height: player.height/3,position:{x:player.position.x,y:player.position.y}}
		for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: playerCol,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                //배경 이동
                movable.position.x += 3;
            })
            stuffsMapSt1.forEach((stuff) => {
                stuff.position.x += 3;
            });
            portalsMapSt1.forEach((portal) => {
                portal.position.x += 3;
            });
        }
    } 
    
    
    
     // s키 --------------------------------------------------------------------------------------------------
    else if (keys.s.pressed && lastKey === 's') {
		//s 입력했을때 keys.s.pressed
        // player.moving 이동중이라는것
        player.moving = true;

        // player.image 밑에 이미지로 교체
        player.image = player.Sprite.down;
		playerRaycast.raycast_direction = "down";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 0;
        //충돌체 갯수만큼 돌아 벽
		//  let el = {width: player.width/3,height: player.height/3,position:{x:player.position.x,y:player.position.y}}
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: playerCol,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                //배경이동 속도
                movable.position.y -= 3;
            });
            stuffsMapSt1.forEach((stuff) => {
                stuff.position.y -= 3;
            });
            portalsMapSt1.forEach((portal) => {
                portal.position.y -= 3;
            });
        }
    } 
    // 오브젝트 위치값 forEach 써서 키값으로 같이 
    //이동 배경이 이동하기 때문에 오브젝트 값도 같이 옮겨 줘야 한다.
    //헷갈리면 포켓몬 참고
    // movable 도 참고 같이 넣는건 불가능
    
    // d키 --------------------------------------------------------------------------------------------------
    else if (keys.d.pressed && lastKey === 'd') {
		player.moving = true
        player.image = player.Sprite.right
		playerRaycast.raycast_direction = "right";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 2;
        // let el = {width: player.width/3,height: player.height/3,position:{x:player.position.x,y:player.position.y}}
		for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
               rectangle1: playerCol,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        // 배경, 전경, 충돌 이동하는 부분
        if (moving) {
            movables.forEach((movable) => {
                //배경이동 속도
                movable.position.x -= 3
            });
            // console.log(background.position.y)
            stuffsMapSt1.forEach((stuff) => {
                stuff.position.x -= 3
            });
            portalsMapSt1.forEach((portal) => {
                portal.position.x -= 3;
            });
        }
    }	
}


//console.log(backgroundSt1)
const playPage = document.getElementById("_play_page");



let lastKey = ''
window.addEventListener(  
    'keydown',
    (e) => { // (e)는 이벤트를 나타내는 미리 채워진 개체 (개발자의 경우 이를 e 라고 부름 걍)
        if(mapState !== "_play_page") return;
        if(isPopupOpen) return;
        //console.log(e.key))
        switch (e.key) {
            case 'w':
                // console.log('pressed w key')
                keys.w.pressed = true
                lastKey = 'w' // 해당키를 누르고 있다가 다른키를 누르면 다른키로 변경됨 위에 if문 확인
              
                break;
            case 'a':
                // console.log('pressed a key')
                keys.a.pressed = true
                lastKey = 'a'
               
                break;
            case 's':
                // console.log('pressed s key')
                keys.s.pressed = true
                lastKey = 's'
           
                break;
            case 'd':
                // console.log('pressed d key')
                keys.d.pressed = true
                lastKey = 'd'
                
                break;
            // 한글 키 추가
            case 'ㅈ':
                // console.log('pressed w key')
                keys.w.pressed = true
                lastKey = 'w' // 해당키를 누르고 있다가 다른키를 누르면 다른키로 변경됨 위에 if문 확인
               
                break;
            case 'ㅁ':
                // console.log('pressed a key')
                keys.a.pressed = true
                lastKey = 'a'
               
                break;
            case 'ㄴ':
                // console.log('pressed s key')
                keys.s.pressed = true
                lastKey = 's'
                
                break;
            case 'ㅇ':
                // console.log('pressed d key')
                keys.d.pressed = true
                lastKey = 'd'
                
                break;
        }
        // console.log(keys)
    }
)


window.addEventListener(
    'keyup',
    (e) => { // keydown시 true로 바뀌어 다시 돌아오지 않기 때문에 keyup도 따로 설정해준다.
        switch (e.key) {
            case 'w':
                keys.w.pressed = false
                pauseMoveM()
                break;
            case 'a':
                keys.a.pressed = false
                pauseMoveM()
                break;
            case 's':
                keys.s.pressed = false
                pauseMoveM()
                break;
            case 'd':
                keys.d.pressed = false
                pauseMoveM()
                break;
            // 한글 키 추가
            case 'ㅈ':
                keys.w.pressed = false
                pauseMoveM()
                break;
            case 'ㅁ':
                keys.a.pressed = false
                pauseMoveM()
                break;
            case 'ㄴ':
                keys.s.pressed = false
                pauseMoveM()
                break;
            case 'ㅇ':
                keys.d.pressed = false
                pauseMoveM()
                break;
        }
        // console.log(keys)
        //===================================================이 위치에 값 넣어주면 됨
        // console.log(player.position)
        // console.log(`backgorund x ${movables[0].position.x} y ${movables[0].position.y}`)
        // console.log(`boundary x ${movables[1].position.x} y ${movables[1].position.y}`)
        // console.log(`foreground x ${movables[2].position.x} y ${movables[2].position.y}`)
        // console.log(keys)
    }
)
//  if(player.moving === true){
//        moveBgm()
//     }else if(player.moving === false){
        
//         pauseMoveM()
//     }


const divArr = document.querySelectorAll('container_box>div');
// forEach 이용

// console.log(divArr);
document.querySelectorAll('container_box>div').forEach(el => {
    el.style.zIndex = "";
})


//=================== 칼 날아오는 부분  ==================

function smash (player, knife1){
    if( player.position.x + player.width >= knife1.position.x && 
        player.position.x <= knife1.position.x + knife1.width && 
        player.position.y <= knife1.position.y + knife1.height &&
        player.position.y + player.height >= knife1.position.y)
    {
        _game_over.style.zIndex = 9999 ;
        _game_over.style.display = "block";
        console.log("죽음");
        mapState = '_game_over';
        console.log("됨")
    }
    else{
        knife1.position.y -= 20;
        knife1.draw();
    }
}
function smash (player, knife2){
    if( player.position.x + player.width >= knife2.position.x && 
        player.position.x <= knife2.position.x + knife2.width && 
        player.position.y <= knife2.position.y + knife2.height &&
        player.position.y + player.height >= knife2.position.y)
    {
        _game_over.style.zIndex = 9999  ;
        _game_over.style.display = "block";
        console.log("죽음");
        mapState = '_game_over';
    }
    else{
        knife2.position.y -= 20;
        knife2.draw();
    }
}
