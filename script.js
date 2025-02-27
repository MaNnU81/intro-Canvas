

const canvas = document.getElementById('my-canvas');

const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'red';
// ctx.fillRect(10, 10, 100, 50)

// ctx.fillStyle = 'green';
// ctx.fillRect(250, 275, 100, 50);

// ctx.strokeStyle = 'crimson';
// ctx.lineWidth = 4;
// ctx.strokeRect(350, 400, 10, 50)

// for (let index = 0; index < 100; index++) {
    
//     const originX = Math.random() *600;
//     const originY = Math.random() *600;
//     const width = Math.random() *200;
//     const height = Math.random() *200;

//     const red = Math.random() *255;
//     const green = Math.random() *255;
//     const blue = Math.random() *255;
//     const alpha = Math.random();

//     ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
//     ctx.fillRect(originX, originY, width, height);
// }

// setInterval(() => {
//     for (let index = 0; index < 100; index++) {
//         ctx.fillStyle = `255, 255, 255, 0.05`;
//         ctx.fillRect (0,0,600,600);
        
//         const width = Math.random() *200;
//         const height = Math.random() *200;
//         const originX = Math.random() * (600 - width);
//         const originY = Math.random() * (600 - height);
        
    
//         const red = Math.random() *255;
//         const green = Math.random() *255;
//         const blue = Math.random() *255;
//         const alpha = Math.random();
    
//         ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
//         ctx.fillRect(originX, originY, width, height);
//     }
// }, 300);


// ///////PATTERN
// // **Variabili configurabili**
// const squareSize = 50; // Lato del quadrato
// const spacing = 120; // Distanza tra i vertici dei quadrati
// const rows = 3; // Numero di righe di quadrati
// const offsetY = 60; // Offset della prima riga
// const verticalSpacing = (canvas.height - offsetY) / rows; // Distanza verticale tra le righe
// const colorFill = "orange"; // Colore riempimento
// const colorStroke = "red"; // Colore bordo
// const strokeWidth = 4; // Spessore bordo
// const angle = Math.PI / 4; // Rotazione di 45°
// const normalLineWidth = 1; // Spessore righe normali
// const thickLineWidth = normalLineWidth * 4; // Spessore linea spezzata

// ctx.strokeStyle = "black";
// ctx.lineWidth = normalLineWidth;

// // **Trova le posizioni delle colonne da saltare**
// let skipPositions = [];
// for (let x = spacing; x <= canvas.width - 60; x += spacing) {
//     skipPositions.push(x - 10, x, x + 10); // Salta la riga in corrispondenza del vertice + le due adiacenti
// }

// // **Disegna le linee verticali**
// for (let x = 0; x <= canvas.width; x += 10) {
//     if (skipPositions.includes(x)) { 
//         // **Spazio vuoto: disegna linea spezzata più spessa**
//         ctx.lineWidth = thickLineWidth; 
//         ctx.beginPath();
//         for (let y = 0; y < canvas.height; y += 20) {
//             ctx.moveTo(x, y);
//             ctx.lineTo(x, y + 10);
//         }
//         ctx.stroke();
//         ctx.lineWidth = normalLineWidth; // Ripristina spessore normale
//     } else {
//         // **Righe normali**
//         ctx.beginPath();
//         ctx.moveTo(x, 0);
//         ctx.lineTo(x, canvas.height);
//         ctx.stroke();
//     }
// }

// // **Loop per disegnare le tre file di quadrati**
// for (let row = 0; row < rows; row++) {
//     let yPosition = offsetY + row * verticalSpacing; // Calcola la posizione verticale della riga

//     for (let x = spacing; x <= canvas.width - 60; x += spacing) {
//         ctx.save();
//         ctx.translate(x, yPosition); // Sposta l'origine
//         ctx.rotate(angle); // Ruota il quadrato

//         ctx.fillStyle = colorFill;
//         ctx.strokeStyle = colorStroke;
//         ctx.lineWidth = strokeWidth;

//         ctx.beginPath();
//         ctx.rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
//         ctx.fill();
//         ctx.stroke();
//         ctx.restore();
//     }
// }


///////////fine pattern

// **Variabili del triangolo**
const canvasSize = 600;
const triangleHeight = 70;
const strokeWidth = 4;
const fillColor = "green";
const strokeColor = "gray";

// **Calcola i punti del triangolo**
const centerX = canvasSize / 2;
const centerY = canvasSize / 2;
const halfBase = triangleHeight / Math.sqrt(3); // Base calcolata da altezza di un equilatero

const p1 = { x: centerX, y: centerY - triangleHeight / 2 }; // Vertice superiore
const p2 = { x: centerX - halfBase, y: centerY + triangleHeight / 2 }; // Base sinistra
const p3 = { x: centerX + halfBase, y: centerY + triangleHeight / 2 }; // Base destra

// // **Disegna il triangolo**
// ctx.fillStyle = fillColor;
// ctx.strokeStyle = strokeColor;
// ctx.lineWidth = strokeWidth;

// ctx.beginPath();
// ctx.moveTo(p1.x, p1.y);
// ctx.lineTo(p2.x, p2.y);
// ctx.lineTo(p3.x, p3.y);
// ctx.closePath();
// ctx.fill();
// ctx.stroke();

let circles = [];

        // Aggiunge un cerchio al click
        canvas.addEventListener("click", function(event) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Genera un colore casuale

            circles.push({ x, y, radius: 30, alpha: 1, color });
        });

        function drawCircles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < circles.length; i++) {
                let circle = circles[i];

                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = circle.color; 
                ctx.fill();
                
                circle.alpha -= 0.02;  // Il cerchio svanisce lentamente

                if (circle.alpha <= 0) {
                    circles.splice(i, 1);
                    i--;
                }
            }

            requestAnimationFrame(drawCircles);
        }

        drawCircles();