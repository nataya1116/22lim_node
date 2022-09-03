const canvas2 = document.getElementById('#_stg2');
const c2 = canvas2.getContext('2d');

// console.log(collisions);
canvas2.width = 1024;
canvas2.height = 576;
let mapState = "_start_page";

const collisionsMapSt1 = [];
// 70인 이유는 tiled상 지도의 너비가 70이기 때문
for (let i = 0; i < collisionsStg2.length; i += 70) {
    collisionsMapSt2.push(collisionsStg2.slice(i, 70 + i))
    // console.log(collisions.slice(i, 70 + i)); 이렇게 반복하면서 배열안에 타일번호를 콘솔로
    // 확인할 수 있다.
}

const boundariesSt2 = [];
// const objCols = [];
const offsetSt2 = {
    x : -925,
    y : -740
};



// 충돌 부분 2차원배열 만들어주는 부분
collisionsMapSt2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 23346) 
            boundariesSt2.push(new Boundary({
                position: {
				  //  Boundary.width, Boundary.height는 바운더리 클래스에서 쓴 정적 메서드로
				      // new 인스턴스 생성 없이 호출해온 것이다.
                    x: j * Boundary.width + offsetSt2.x,
                    y: i * Boundary.height + offsetSt2.y
                },
            }))
    })
})
console.log(boundariesSt2);

//////////여기에 stuffsStg2 받아오는 곳에서 꼭 이름 변경/////////////////////////
const stuffsMapSt2 = createStuffObj(stuffsStg2, c2);
console.log(stuffsMapSt2);

const portalsMapSt2 = createPortalObj(portalsStg2, c2);
console.log(portalsMapSt2);
/////////////////////////////////////////////////////////////////
// console.log(boundariesSt2);
// console.log(objCols);




// 이미지 불러온 부분
const image = new Image()
image.src = '/img/background/backGroundStg2.png';

const foregroundImage = new Image()
foregroundImage.src = '/img/background/foreGroundStg2.png';
//20220710 통 플레이어 이미지
const playerImage = new Image();
playerImage.src = '/img/character/$Dr Frankenstien (resizing).png';


