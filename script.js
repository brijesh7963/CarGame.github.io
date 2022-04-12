const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const gameSound=new Audio('audio/bg.mp3');
const blastCar=new Audio('audio/blastc.mp3');

const head=document.getElementById('head');
const btn1=document.getElementById('btn1');
const btn2=document.getElementById('btn2');
//const btn3=document.getElementById('btn3');
//const btn4=document.getElementById('btn4');




let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

let player = { speed: 5, score: 0 };

btn1.addEventListener('click',()=>{

    if(player.speed<20){
        player.speed++;
    }
    head.innerText="SPEED : "+player.speed;
})
btn2.addEventListener('click',()=>{
    if(player.speed>1){
        player.speed--;
    }
    head.innerText="SPEED : "+player.speed;
})

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    //console.log(e.key);
    //console.log(keys);
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    //console.log(e.key);
    //console.log(keys);
}

startScreen.addEventListener('click', start);



function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) ||
        (aRect.left > bRect.right) || (aRect.right) < (bRect.left))

}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {

        if (item.y > 400) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game over<br>Your final score : " + player.score + "<br>press here to restart the game";
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {

        if (isCollide(car, item)) {
            //console.log("Boom HIT");
            gameSound.pause();
            gameSound.currentTime=0;
            blastCar.play();

            endGame();
        }
        

        if (item.y > 600) {
            item.y -= 1000;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    //console.log("hey I am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();


    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed };
        if (keys.ArrowUp && player.y > (road.top + 150)) { player.y -= player.speed };
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed };
        if (keys.ArrowRight && player.x < (road.width - 60)) { player.x += player.speed };
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        player.score++;
        let ps=player.score-1;
        score.innerText = "Score : " + ps;
    }
}
function start() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = " ";
   


    gameSound.loop=true;
    gameSound.play();
    blastCar.pause();
    blastCar.currentTime=0;
    

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (var x = 0; x <= 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    //enemy  car
    for (var x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    //car.innerText="hello i am your car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}