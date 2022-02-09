console.log('hey')

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

const display = document.querySelector('#message')
const restartBtn = document.querySelector('#restart')

restartBtn.addEventListener('click', restartGame)

const pressedKeys = {}
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false)
document.addEventListener('keydown', plantBomb)

//setup gameLoop
let gameLoopInterval = setInterval(gameLoop,60)

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

//global switcher for each of the enemy
let collision1 = false
let collision2 = false
let collision3 = false
let collision4 = false
let collision5 = false

// DECLARATIONS end-------------------------------

function restartGame(){
    location.reload()  
}

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
const bomber = new Pixel(bomberImg,canvas.width*.1,canvas.height*.4,40,60)
const ziggy = new Pixel(ziggyImg,canvas.width-(canvas.width*.1),canvas.height*.4,60,60)

const underMiner1 = new Pixel(umImg,(canvas.width*.1)*2,500,60,60)
const underMiner2 = new Pixel(umImg,(canvas.width*.2)*1.5,600,60,60)
const underMiner3 = new Pixel(umImg,(canvas.width*.3)*1.5,700,60,60)
const underMiner4 = new Pixel(umImg,(canvas.width*.4)*1.5,200,60,60)
const underMiner5 = new Pixel(umImg,(canvas.width*.5)*1.5,100,60,60)


// DECLARATION OF OBJECTS end---------------------------------

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
    if(e.key === 'b'){
        if(arrImg.length > 0) {
            let bomb = new Pixel(bombImg,bomber.x+bomber.width,bomber.y,40,40)
            arrBomb.push(bomb)
            arrImg.pop()
            document.querySelector('img').remove()

         }else {
             if(arrImg.length === 0){
            display.innerText = 'No more Bombs :('
            const spawnBomb = setTimeout(()=>{
            let bomb = new Pixel(bombImg,Math.random()*(ziggy.x-ziggy.width),Math.random()*(canvas.height-bomb.height),40,40)
            arrBomb.push(bomb)
            },2000)
                }
                else clearTimeout(spawnBomb)
         }
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
        clearInterval(gameLoopInterval)
       }
}

function bombMeetsEnemy(bomb,enemy){
    if(enemy.x + (enemy.width -5) >= bomb.x && 
        bomb.x + (bomb.width - 5) >= enemy.x &&
        enemy.y + (enemy.height -5)>= bomb.y &&
        bomb.y + (bomb.height -5)>= enemy.y )
        {
        bomb.y = -300
        enemy.y = -300 
     }
}
    

function charMeetsEnemy(bomber,underMiner){
    if((bomber.x -15) + (bomber.width-10) >= underMiner.x && 
        (underMiner.x -15) + (underMiner.width -10) >= bomber.x &&
       (bomber.y - 15) + (bomber.height-10) >= underMiner.y &&
       (underMiner.y -15) + (underMiner.height-10) >= bomber.y )
       {
        display.innerText = 'Underminers just killed you :('
        clearInterval(gameLoopInterval)        
       }
}

function charPicksBomb(bomber,bomb){
    if(bomber.x === bomb.x && bomber.y === bomb.y && arrImg.length < 3){
        display.innerText = ''
        let newBombImg = document.createElement('img')
        newBombImg.src = "img/bomb.png"
        newBombImg.classList.add('bombs')
        document.querySelector('#bombHolder').appendChild(newBombImg)
        arrImg.push(document.querySelector('img'))
        bomb.y = -300
    }
    if(arrImg.length > 3) display.innerText = 'Bomb Holder is full'
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

// createEnemy(2)
function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bomber.render() //renders the main char
    ziggy.render()  //renders the goal
    controls()

    //renders the bomb image stored in the array of images
    for(let i = 0; i < arrBomb.length;i++){
        arrBomb[i].render()
    }

    underMiner1.render() //renders the enemy
    underMiner2.render() 
    underMiner3.render() 
    underMiner4.render() 
    underMiner5.render() 
    moveEnemy1(underMiner1,20)//enemy moves
    moveEnemy2(underMiner2,15)
    moveEnemy3(underMiner3,10)
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
