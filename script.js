console.log('hey')

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

const display = document.querySelector('#message')
const restartBtn = document.querySelector('#restart')
const startBtn = document.querySelector('#start')
const audioBtn = document.querySelector('#audio')

restartBtn.addEventListener('click', restartGame)
startBtn.addEventListener('click', startGame)
audioBtn.addEventListener('click', toggleAudio)

const pressedKeys = {}
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)
document.addEventListener('keydown', plantBomb)

//setup gameLoop
let gameLoopInterval


// DECLARATIONS start-------------------------------
let arrImg = Array.from(document.querySelectorAll('img')) //array of img tags
let arrBomb = [] //array of image object

const bombImg = new Image()
bombImg.src = 'img/bomb.png'

const umImg = new Image()
umImg.src = 'img/underminer.png'

const bomberImg = new Image()
bomberImg.src = 'img/bomber.png'

const ziggyImg = new Image()
ziggyImg.src = 'img/ziggy.png'

const crateImg = new Image()
crateImg.src = 'img/crate.png'

const bgAudio = new Audio('audio/bg-music.mp3')
const winAudio = new Audio('audio/win-sfx.wav')
const enemyDeadAudio = new Audio('audio/enemy-dead-sfx.wav')
const charDeadAudio = new Audio('audio/char-dead-sfx.wav')
const pickupBombAudio = new Audio('audio/pickup-sfx.wav')

let gameIsOn = false
//global switcher for each of the enemy
let collision1 = false
let collision2 = false
let collision3 = false
let collision4 = false
let collision5 = false
// DECLARATIONS end-------------------------------

class Pixel {
        constructor (url,x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.url = url
    }
    render(){
        ctx.drawImage(this.url,this.x,this.y,this.width,this.height)
    }
}

// DECLARATION OF OBJECTS start---------------------------------
const bomber = new Pixel(bomberImg,Math.floor(canvas.width*.1),Math.floor(canvas.height*.4),40,60)
const ziggy = new Pixel(ziggyImg,Math.floor(canvas.width-(canvas.width*.1)),Math.floor(canvas.height*.4),60,60)

const underMiner1 = new Pixel(umImg,(canvas.width*.1)*2,500,60,60)
const underMiner2 = new Pixel(umImg,(canvas.width*.2)*1.5,600,60,60)
const underMiner3 = new Pixel(umImg,(canvas.width*.3)*1.5,700,60,60)
const underMiner4 = new Pixel(umImg,(canvas.width*.4)*1.5,100,60,60)
const underMiner5 = new Pixel(umImg,(canvas.width*.5)*1.5,-100,60,60)

// const crate = new Pixel(crateImg,Math.floor(Math.random()*(canvas.width)),Math.floor(Math.random()*(canvas.height)),40,40)

// DECLARATION OF OBJECTS end---------------------------------

function startGame(){
    if(gameIsOn === false)
    {
        gameIsOn = true
        bgAudio.play()
        if(!gameLoopInterval){
        gameLoopInterval = setInterval(gameLoop,60)
        }
    }
    document.getElementById('start').style.display = 'none'
    document.getElementById('restart').style.display = 'flex'

}

function restartGame(){
        bomber.x = Math.floor(canvas.width*.1)
        bomber.y = Math.floor(canvas.height*.4)
        underMiner1.x = (canvas.width*.1)*2
        underMiner1.y = 500
        underMiner2.x = (canvas.width*.2)*1.5
        underMiner2.y = 600
        underMiner3.x = (canvas.width*.3)*1.5
        underMiner3.y = 700
        underMiner4.x = (canvas.width*.4)*1.5
        underMiner4.y = 100
        underMiner5.x = (canvas.width*.5)*1.5
        underMiner5.y = -100
        if(arrImg.length != 5){
            let temp = 5 - arrImg.length
            for(let i = 0; i < temp+1; i++){
                let newBombImg = document.createElement('img')
                newBombImg.src = "img/bomb.png"
                newBombImg.classList.add('bombs')
                document.querySelector('#bombHolder').appendChild(newBombImg)
                arrImg.push(document.querySelector('img'))
            }
        }
        if(bgAudio.paused === true){
            bgAudio.play()
        }

        clearInterval(gameLoopInterval)
        gameLoopInterval = setInterval(gameLoop,60)
}

function toggleAudio(){
    if(gameIsOn === true){
        if(bgAudio.paused === true){
            bgAudio.play()
            document.getElementById('audioIcon').src = 'img/audio-on.png'
            
        }else if(bgAudio.paused === false){
            bgAudio.pause()
            document.getElementById('audioIcon').src = 'img/audio-off.png'  
        }
    }
}

function controls() {
    const speed = 10
    if(bomber.alive === true){
        if(pressedKeys.w || pressedKeys.ArrowUp) bomber.y-=speed
        if(pressedKeys.a || pressedKeys.ArrowLeft) bomber.x-=speed
        if(pressedKeys.s || pressedKeys.ArrowDown) bomber.y+=speed
        if(pressedKeys.d || pressedKeys.ArrowRight) bomber.x+=speed
        }
}

function plantBomb(e){
    if(e.key === 'b' || e.key === 'B'){
        if(arrImg.length > 0) {
            let bomb = new Pixel(bombImg,bomber.x+bomber.width,bomber.y,40,40)
            arrBomb.push(bomb)
            arrImg.pop()
            document.querySelector('img').remove()

         }else display.innerText = 'No more Bombs :('
             
    }
}

