let entities = [];
let canvas;
let ctx;


function setUp() {
    canvas = document.getElementById('scacchiera-canvas');
    ctx = canvas.getContext('2d');

    

}

function update() {
   
   
    
}


function draw() {
    
    
}


function gameLoop(elapsedTime) {
    
    update()
    draw()



    requestAnimationFrame(gameLoop);
}

function start() {
    setUp()
    requestAnimationFrame(gameLoop)
}

start()