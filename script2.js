
let entities = [];
let canvas;
let ctx;


function setUp() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');

    for (let i = 0; i < 1000; i++) {
        const rect = {};
        rect.width = Math.random() * 10;
    rect.height = Math.random() * 10;
    rect.originX = Math.random() * (600 - rect.width);
    rect.originY = Math.random() * (600 - rect.height);
    rect.speedX = Math.round (Math.random () * 3) +1;
    entities.push(rect);


    }
    

}

function update() {
   
    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        rect.originX += rect.speedX
        // rect.originX += 4;
        // rect.originY += 4;
        rect.originX = rect.originX % 600;
        // rect.originY = rect.originY % 600;
    }
    
    
    
}


function draw() {
    // ctx.clearRect(0, 0, 600, 600);
    ctx.fillStyle = " rgba(255,255,255,0.1)";
    ctx.fillRect(0, 0, 600, 600);


    ctx.fillStyle = "black";
    for (let i = 0; i < entities.length; i++) {
        const rect = entities [i];
        ctx.fillRect(rect.originX, rect.originY, rect.width, rect.height)
    }
    
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