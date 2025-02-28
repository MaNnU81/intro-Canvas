let entities = [];
let rect = {};
let canvas;
let ctx;


function setUp() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');

    for (let i = 0; i < 500; i++) {
        const rect = {};
        rect.width = 4;
        rect.height = 2;
        rect.originX = 299;
        rect.originY = 299;
        rect.speedX = ((Math.random () * 6)) - 3;
        rect.speedY = ((Math.random () * 6)) - 3;

        rect.red = Math.random() * 255;
        rect.green = Math.random() * 255;
        rect.blue = Math.random() * 255;


        entities.push(rect);
    }
   

}

function update() {
    
for (let i = 0; i < entities.length; i++) {
    const rect = entities[i];
    rect.originX += rect.speedX
    rect.originY += rect.speedY
    // rect.speedX = ((Math.random () * 6)) - 3;
    // rect.speedY = ((Math.random () * 6)) - 3;

    const rollX = Math.random();
    const rollY = Math.random();

    if (rollX > 0.6) {
        const speedDelta = (Math.random() * 0.2) - 0.1;
        rect.speedX += speedDelta;
    }

    if (rollY > 0.2) {
        const speedDelta = (Math.random() * 0.2) - 0.1;
        rect.speedY += speedDelta;


    }

    if (rect.originX < 100 || rect.originX > 500 ) {
        rect.speedX *= -1;
    }

    if (rect.originY < 100 || rect.originY > 500 ) {
        rect.speedY *= -1;
    }
}

   
    
}


function draw() {
    ctx.fillStyle = " rgba(255,255,255,0.01)";
    ctx.fillRect(0, 0, 600, 600);

    for (let i = 0; i < entities.length; i++) {
        const rect = entities[i];
        ctx.fillStyle = `rgb(${rect.red}, ${rect.green}, ${rect.blue})`
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