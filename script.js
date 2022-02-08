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

// DECLARATIONS -------------------------------
let arrImg = Array.from(document.querySelectorAll('img'))
console.log(arrImg)
let arrBomb = []
let arrEnemy = []

const bombImg = new Image()
bombImg.src = 'img/bomb.png'

const umImg = new Image()
umImg.src = 'img/underminer.png'

// let arrCol = []
// for(let i = 0; i < 5; i++)
//     arrCol.push(false)

let collision1 = false
let collision2 = false
let collision3 = false
let collision4 = false
let collision5 = false

// DECLARATIONS -------------------------------


class Character {
    // constructor (x,y,width,height,color){
    //     this.x = x
    //     this.y = y
    //     this.width = width
    //     this.height = height
    //     this.color = color
    //     this.alive = true
    //     // this.url = url
    // }
    constructor (url,x,y,width,height,color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.url = url
    }
    render(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    render2(){
        ctx.drawImage(this.url,this.x,this.y,this.width,this.height)
    }
}
// let collision = false
// class Enemy extends Character{
//     // static collision = false
//     constructor(x,y,width,height,color){
//         super(x,y,width,height,color)
//     }
//     // move(speed){
//     //     this.speed = speed
//     //     if(Enemy.collision === false){
//     //         this.y += this.speed
//     //         if(this.y + this.height >= canvas.height)
//     //         Enemy.collision = true
//     //     }
//     //     if(Enemy.collision === true){
//     //         this.y -= this.speed
//     //         if(this.y <= 0)
//     //         Enemy.collision = false
//     //     }
    

//     // }
// }

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
// DECLARATION OF OBJECTS ---------------------------------
const bomber = new Character(canvas.width*.1,canvas.height*.4,40,40,'orange')
const ziggy = new Character(canvas.width-(canvas.width*.1),canvas.height*.4,40,40,'black')

// for(let i = 0; i < 5; i++){
//     let rand = Math.random()*(canvas.width)
//     const underMiner = new Enemy(rand,500,60,60,'gray')
//     arrEnemy.push(underMiner)
// }
const underMiner1 = new Character(umImg,(canvas.width*.1)*2,500,80,80,'gray')
const underMiner2 = new Character(umImg,(canvas.width*.2)*1.5,600,80,80,'gray')
const underMiner3 = new Character(umImg,(canvas.width*.3)*1.5,700,80,80,'gray')
const underMiner4 = new Character(umImg,(canvas.width*.4)*1.5,200,80,80,'gray')
const underMiner5 = new Character(umImg,(canvas.width*.5)*1.5,100,80,80,'gray')

// const underMiner1 = new Enemy((canvas.width*.1)*2,500,60,60,'gray')
// const underMiner2 = new Enemy((canvas.width*.2)*1.5,600,60,60,'gray')
// const underMiner3 = new Enemy((canvas.width*.3)*1.5,700,60,60,'gray')
// const underMiner4 = new Enemy((canvas.width*.4)*1.5,200,60,60,'gray')
// const underMiner5 = new Enemy((canvas.width*.5)*1.5,100,60,60,'gray')
// DECLARATION OF OBJECTS ---------------------------------

// let enemy = []
// function createEnemy(num){
    
    
//     for(let i = 0; i < num; i++)
//     {
//         let randY = Math.random()*(canvas.height - 60)
//         let randX = Math.random()*(canvas.width -60) 
//         if(randX < canvas.width*.1){
//             randX = randX + canvas.width*.1 + 40
//         }else if (randX > canvas.width-(canvas.width*.1)){
//             randX = randX - canvas.width*.1 - 40
//         }
//      let underMiner = new Enemy(randX,randY,60,60,'gray')
//       enemy.push(underMiner)
//     }
    
// }

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
                let bomb = new Bomb(bombImg,bomber.x+bomber.width,bomber.y,40,40)
                arrBomb.push(bomb)
                arrImg.pop()
                document.querySelector('img').remove()

            }else display.innerText = 'No more Bombs :('
   }
}
}



function charMeetGoal(bomber,ziggy){
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
    function bombMeetsEnemy(bomb,enemy){
        console.log(bomb)
        if(enemy.x + enemy.width >= bomb.x && 
            bomb.x + bomb.width >= enemy.x &&
            enemy.y + enemy.height >= bomb.y &&
           bomb.y + bomb.height >= enemy.y ){
            // arrBomb.pop()
            // clearInterval(gameLoopInterval)
            bomb.y = -50
            enemy.y = -90
     
    }
}
    

function charMeetEnemy(bomber,underMiner){
    if(bomber.x + bomber.width >= underMiner.x && 
        underMiner.x + underMiner.width >= bomber.x &&
       bomber.y + bomber.height >= underMiner.y &&
       underMiner.y + underMiner.height >= bomber.y )
       {
        display.innerText = 'Underminers just killed you :('
        clearInterval(gameLoopInterval)
       }
}

// createEnemy(2)
function gameLoop() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bomber.render() //renders the main char
    ziggy.render()  //renders the goal

    //renders the bomb image stored in the array of images
    for(let i = 0; i < arrBomb.length;i++){
        arrBomb[i].render()
    }

    // for(let i = 0; i < arrEnemy.length;i++){
    //     arrEnemy[i].render()
    // }

    underMiner1.render2() //renders the enemy
    underMiner2.render2() //renders the enemy
    underMiner3.render2() //renders the enemy
    underMiner4.render2() //renders the enemy
    underMiner5.render2() //renders the enemy
    moveEnemy1(underMiner1,20)
    moveEnemy2(underMiner2,15)
    moveEnemy3(underMiner3,5)
    moveEnemy4(underMiner4,15)
    moveEnemy5(underMiner5,5)
    charMeetGoal(bomber,ziggy) //main char -> goal collision detection
    charMeetEnemy(bomber,underMiner1)//main char -> enemy collision detection
    charMeetEnemy(bomber,underMiner2)
    charMeetEnemy(bomber,underMiner3)
    charMeetEnemy(bomber,underMiner4)
    charMeetEnemy(bomber,underMiner5)

    for(let i = 0; i < arrBomb.length; i++){
        bombMeetsEnemy(arrBomb[i],underMiner1)
        bombMeetsEnemy(arrBomb[i],underMiner2)
        bombMeetsEnemy(arrBomb[i],underMiner3)
        bombMeetsEnemy(arrBomb[i],underMiner4)
        bombMeetsEnemy(arrBomb[i],underMiner5)
    }
    
    // bombMeetsEnemy(arrBomb[0],underMiner1)
    // bombMeetsEnemy(arrBomb[1],underMiner2)
}
function restartGame(){
    location.reload()  
    }