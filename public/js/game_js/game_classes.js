// 백그라운드, 포어그라운드, 플레이어가 사용
class Sprite {
    //20220710 maxY:1,valY:0,rayImg 추가
    // frames ={max:1,maxY:1,valY:0,valX:0} 전달된 매개변수가 없을 때 넣어주는 값
    constructor({position, image, frames ={max:1, maxY:1, valY:0, valX:0}, sprites }){  
	    this.position = position;
        this.image = image;
        //20220710 레이케스트 이미지
       
        this.frames = {...frames, elapsed: 0, raycastspeed:0  }
        this.width = this.image.width / this.frames.max
        this.height = this.image.height / this.frames.maxY
        
        // 웹페이지가 다 로드 되고 나서 이부분이 로드된다.
		// this.image.onload = () => {
        //     //                   180      /      3
        //     //20220710 이미지 Y축 나눈 크기
        //     //                  320         /        4
        //     // console.log(this.image.width / this.frames.max);
        //     // console.log(this.image.height / this.frames.maxY);     
        // }
        // 기본적으로 로드될 때 움직이지 않음
        this.moving = false;
        this.Sprite = sprites;
        //20220710 플레이어가 맵에 로드 되었을 때 기본 레이케스트 방향 결정
        
    }
    
    draw(){
    
    	// c.drawImage(this.image, this.position.x, this.position.y );
        c.drawImage(
                // 여기서 배경, 전경, 플레이어 다 그려준다
                this.image,
                //       3      x      60      = 180 캐릭터이미지 총 가로길이
                this.frames.valX * this.width,
                //20220710 이미지 Y축 인덱스 곱해서(Y축 나눈거의 몇번째 줄인지 0 1 2 3)
                this.frames.valY * this.height, 
                this.image.width / this.frames.max,  
                //20220710 이미지 Y축 나눈 이미지 크기
                this.image.height / this.frames.maxY,  
                this.position.x,
                this.position.y ,
                // canvas.width / 2 - (this.image.width / 4) /2, 
                // canvas.height /2 - this.image.height / 2, 
                this.image.width / this.frames.max, 
                //20220710 이미지 Y축 나눈 이미지 크기
                this.image.height / this.frames.maxY
			)
            // 움직이지 않을 때
            if(!this.moving) return;
            // 움직일 때
            //         3 > 1 일때
            if(this.frames.max > 1){
                // elapsed가 증가하다가
                this.frames.elapsed++
            }
            // 프레임이 경과되면(elapsed가 10이 되면) 10%10은 0이 된다
            if(this.frames.elapsed%10 ===0 ){
                //           1       <          3       일 때 val이 증가
                if(this.frames.valX < this.frames.max - 1) this.frames.valX++
                // val이 0일 떄
                else this.frames.valX = 0
            }
    
    }
} 






// 클래스 안에서는 따로 fuction 으로 함수를 선언 해주지 않아도 된다.
class Boundary {
	// static 정적메서드
    static width =40
    static height =40
    constructor({position, width=40, height=40}){
        this.position = position;
         // 동일한 클래스의 정적메서드를 호출하는 경우
        // 키워드 this를 사용해서 사용할 수 있다.
        this.width = width;
        this.height = height;
    }
    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0.0)' // 확인용
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class Character {
    constructor({position, raycast_direction}) {
        this.width = 10;
        this.height = 50;
        this.position = position;
        // 래이캐스트 방향
        this.raycast_direction = raycast_direction;
    }
    // 레이케스트 4방향
    raycast(){
        
        // console.log(this.raycast_direction);
        let x;
        let y;
        let w;
        let h;
        switch (this.raycast_direction) {
            case 'up':
                x = this.position.x + (playerColSt1.width / 2) - (this.width / 2);
                y = this.position.y - this.height;
                w = this.width;
                h = this.height;

                c.fillStyle = 'rgba(0, 0, 255, 0.0)'; // 확인용
                c.fillRect(x, y, w, h);

                return {position : {x : x, y : y}, width : w, height: h};

            case 'left':
                x = this.position.x  - this.height;
                y = this.position.y + (playerColSt1.height / 2) - (this.width / 2);
                w = this.height;
                h = this.width;

                c.fillStyle = 'rgba(0, 0, 255, 0.0)' // 확인용
                c.fillRect(x, y, w, h)

                return {position : {x : x, y : y}, width : w, height: h};

            case 'right':
                x = this.position.x + playerColSt1.width;
                y = this.position.y + (playerColSt1.height / 2) - (this.width / 2);
                w = this.height;
                h = this.width;

                c.fillStyle = 'rgba(0, 0, 255, 0.0)' // 확인용
                c.fillRect(x, y, w, h)  

                return {position : {x : x, y : y}, width : w, height: h};


            case 'down':
                x = this.position.x + (playerColSt1.width / 2) - (this.width / 2);
                y = this.position.y + playerColSt1.height;
                w = this.width;
                h = this.height;

                c.fillStyle = 'rgba(0, 0, 255, 0.0)' // 확인용    
                c.fillRect(x, y, w, h)

                return {position : {x : x, y : y}, width : w, height: h};
                
            // 위에서 맞는 케이스 없으면 여기로
            default: console.log("여기");
                break;
                
        }
    }
}


