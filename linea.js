
let canvas;
let ctx;
const entities = [];
const rectWidth = 30;
const rectHeight = 30;
let initialX = 0;
let lineHeight = 60;
console.log(entities);

const positiveYBasket = [15, 135, 255, 375, 495];
const negativeYBasket = [75, 195, 315, 435, 555]; // Solo alcune Y per velocità negativa

function speedGenerator(isPositive) {
  const speed = Math.round((Math.random() * 6) + 1);
  return isPositive ? speed : -speed;
}

function getRandomY() {
  const allY = [...positiveYBasket, ...negativeYBasket];
  const randomIndex = Math.floor(Math.random() * allY.length);
  const positionY = allY[randomIndex];
  const isPositive = positiveYBasket.includes(positionY);
  return { positionY, isPositive };
}

function setUp() {
  canvas = document.getElementById("linea-canvas");
  ctx = canvas.getContext("2d");
  for (let i = 0; i < 30; i++) {
    const rect = {};
    rect.width = rectWidth * Math.round((Math.random() * 3) + 1);
    rect.positionX = initialX;
    const { positionY, isPositive } = getRandomY();
    rect.positionY = positionY;
    rect.speedX = speedGenerator(isPositive);
    entities.push(rect);
  }
}

function update() {
  entities.forEach(rect => {
    rect.positionX += rect.speedX;
    if (rect.positionX < 0) rect.positionX = 600;
    if (rect.positionX > 600) rect.positionX = 0;
  });
}

function draw() {
  ctx.fillStyle = 'rgba(255,255,255)';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'black';
  entities.forEach(rect => {
    ctx.fillRect(rect.positionX, rect.positionY, rect.width, rectHeight);
  });
}

function gameLoop(elapsedTime) {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function start() {
  setUp();
  requestAnimationFrame(gameLoop);
}

start();