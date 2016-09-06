var width = (Number(window.innerWidth) > 400) ? "400" : window.innerWidth;
var height = window.innerHeight;

var canvas;
var stage;

function init () {

    canvas = document.getElementById('canvas'); 

    stage = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    loadImage("matt-stokes-front");
    happyBday();
}

function loadImage (imgName) {
    var img = new Image();

    img.src = "./images/" + imgName + ".png";

    img.onload = function () {
        stage.drawImage(img, (width / 2 - img.width / 2), (height / 2 - img.height / 2));
    }
}

function happyBday () {
    writeText("Happy", "50px", 5, 100, 90, 
        writeText.bind( null, "Birthday!", "50px", 5, 50, 150, instructions)
    );
}

function instructions () {
    writeText("tap to play", "35px", 3, 80, height-100)
}

function listenForGame () {
    canvas.addEventListener("click", startGame, false);
}

function startGame () {
    // Clear canvas
    stage.clearRect(0, 0, canvas.width, canvas.height);

    loadImage("matt-stokes-side")
}

function writeText (text, fontSize, lineWidth, startPostionX, startPostionY, cb) {

    var dashLen = 220;
    var dashOffset = dashLen;
    var speed = 11; // change to 7
    
    stage.lineWidth = lineWidth;
    stage.font = fontSize + " Comic Sans MS, cursive, TSCu_Comic, sans-serif";
    stage.strokeStyle = stage.fillStyle = "#000";
    stage.textAlign = "center";

    var i = 0;

    (function loop() {

        stage.setLineDash([dashLen - dashOffset, dashOffset - speed]);
        dashOffset -= speed;
        stage.strokeText(text[i], startPostionX, startPostionY);

        if (dashOffset > 0) {

            requestAnimationFrame(loop);
        } else {

            stage.fillText(text[i], startPostionX, startPostionY);
            dashOffset = dashLen;
            startPostionX += stage.measureText(text[i++]).width + stage.lineWidth * Math.random();
            stage.setTransform(1, 0, 0, 1, 0, 3 * Math.random());
            stage.rotate(Math.random() * 0.005);

            if (i < text.length) {

                requestAnimationFrame(loop);
            } else {

                if (cb) {

                    cb();
                }
            }
        }
    })();
}


window.onload = function () {
	init();
}