// 사물 클래스
class Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo, offSet}){
        this.ctx = ctx;
        this.name = name;
        this.position = { x : (x * 2.5) + offSet.x , y : (y * 2.5) + offSet.y }; // x/y 값을 가짐
        this.width = width * 2.5;
        this.height = height * 2.5;
        this.item = { name : itemName, info : itemInfo };
        this.info = info; // 기본 설명 메세지(ex : “고장난 시계다.”, “낡아보이는 서랍장이다.”, “낡은 게시판 \n body”) 
        this.inactionMsg = "아무일도 일어나지 않는다.";
        this.takeMsg = "을(를) 찾았다.";
    }

    // ctx 객체를 이용해 캔버스에 그려준다.(이미지를 직접적으로 그려주는 것이 아닌 색상을 채워주는 방식으로 만든다.)
    // 준우님이 해주시기로
    draw(){
        c.fillStyle = 'rgba(0, 255, 0, 0.0)' // 확인용
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    // 교수님
    // 사물 객체에서 item을 제거한다.
    // itemName/itemInfo 값을 ""(빈 값)로 바꿔준다.
    emptyItem(){
        this.item.name = "";
        this.item.info = "";
    }

    // 교수님
    // 사물 객체에 아이템이 없을 경우 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.info, item : "" } 객체를 만들어 리턴한다.
    // =========== 보류 =============
    // emptyItemMsg(){
    //     return { msg : this.info, item : "" };
    // }
    // =========== 보류 =============

    // 교수님
    // 사물 객체에서 아이템을 제거할 때 사용할 함수로 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.item+this.takeMsg, item : "" }  객체를 만들어 리턴한다.
    // =========== 보류 =============
    // exportItemMsg(){
    //     return { msg : this.item.name+this.takeMsg, item : "" };
    // }
    // =========== 보류 =============

    // 플레이어가 스페이스를 눌렀을 때 불러질 함수
    // this.item이 빈 값이 아닌 경우 this.exportItemMsg()를 실행해 결과값을 저장해 두었다가 this.emptyItem()를 실행하여 값을 비워준 후 결과값을 리턴한다. this.item이 빈값인 경우 this.emptyItemMsg()를 실행하고 결과값을 리턴한다.
    contact(){
        // if(!!this.item.name){
        //     console.log(this.item.name+this.takeMsg);
        //     const res = this.item;
        //     this.emptyItem();
        //     return res;
        // }else{
        //     console.log(this.info);
        //     return this.item;
        // }
        if(!!this.item.name){
            let ret = { msg : this.item.name + this.takeMsg, item : {...this.item} };
            this.emptyItem();
            return ret;
        } else {
            return { msg : this.info, item : {...this.item} };
        }
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다. 기본은 아무 반응이 없다는 메세지를 보낸다.
    // 플레이어 인벤토리에서 아이템을 사용하면 인벤토리에서는 삭제되고 putItem에 아이템 변수가 들어오게 된다.
    // 플레이어 인벤토리에서 아이템을 사용하면 인벤토리에서 삭제 안했다가 반응이 있을 경우 삭제할 수 도 있다. 
    // { msg : this.inactionMsg,  item : item } 객체로 만들어 리턴(기본적으로 반응이 없으므로 아이템을 다시 플레이어에게 돌려준다.)
    putItem(item){
        return { msg : this.inactionMsg,  item : item };
    }
}

// 아이템을 넣으면 힌트를 주는 클래스로 Stuff의 자식 클래스이다.
class StuffHint extends Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo, offSet, hintMsg }){
        super({ctx, name, info, x, y, width, height, itemName, itemInfo, offSet });
        this.hintMsg = hintMsg;
    }

    // 소개 메세지만 리턴
    contact(){
        return { msg : [...this.info], item : {name : "", info : "" } };
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다.
    // this.item이 인자로 받은 item과 동일하다면. this.info+=this.hintMsg 하고 this.emptyItemMsg()를 실행해서 결과값을 리턴한다.
    putItem(item){
        if(this.item.name === item.name){
            this.info+=`<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>${this.hintMsg}`;
            super.emptyItem();
            console.log(this.info);
            return { msg : this.info, item : {...this.item} };
        }else{
            return super.putItem(item);
        }
    }
}

