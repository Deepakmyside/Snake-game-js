// HTML me joh board class wala div h usko select kr rhe h taki uspar changes kr ske 
const board = document.querySelector('.board')
 const blockHeight = 50
 const blockWidth =  50

//  Using math.floor so that 10.88 fraction value ek single value bn jaye 10 
 const cols = Math.floor(board.clientWidth / blockWidth);
 const rows = Math.floor(board.clientHeight / blockHeight);

 const blocks = []
 const snake = [ 
   {
   x: 1, y: 3
 },{
   x: 1, y: 4
 },{
   x :1, y: 5  
 } ]

 let direction = 'down'
//  For ex rows * cols : 100, toh yeh loop 100 bar chlega and i=0 means block1 , i=1 means block2 in this way  
//  for(let i = 0 ; i < rows * cols; i++) {

   // jitni bar looop repeat ho ek div bne means ek block bne 
   //  const block = document.createElement('div');
   
//    //  blocks joh bne unko style.css me joh block class di thi woh deti 


//     block.classList.add("block")

//    //  joh blocks banye unko board ke andr dalna h :


//     board.appendChild(block);
//  }


for (let row = 0; row < rows; row++){
   for (let col = 0; col < cols; col ++){
    const block = document.createElement('div');
    block.classList.add("block")
    board.appendChild(block);
    block.innerText = `${row}-${col}`
    blocks[ `${row}-${col}`] = block
   }
}

function render(){

   snake.forEach(segment=> {
      blocks[ `${segment.x}-${segment.y}` ].classList.add("fill")
   })
}

// setInterval function means har 300(millisecond time) ke bad render function automatically call ho jayega 

setInterval(() => {
      
     let head = null

     if(direction === "left"){
     head = { x: snake[ 0 ].x, y: snake[ 0 ].y - 1  }
    }else if(direction === "right") {
      head = { x: snake[ 0 ].x, y: snake[ 0 ].y + 1 }
    }else if(direction === "down") {
      head = { x: snake[ 0 ].x + 1 ,y: snake[ 0 ].y }
    }else if(direction === "up") { 
      head = { x: snake[ 0 ].x - 1 ,y: snake[ 0 ].y }
    }

     
     snake.forEach(segment => {
      blocks[ `${segment.x}-${segment.y}` ].classList.remove("fill")
     })

     snake.unshift(head)
     snake.pop()
   render()
}, 200);

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