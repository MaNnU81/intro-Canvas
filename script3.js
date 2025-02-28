let entities = [];
let rect = {};
let canvas;
let ctx;


function setUp() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    rect.width = 2;
    rect.height = 2;
    rect.originX = 299;
    rect.originY = 299;
    rect.speedX = ((Math.random () * 6)) - 3;
    rect.speedY = ((Math.random () * 6)) - 3;

}

function update() {
    rect.originX += rect.speedX
    rect.originY += rect.speedY
   
    
}


function draw() {
    
    ctx.fillRect(rect.originX, rect.originY, rect.width, rect.height)
    
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