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