function charPicksBomb(bomber,bomb){
    if(Math.floor(bomber.x) === Math.floor(bomb.x) && Math.floor(bomber.y) === Math.floor(bomb.y)){
        console.log('it works')
        display.innerText = ''
        let newBombImg = document.createElement('img')
        newBombImg.src = "img/bomb.png"
        newBombImg.classList.add('bombs')
        document.querySelector('#bombHolder').appendChild(newBombImg)
        arrImg.push(document.querySelector('img'))
        bomb.y = -300//to remove the bomb outside canvas
        pickupBombAudio.play()
    }
}

function charMeetsGoal(bomber,ziggy){
    //value of bomber right >= ziggy left
    //value of bomber bottom >= ziggy top
    //value of bomber left <= ziggy right
    //value of bomber top <= ziggy bottom
    if(bomber.x + (bomber.width -10) >= ziggy.x && 
        ziggy.x + (ziggy.width - 10) >= bomber.x &&
       bomber.y + (bomber.height - 10) >= ziggy.y &&
       ziggy.y + (ziggy.height - 10) >= bomber.y)
       {
        display.innerText = 'Ziggy is saved!'
        winAudio.play()
        // clearInterval(gameLoopInterval)
        clearInterval(gameLoopInterval)
        gameLoopInterval = null
        gameIsOn = false
        bgAudio.pause()
       }
}

function bombMeetsEnemy(bomb,enemy){
    if(enemy.x + (enemy.width -5) >= bomb.x && 
        bomb.x + (bomb.width - 5) >= enemy.x &&
        enemy.y + (enemy.height -5)>= bomb.y &&
        bomb.y + (bomb.height -5)>= enemy.y )
        {
        bomb.y = -300
        enemy.x = -300
        enemyDeadAudio.play()
     }
}

function charMeetsEnemy(bomber,underMiner){
    if((bomber.x -15) + (bomber.width-10) >= underMiner.x && 
        (underMiner.x -15) + (underMiner.width -10) >= bomber.x &&
       (bomber.y - 15) + (bomber.height-10) >= underMiner.y &&
       (underMiner.y -15) + (underMiner.height-10) >= bomber.y )
       {
        display.innerText = 'Underminers just killed you :('
        charDeadAudio.play()
        clearInterval(gameLoopInterval)
        gameLoopInterval = null
        gameIsOn = false
        bgAudio.pause()    
       }
}

function moveEnemy1(enemy,speed){
    
    enemy.speed = speed
    if(collision1 === false){
        enemy.y += enemy.speed
        if(enemy.y + enemy.height >= canvas.height)
        collision1 = true
    }
    if(collision1 === true){
        enemy.y -= enemy.speed
        if(enemy.y <= 0)
        collision1 = false
    }
}

function moveEnemy2(enemy,speed){

    enemy.speed = speed
    if(collision2 === false){
        enemy.y += enemy.speed
        if(enemy.y + enemy.height >= canvas.height)
        collision2 = true
    }
    if(collision2 === true){
        enemy.y -= enemy.speed
        if(enemy.y <= 0)
        collision2 = false
    }
}
function moveEnemy3(enemy,speed){

    enemy.speed = speed
    if(collision3 === false){
        enemy.y += enemy.speed
        if(enemy.y + enemy.height >= canvas.height)
        collision3 = true
    }
    if(collision3 === true){
        enemy.y -= enemy.speed
        if(enemy.y <= 0)
        collision3 = false
    }
}
function moveEnemy4(enemy,speed){

    enemy.speed = speed
    if(collision4 === false){
        enemy.y += enemy.speed
        if(enemy.y + enemy.height >= canvas.height)
        collision4 = true
    }
    if(collision4 === true){
        enemy.y -= enemy.speed
        if(enemy.y <= 0)
        collision4 = false
    }
}
function moveEnemy5(enemy,speed){

    enemy.speed = speed
    if(collision5 === false){
        enemy.y += enemy.speed
        if(enemy.y + enemy.height >= canvas.height)
        collision5 = true
    }
    if(collision5 === true){
        enemy.y -= enemy.speed
        if(enemy.y <= 0)
        collision5 = false
    }
}

function gameLoop() {
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bomber.render() //renders the main char
    ziggy.render()  //renders the goal
    controls()

    // crate.render()

    //renders the bomb image stored in the array of images
    for(let i = 0; i < arrBomb.length;i++){
        arrBomb[i].render()

    }

    

    underMiner1.render() //renders the enemy
    underMiner2.render() 
    underMiner3.render() 
    underMiner4.render() 
    underMiner5.render() 

    moveEnemy1(underMiner1,20)//enemy moves with speed
    moveEnemy2(underMiner2,15)
    moveEnemy3(underMiner3,25)
    moveEnemy4(underMiner4,15)
    moveEnemy5(underMiner5,20)

    charMeetsGoal(bomber,ziggy) //main char -> goal collision detection

    charMeetsEnemy(bomber,underMiner1)//main char -> enemy collision detection
    charMeetsEnemy(bomber,underMiner2)
    charMeetsEnemy(bomber,underMiner3)
    charMeetsEnemy(bomber,underMiner4)
    charMeetsEnemy(bomber,underMiner5)

    //bomb -> enemy collision detection
    for(let i = 0; i < arrBomb.length; i++){
        bombMeetsEnemy(arrBomb[i],underMiner1)
        bombMeetsEnemy(arrBomb[i],underMiner2)
        bombMeetsEnemy(arrBomb[i],underMiner3)
        bombMeetsEnemy(arrBomb[i],underMiner4)
        bombMeetsEnemy(arrBomb[i],underMiner5)
    }
    for(let i = 0; i < arrBomb.length; i++)
    {
        charPicksBomb(bomber,arrBomb[i])
    }
    
}