const awlSt2 = new Sprite({
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
console.log(awlSt2.position.x);
console.log(awlSt2.position.y);



const playerSt2 = new Sprite({
    position: {
        // 맵 가운데에 위치하게 고
        x: canvas2.width / 2 - 180 / 4 / 2,
        y: canvas2.height / 2 - 320 / 6
    },
    image: playerImage,
    frames: {
        // 이미지 X축 나눌 갯수
        max: 3,
        //20220710 이미지 Y축 나눌 갯수
        maxY: 4,
        //20220710 이미지 Y축 인덱스(아래로 나눈거의 몇번째인지)
        valY: 3,
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


// console.log(player.position.x);
// console.log(player.position.y);
// console.log(player.height);
// console.log(player.width);
const playerColSt2 = new Boundary({
    position: {
        // 맵 가운데에 위치하게 고정
        x: playerSt2.position.x + playerSt2.width / 4.8,
        y: playerSt2.position.y + playerSt2.height / 1.8
    },
    width : 30,
    height : 30
});

const playerRaycastSt2 = new Character({
    position: {
        // 맵 가운데에 위치하게 고정
        x: playerColSt2.position.x,
        y: playerColSt2.position.y  
    },
    // playerCol : playerColSt1,
    raycast_direction : 'down'
});

const backgroundSt2 = new Sprite({
    position: {
        x: offsetSt2.x,
        y: offsetSt2.y
    },
    image: image
})
// console.log(background);

const foregroundSt2 = new Sprite({
    position: {
        x: offsetSt2.x,
        y: offsetSt2.y
    },
    image: foregroundImage
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



const movablesSt2 = [
    backgroundSt2, ...boundariesSt2,
    foregroundSt2, awlSt2
]


function attack(start) {
    if(start) {
        // 키입력 못하는 변수 true
        //ss
        awlSt2.frames.elapsed++;
        switch (awlSt2.frames.elapsed / 10) {
            case 0:
                awlSt2.image =  awlSt2.Sprite.short;
                break;
            case 1:
                awlSt2.image =  awlSt2.Sprite.medium;  
                awlSt2.position.y -= 9;
                break;
            case 2:
                awlSt2.image =  awlSt2.Sprite.long;
                awlSt2.position.y -= 34;
                break;
            default:
                break;
        }
    }
}


// 플레이어와 충돌 처리 한 부분 값 비교해서 충돌 여부 확인해주는 곳
// rectangle1가 플레이어 이미지
function rectangularCollision({rectangle1, rectangle2}) {
     if( rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
        {
            return  rectangle2;
        }
}

function animateLoop(){
    animate(backgroundSt2, foregroundSt2, boundariesSt2, playerSt2, playerColSt2, playerRaycastSt2, movablesSt2);
};

animateLoop();
// 전역변수를 애니메이트의 파라미터로 받아준다
function animate(background, foreground, boundaries, player, playerCol, playerRaycast, movables) {
    // console.log(background); 아왜안ㅇㄷ9애ㅐ애애애
    window.requestAnimationFrame(animateLoop);
    // console.log(background);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    })

    stuffsMapSt2.forEach((stuff) => {
        stuff.draw(offsetSt2.x, offsetSt2.y);
    })

    portalsMapSt2.forEach((portal) => {
        portal.draw(offsetSt2.x, offsetSt2.y);
    })
//  ===============오브젝트 충돌체를 그려주는 함수 끝 ==================

    // 여기 지우고 수진언니가 만든 문이랑 상호작용하는 함수 넣기////////////////
    window.onkeydown = function(e){
        if(e.key == '1'){
            
            // 이 조건만 넣어주기!
            awlSt2Control = true;
        }
    }
    //////////////////////////////////////////////////////////////
    attack(awlSt2Control);

    awlSt2.draw();
    player.draw();
    playerCol.draw();
    foreground.draw();
    
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
            stuffsMapSt2.forEach((stuff) => {
                stuff.position.y += 3;
            });
            portalsMapSt2.forEach((portal) => {
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
            stuffsMapSt2.forEach((stuff) => {
                stuff.position.x += 3;
            });
            portalsMapSt2.forEach((portal) => {
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
            stuffsMapSt2.forEach((stuff) => {
                stuff.position.y -= 3;
            });
            portalsMapSt2.forEach((portal) => {
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
            console.log(background.position.y)
            stuffsMapSt2.forEach((stuff) => {
                stuff.position.x -= 3
            });
            portalsMapSt2.forEach((portal) => {
                portal.position.x -= 3;
            });
        }
    }
     
	 //20220710 레이케스트 스페이스바--------------------------------------------------------------
    else if (keys.space.pressed && lastKey === 'space') {
        playerRaycast.raycast();
        for (let i = 0; i < boundaries.length; i++) {
            // boundaries[i] 저장된 갯수 인덱스
            const boundary = boundaries[i]
            let col = rectangularCollision({
                rectangle1: playerRaycast.raycast(),
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y
                    }
                }
            })
            // 레이캐스트 확인 하는 부분(벽에 맞으면 나옴)
            if (col) {
                // console.log(boundary.position);
                // 수진언니가 준 함수를 나중에 여기다가 넣어준다.
                console.log(col + " : 맞은 블럭임 이거");
                console.log('레이저 맞았다..')
                moving = false;
                break;
            }
        }
        keys.space.pressed = false;
    }
}
// 반복하려는 함수의 무한 루프를 생성


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
   //20220710 레이케스트 스페이스바
            case ' ':
                keys.space.pressed = true
                lastKey = 'space'
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
                break;
            case 'a':
                keys.a.pressed = false
                break;
            case 's':
                keys.s.pressed = false
                break;
            case 'd':
                keys.d.pressed = false
                break;
            // 한글 키 추가
            case 'ㅈ':
                keys.w.pressed = false
                break;
            case 'ㅁ':
                keys.a.pressed = false
                break;
            case 'ㄴ':
                keys.s.pressed = false
                break;
            case 'ㅇ':
                keys.d.pressed = false
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

const divArr = document.querySelectorAll('container_box>div');
// forEach 이용

console.log(divArr);
document.querySelectorAll('container_box>div').forEach(el => {
    el.style.zIndex = "";
})

