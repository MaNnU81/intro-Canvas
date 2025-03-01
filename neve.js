
// https://aijs.io/project?user=Tezumie&project=falling-snow 
let entities = [];
let canvas;
let ctx;
let snowflakes = [];


function drawRandomSnowflake(x, y) {
    const randomIndex = Math.floor(Math.random() * snowflakes.length);
    const img = snowflakes[randomIndex];

    ctx.drawImage(img, x, y, 30, 30); // Disegna il fiocco a (x, y) con dimensioni 30x30
}

function drawSnowflakes() {
    for (let i = 0; i < 10; i++) { 
        let x = Math.random() * 600;
        let y = Math.random() * 600;
        drawRandomSnowflake(x, y);
    }
}


function setUp() {

     // Inizializza il canvas
     canvas = document.getElementById("neve-canvas");
    ctx = canvas.getContext("2d");
  
    //carico src immagini
    const snowFlakeImages = [ 
        'assets/pallina1.png',
        'assets/pallina2.png',
        'assets/snowflake1.png',
        'assets/snowflake2.png',
        'assets/snowflake3.png',
        'assets/snowflake4.png'
        ];
    
    //rendo l'array src in array di oggetti image 
    snowflakes = snowFlakeImages.map(function(src) {
        let img = new Image();
        img.src = src;
        return img;
    });
    ;
snowflakes.forEach(img => {
    img.onload = () => {
        loadedImages++;
        if (loadedImages === snowflakes.length) {
            drawSnowflakes();
        }
    };
});

    // conta le immagini caricate fino al numero delle immagini stesse, poi chiama l'oggetto casuale

let loadedImages = 0

}



function update() {
   
   
    
}


function draw() {
     // Pulisci il canvas
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     // Disegna i fiocchi di neve
     drawSnowflakes();
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