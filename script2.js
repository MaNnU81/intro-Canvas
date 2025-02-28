
let entities = [];
let canvas;
let ctx;


function setUp() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');

    for (let i = 0; i < 100; i++) {
        const rect = {};
        rect.width = Math.random() * 200;
    rect.height = Math.random() * 200;
    rect.originX = Math.random() * (600 - rect.width);
    rect.originY = Math.random() * (600 - rect.height);

    entities.push(rect);


    }
    

}

function update() {
   
    // rect.originX += 1;
    
}


function draw() {
    ctx.clearRect(0, 0, 600, 600);
    

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