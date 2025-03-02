
let canvas;
let ctx;


const canvasSize = 600;
const totalSquare = 6; //decide il numero di quadrati sia in x che in y
const numberOfSquare = totalSquare / 2;
const dimensionSquare = canvasSize / totalSquare;



function setUp() {
    canvas = document.getElementById('scacchiera-canvas');
    ctx = canvas.getContext('2d');


}

function update() {

}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
    drawSquare();


}
function drawSquare() {
    for (let row = 0; row < totalSquare; row++) {
        for (let colonne = 0; colonne < totalSquare; colonne++) {
            if ((row + colonne) % 2 !== 0) {  //cambia il diverso per ottenere logica inversa ed iniziare con quadrato pieno.
                ctx.fillStyle = "red";
                ctx.fillRect(colonne * dimensionSquare, row * dimensionSquare, dimensionSquare, dimensionSquare);
            }

        }
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