// 구급함(세이브) 클래스
class SavePoint extends Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo, offSet, save }){
        super({ ctx, name, info, x, y, width, height, itemName, itemInfo, offSet });
        this.save = save;
        this.succeseMsg = "저장되었다.";
        this.failureMsg = "저장에 실패하였다.";
    }

    // 세이브 성공 시 리턴값(객체) 만들어줌
    // { msg : this.succeseMsg, item : "" } 객체를 만들어 리턴한다.
    // =========== 보류 =============
    // succeseReturn(){
    //     return { msg : this.succeseMsg, item : "" };
    // }
    // =========== 보류 =============

    
    // 세이브 실패 시 리턴값(객체) 만들어줌
    // { msg : this.failureMsg, item : "" } 객체를 만들어 리턴한다.
    // =========== 보류 =============
    // failureMsg(){
    
    // }
    // =========== 보류 =============

    // 인벤토리에서 구급약이 있는지 확인해야 한다. 리턴값으로 구급약 item을 리턴해서 인벤토리에서 비교하게 시킨다.
    contact(){
        return { item : {...this.item} };
    }

    // this.item이 인자로 받은 item과 동일하다면. save.LocalStorage() 실행 후 this.saveMsg()를 실행해서 결과값을 리턴한다.
    // 구급약이 있는 상태에서 상호작용을 하면 저장화면이 바로 뜨게 작업할 것
    // putItem(item){
        
    // }   
}

// 문(엘리베이터 포함) 클래스
class Portal extends Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo, offSet, pw, isKeyboard, isPortal, isDead, nextStage, notAvailableMsg }){
        super({ ctx, name, info, x, y, width, height, itemName, itemInfo, offSet });
        this.pw = pw;
        this.isKeyboard = isKeyboard;
        this.isPortal = isPortal;
        this.isDead = isDead;
        this.nextStage = nextStage;
        this.notAvailableMsg = notAvailableMsg;
        this.wrongPwMsg = "비밀번호가 맞지 않습니다.";
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다.
    // 문 클래스에서 아이템은 키이다.
    // this.item이 인자로 받은 item과 동일하다면. this.info+=this.hintMsg 하고 this.emptyItemMsg()를 실행해서 결과값을 리턴한다.
    // putItem(item){

    // }

    // this.nextStage에 저장된 스테이지로 이동
    movingNextStage(){
        // console.log(`스테이지${this.nextStage}로 이동`);
        return {move : true, msg : "다음 스테이지는 본 게임에서 만나요.^^"};
    }

    

    // 문을 사용할 수 없을 때 리턴할 객체를 생성
    // {msg : *notAvailable, item : ""} 객체로 만들어 리턴
    // =========== 보류 =============
    // notAvailable(){

    // }
    // =========== 보류 =============

    // 비밀번호가 틀렸을 때 리턴할 객체를 생성
    // {msg : *wrongPwMsg, item : ""} 객체로 만들어서 리턴
    // =========== 보류 =============
    // wrongPwMsg(){

    // }
    // =========== 보류 =============

    // this.pw와 인자로 받은 pw가 동일하면 true 아니면 false리턴
    samePw(pw){
        return (this.pw !== "" && this.pw === pw )? true : false;
    }

    // 비밀번호 입력 받는 창 띄어야 될듯
    // samePw(pw)를 실행시켜서 결과값이 true이면 this.nextStage() 실행
    // false이면 this.wrongPwMsg() 실행해서 결과값을 리턴함.
    inputPw(pw){
        return this.samePw(pw) ? this.movingNextStage() : {move : false, msg : this.wrongPwMsg};
    }

    // this.pw 값이 없고 this.isPortal이 true일  경우 this.nextStage() 실행
    // this.pw 값이 없고 this.isPortal이 false일 경우 this.notAvailable()실행해서 결과값 리턴
    // this.pw 값이 있는 경우 this.inputPw(pw) 실행해서 결과 값을 리턴   
    contact(){
        
        if(this.isPortal === false && this.isKeyboard === false) {
            return {move : false, type : "not", msg : this.notAvailableMsg};
        }
        
        if(this.isKeyboard){
            return {move : false, type : "password", msg : `"${this.name}" 암호 입력 후 enter를 누르세요.`};
        }else{
            return movingNextStage();
        }
    }

}

class Save {
    constructor(){}

    // 세이브 파일 저장
    create(){

    }

    // 세이브 파일 불러오기(1개)
    selet(){}

    // 세이브 파일 목록 불러오기
    selectAll(){}

    // 세이브 파일 업데이트 하기(1개, 사용하지 않을 수 있음)
    update(){}

    // 세이브 파일 삭제하기(1개)
    delete(){}

}

class Inventory {
    constructor(){
        this.list = [];
    }

    // 교수님
    // 인벤토리 리스트에 아이템 추가
    insert(item){
        this.list.push(item);
    }

    // 인벤토리 리스트에서 아이템 꺼내기
    out(name){
        this.list = this.list.filter(e => {if(e.name == name){return false}else{return true}});
    }

    // 인벤토리 리스트 가져오기
    importList(){
        return this.list;
    }
}

// 교수님
class Item {
    constructor(name, info , useing){
        this.name = name;
        this.info = info;
        this.useing = useing;
        this.count = 1;
    }
    
    addCount(){
        this.count++;
    }

    subCount(){
        this.count--;
    }

    sameName(name){
        return this.name === name ? true : false;
    }
}


