//캔버스 세팅
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, rocketImage, bulletImage, monsterImage, gameOverImage;

//우주선 좌표
let rocketX = canvas.width/2-32
let rocketY = canvas.height-64

let bulletList = []
function bullet() {
    this.x=0;
    this.y=0;
    this.init = function() {
        this.x = rocketX + 20;
        this.y = rocketY;

        bulletList.push(this);
    };
    this.update = function() {
        this.y -= 7;
    };
}
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/space_background.gif";

  rocketImage = new Image();
  rocketImage.src = "images/rocket.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  monsterImage = new Image();
  monsterImage.src = "images/bullet.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.jpeg";
}

let keysDown = {};
function setupKeyboardListener() {
    document.addEventListener("keydown", function(event) {
      keysDown[event.key] = true;
      console.log("객체에 들어간 값은?", keysDown);
    });
    document.addEventListener("keyup", function(event) {
        delete keysDown[event.key];

        if(event.key == " ") {
            createBullet() // 총알 생성
        }
        
    });
}

function createBullet() {
    let b = new bullet();
    b.init();
    console.log("총알 리스트",bulletList);
}

function update() {
    if('ArrowRight' in keysDown) {
        rocketX += 5; //로켓의 속도
    }
    if('ArrowLeft' in keysDown) {
        rocketX -= 5;
    }
    if(rocketX <= 0) {
        rocketX = 0;
    }
    if(rocketX >= canvas.width-64) {
        rocketX = canvas.width-64;
    }
    //총알의 y좌표 업데이트 함수 호출
    for(let i=0;i<bulletList.length;i++) {
        bulletList[i].update();
    }
}
function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(rocketImage, rocketX, rocketY);

    for(let i=0;i<bulletList.length;i++){
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
    }
}

function main() {
    update(); //좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
//방향키를 누르면
//우주선의 xy좌표가 바뀌고
//다시 render 그려준다

//총알만들기
//1.스페이스바를 누르면 총알 발사
//2.총알 발사 = y값이 줄어든다, x값