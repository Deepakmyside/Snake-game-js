// HTML me joh board class wala div h usko select kr rhe h taki uspar changes kr ske 
const board = document.querySelector('.board')
const startButton = document.querySelector('.btn-start')
const modal = document.querySelector('.modal')
const startGameModal = document.querySelector('.start-game')
const gameOverModal = document.querySelector('.game-over')
const restartButton = document.querySelector('.btn-restart')
const highScoreElement = document.querySelector('#high-score')
const scoreElement = document.querySelector('#score')
const timeElement = document.querySelector('#time')
 const blockHeight = 50
 const blockWidth =  50


 let highScore = localStorage.getItem("highScore") || 0
 let score = 0 
 let time = `00-00`

 highScoreElement.innerText = highScore

//  Using math.floor so that 10.88 fraction value ek single value bn jaye 10 
 const cols = Math.floor(board.clientWidth / blockWidth);
 const rows = Math.floor(board.clientHeight / blockHeight);

 const blocks = []
 let snake = [ 
   {
   x: 1, y: 3
 } ]

 let direction = 'down'
  let intervalId = null;
  let timerIntervalId = null;
  let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}


for (let row = 0; row < rows; row++){
   for (let col = 0; col < cols; col ++){
    const block = document.createElement('div');
    block.classList.add("block")
    board.appendChild(block);
    blocks[ `${row}-${col}`] = block
   }
}

function render(){
       let head = null

       blocks[`${food.x}-${food.y}`].classList.add("food")

     if(direction === "left"){
     head = { x: snake[ 0 ].x, y: snake[ 0 ].y - 1  }
    }else if(direction === "right") {
      head = { x: snake[ 0 ].x, y: snake[ 0 ].y + 1 }
    }else if(direction === "down") {
      head = { x: snake[ 0 ].x + 1 ,y: snake[ 0 ].y }
    }else if(direction === "up") { 
      head = { x: snake[ 0 ].x - 1 ,y: snake[ 0 ].y }
    }
   

    // Logic for wall collision
     if(head.x<0 || head.x >= rows || head.y<0 || head.y>=cols) {
      clearInterval(intervalId)
      modal.style.display="flex";
      startGameModal.style.display="none";
      gameOverModal.style.display="flex";
      return;
     }

    //  Logic for self collision (snake takar in itself)

    if(snake.some(segment => segment.x ===head.x && segment.y === head.y)) {
      clearInterval(intervalId)
      clearInterval(timerIntervalId)
       modal.style.display="flex";
       startGameModal.style.display="none";
       gameOverModal.style.display="flex";
      return;
    }
  
     //  food consume logic 
     if(head.x == food.x && head.y == food.y){
            blocks[`${food.x}-${food.y}`].classList.remove("food")

            food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)
            }
            blocks[`${food.x}-${food.y}`].classList.add("food")
            snake.unshift(head)

            score += 10 
            scoreElement.innerText = score

            if ( score > highScore) {
              highScore = score
              localStorage.setItem("highScore", highScore.toString())
            }
     }


     snake.forEach((segment, index )=> {
     const block= blocks[ `${segment.x}-${segment.y}` ]

    block.classList.remove("fill")
    block.classList.remove("head")
     })

     snake.unshift(head)
     snake.pop()

   snake.forEach((segment,index) => {
     const block = blocks[ `${segment.x}-${segment.y}` ]

      if(index === 0){
        block.classList.add("head")
      }else {
        block.classList.add("fill")
      }
   })
}

// setInterval function means har 300(millisecond time) ke bad render function automatically call ho jayega 

function startTimer(){
  clearInterval(timerIntervalId)

  timerIntervalId= setInterval(() => {
     let [ min, sec ] =time.split("-").map(Number)

      if(sec==59){
      min += 1
      sec = 0
    }else{
      sec+=1
    }
    time = `${min}-${sec < 10 ? '0' :''}${sec}`
    timeElement.innerText = time
  },1000)
}
 startButton.addEventListener("click", () => {
  modal.style.display="none"
  intervalId= setInterval(() => {render()}, 300)
  startTimer()
   

   

    
  })
 

 restartButton.addEventListener("click", restartGame)

 function restartGame(){

  
clearInterval(intervalId)
clearInterval(timerIntervalId)
  
  blocks[`${food.x}-${food.y}`].classList.remove("food")
  snake.forEach((segment,index) => {
   const block =  blocks[`${segment.x}-${segment.y}` ]
    block.classList.remove("fill")
    block.classList.remove("head")
  })
 
  modal.style.display="none";
  direction="down";
  snake = [ {
    x: 1, y: 3
  }]

  score= 0
  time = `00-00`


  scoreElement.innerText = score
  highScoreElement.innerText = highScore
  timeElement.innerText = time

  
  food= { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)}
   

   intervalId = setInterval(render,300)
   startTimer()
   
 }


addEventListener("keydown",(event)=>{
     if(event.key=="ArrowUp"){
      direction="up"
     }else if(event.key=="ArrowRight"){
      direction="right"
     }else if(event.key=="ArrowLeft"){
      direction="left"
     }else if(event.key=="ArrowDown"){
      direction="down"
     }
})