console.log('hey')

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

const display = document.querySelector('#message')
const restartBtn = document.querySelector('#restart')

restartBtn.addEventListener('click', restartGame)

document.addEventListener('keydown', controls) 

//setup gameLoop
let gameLoopInterval = setInterval(gameLoop,60)

let arrImg = Array.from(document.querySelectorAll('img'))
console.log(arrImg)

class Character {
    constructor (x,y,width,height,color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }
    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    // draw(){
    //     ctx.clearRect(0,0,canvas.width,canvas.height)
    //     ctx.fillStyle = this.color
    //     ctx.fillRect(this.x, this.y, this.width, this.height)
    // }
    // move(){
        
    //     this.y+=1
    // }
}
// let collision = false
class Enemy extends Character{
    static collision = false
    constructor(x,y,width,height,color){
        super(x,y,width,height,color)
    }
    move(speed){
        this.speed = speed
        if(Enemy.collision === false){
            underMiner.y += this.speed
            if(underMiner.y + underMiner.height >= canvas.height)
            Enemy.collision = true
        }
        if(Enemy.collision === true){
            underMiner.y -= this.speed
            if(underMiner.y <= 0)
            Enemy.collision = false
        }

    }
}

class Bomb {
    constructor(url,x,y,width,height){
        this.url = url
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    render(){
        ctx.drawImage(this.url,this.x,this.y,this.width,this.height)
    }
}
const bombImg = new Image()
bombImg.src = 'img/bomb.png'


const bomber = new Character(40,200,40,40,'orange')
const ziggy = new Character(500,200,40,40,'black')
const underMiner = new Enemy(200,500,60,60,'gray')

function controls(e) {
    const speed = 10
// console.log(e)
    if(bomber.alive === true){
        if(e.key === 'W'|| e.key === 'w'|| e.key === 'ArrowUp') bomber.y-=speed
        if(e.key === 'A'|| e.key === 'a'|| e.key === 'ArrowLeft') bomber.x-=speed
        if(e.key === 'S'|| e.key === 's'|| e.key === 'ArrowDown') bomber.y+=speed
        if(e.key === 'D'|| e.key === 'd'|| e.key === 'ArrowRight') bomber.x+=speed
        if(e.key === 'B' || e.key ==='b'){
            if(arrImg.length > 0) {
                // console.log(arrImg)
                // for(let i = 0; i < arrImg.length; i++){
                //     arrImg[i].addEventListener('load', function(){
                //         ctx.drawImage(arrImg[arrImg.length-1],bomber.x+10,bomber.y,40,40)
                //     })
                //  }
                //  console.log('a'+arrImg)
                // let bomb = new Image()
                // bomb.onload = bombImg
                // bomb.src = 'bomb.png'
                // function bombImg(){
                //     ctx.drawImage(arrImg[arrImg.length-1],bomber.x+bomber.width,bomber.y,40,40)
                // }
                // arrImg[arrImg.length-1].addEventListener('load',e =>{
                //     ctx.drawImage(arrImg[arrImg.length-1],bomber.x+bomber.width,bomber.y,40,40)
                // })
                let bomb = new Bomb(bombImg,bomber.x+bomber.width,bomber.y,40,40)
                bomb.render()
                // ctx.drawImage(arrImg[arrImg.length-1],bomber.x+bomber.width,bomber.y,40,40)
            }else display.innerText = 'No more Bombs :('
   }
}
}

function bomberMeetsZiggy(){
    //value of bomber right >= ziggy left
    //value of bomber bottom >= ziggy top
    //value of bomber left <= ziggy right
    //value of bomber top <= ziggy bottom
    if(bomber.x + bomber.width >= ziggy.x && 
        ziggy.x + ziggy.width >= bomber.x &&
       bomber.y + bomber.height >= ziggy.y &&
       ziggy.y + ziggy.height >= bomber.y )
       {
        display.innerText = 'Ziggy is saved!'
        clearInterval(gameLoopInterval)
       }
}

function bomberMeetsUnderminer(){
    if(bomber.x + bomber.width >= underMiner.x && 
        underMiner.x + underMiner.width >= bomber.x &&
       bomber.y + bomber.height >= underMiner.y &&
       underMiner.y + underMiner.height >= bomber.y )
       {
        display.innerText = 'Underminers just killed you :('
        clearInterval(gameLoopInterval)
       }
}

function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bomber.render()
    ziggy.render()
    underMiner.render()
    underMiner.move(5)
    bomberMeetsZiggy()
    bomberMeetsUnderminer()
    underMinerMove()
}
function restartGame(){
    //     console.log('hey')
    //     ctx.clearRect(0,0,canvas.width,canvas.height)
    
    //     document.addEventListener('keydown', controls)
    
    //     const bomber = new Character(40,200,40,40,'orange')
    // const ziggy = new Character(500,200,40,40,'black')
    // const underMiner = new Character(200,0,60,60,'gray')
    //     bomber.render()
    //     ziggy.render()
    //     underMiner.render()
    //     bomberMeetsZiggy()
    //     bomberMeetsUnderminer()
    //     underMinerMoveDown()
    
    //     setInterval(gameLoop,60)
        
    }