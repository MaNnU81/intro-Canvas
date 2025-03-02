
// // https://aijs.io/project?user=Tezumie&project=falling-snow 

// let canvas;
// let ctx;
// let snowflakes = [];
// let snowflakeObjects = [];

// function drawRandomSnowflake(x, y) {
//     const randomIndex = Math.floor(Math.random() * snowflakes.length);
//     const img = snowflakes[randomIndex];

//     ctx.drawImage(img, x, y, 30, 30); // Disegna il fiocco a (x, y) con dimensioni 30x30
// }

// function drawSnowflakes() {
//     for (let i = 0; i < 10; i++) { 
//         let x = Math.random() * 600;
//         let y = Math.random() * 600;
//         drawRandomSnowflake(x, y);
//     }
// }


// function setUp() {

//      // Inizializza il canvas
//      canvas = document.getElementById("neve-canvas");
//     ctx = canvas.getContext("2d");
  
//     //carico src immagini
//     const snowFlakeImages = [ 
//         'assets/pallina1.png',
//         'assets/pallina2.png',
//         'assets/snowflake1.png',
//         'assets/snowflake2.png',
//         'assets/snowflake3.png',
//         'assets/snowflake4.png'
//         ];
    
//     //rendo l'array src in array di oggetti image 
//     snowflakes = snowFlakeImages.map(function(src) {
//         let img = new Image();
//         img.src = src;
//         return img;
//     });
//     ;
// snowflakes.forEach(img => {
//     img.onload = () => {
//         loadedImages++;
//         if (loadedImages === snowflakes.length) {
//             drawSnowflakes();
//         }
//     };
// });

//     // conta le immagini caricate fino al numero delle immagini stesse, poi chiama l'oggetto casuale

// let loadedImages = 0

// }



// function update() {
   
   
    
// }


// function draw() {
//      // Pulisci il canvas
//      ctx.clearRect(0, 0, canvas.width, canvas.height);
//      // Disegna i fiocchi di neve
//      drawSnowflakes();
// }


// function gameLoop(elapsedTime) {
    
//     update()
//     draw()



//     requestAnimationFrame(gameLoop);
// }

// function start() {
//     setUp()
//     requestAnimationFrame(gameLoop)
// }

// start()

let canvas;
let ctx;
let snowflakes = [];
let snowflakeObjects = [];
let loadedImages = 0;

//variabili slitta
let sleigh = {
    image: new Image(),
    x: -100, // Inizia fuori dal canvas
    y: 500,  // Altezza iniziale
    speedX: 2, // Velocità orizzontale
    amplitude: 20, // Ampiezza della parabola
    frequency: 0.02 // Frequenza della parabola
};

sleigh.image.src = 'assets/slitta.png';
// Configurazione del vento
const windStrength = 0.5; // Spostamento costante in X
const oscillationRange = 1.5; // Oscillazione massima
const oscillationSpeed = 0.05; // Velocità dell'oscillazione

function setUp() {
    canvas = document.getElementById("neve-canvas");
    ctx = canvas.getContext("2d");

    const snowFlakeImages = [
        'assets/pallina1.png',
        'assets/pallina2.png',
        'assets/snowflake1.png',
        'assets/snowflake2.png',
        'assets/snowflake3.png',
        'assets/snowflake4.png'
    ];

    snowflakes = snowFlakeImages.map(src => {
        let img = new Image();
        img.src = src;
        return img;
    });

    snowflakes.forEach(img => {
        img.onload = () => {
            loadedImages++;
            if (loadedImages === snowflakes.length) {
                for (let i = 0; i < 30; i++) {
                    let x = Math.random() * canvas.width;
                    let y = Math.random() * canvas.height;
                    let speed = Math.random() * 0.5 + 0.25;
                    let size = Math.random() * 20 + 20;
                    let image = snowflakes[Math.floor(Math.random() * snowflakes.length)];
                    let oscillationOffset = Math.random() * Math.PI * 2; // Offset iniziale per variazioni diverse

                    snowflakeObjects.push({ x, y, speed, size, image, oscillationOffset });
                }

                requestAnimationFrame(gameLoop);
            }
        };
    });
}

function update() {
    for (let flake of snowflakeObjects) {
        flake.y += flake.speed;
        
        // Oscillazione in X per simulare il vento leggero
        flake.x += windStrength + Math.sin(flake.oscillationOffset) * oscillationRange;
        flake.oscillationOffset += oscillationSpeed; // Incrementa la fase dell'oscillazione

        // Se il fiocco esce dal bordo inferiore, ricompare in alto
        if (flake.y > canvas.height) {
            flake.y = -flake.size;
            flake.x = Math.random() * canvas.width;
            flake.oscillationOffset = Math.random() * Math.PI * 2;
        }

        // Se esce dal bordo destro, lo rimettiamo a sinistra
        if (flake.x > canvas.width) {
            flake.x = -flake.size;
        }
    }

////////slitta
    // Movimento in X
    sleigh.x += sleigh.speedX;

    // Movimento parabolico in Y
    sleigh.y = 50 - sleigh.amplitude * Math.sin(sleigh.x * sleigh.frequency);

    // Se la slitta esce dal canvas, ricomincia da sinistra
    if (sleigh.x > canvas.width) {
        sleigh.x = -100;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Disegna la slitta
    drawSleigh();
    // Disegna i fiocchi di neve
    for (let flake of snowflakeObjects) {
        ctx.drawImage(flake.image, flake.x, flake.y, flake.size, flake.size);
    }

    // Disegna l'ombra sfumata nella parte inferiore
    drawDarkOverlay();

   

}
function drawSleigh() {
    ctx.drawImage(sleigh.image, sleigh.x, sleigh.y, 200, 100); // Dimensione personalizzabile
}
function drawDarkOverlay() {
    let gradient = ctx.createLinearGradient(0, 500, 0, 550, 0, 575);
    gradient.addColorStop(0, "rgba(56, 51, 51, 0.1)");    // Trasparente in alto (y=400)
    gradient.addColorStop(0, "rgba(56, 51, 51, 0.5)");    
    gradient.addColorStop(1, "rgba(56, 51, 51, 0.8)");  // Mezzo trasparente in basso (y=600)

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 500, canvas.width, 200);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function start() {
    setUp();
}

start();
