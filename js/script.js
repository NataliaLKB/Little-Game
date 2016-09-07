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

function loadImage (imgName, postionX, postionY, cb) {
    var img = new Image();

    img.src = "./images/" + imgName + ".png";

    img.onload = function () {

        var x = (postionX) ? postionX : width/2 - img.width/2;
        var y = (postionY) ? postionY : height/2 - img.height/2;

        stage.drawImage(img, x, y);

        if (cb) {
            cb(imgName, x, y);
        }
    }
}

function happyBday () {
    writeText("Happy", "50px", 5, 100, 90, 
        writeText.bind( null, "Birthday!", "50px", 5, 50, 150, instructions)
    );
}

function instructions () {
    writeText("tap to play", "35px", 3, 80, height-100, listenForGame)
}

function listenForGame () {
    // remove event listeners after
    canvas.addEventListener("click", loadGame, false);
    canvas.addEventListener("touchstart", loadGame, false);
}

function loadGame () {
    // Clear canvas
    stage.clearRect(0, 0, canvas.width, canvas.height);

    // remove events
    canvas.removeEventListener("click", loadGame);
    canvas.removeEventListener("touch", loadGame);

    loadImage("matt-stokes-side", 20, height-340);
    loadImage("ground", 0, height-200);

    walk(20, 0);
}

function walk (startPostionX, count) {
    var walkingSpeed = 2.5;
    var newPosition = (startPostionX < Number(width)) ? (startPostionX + walkingSpeed) : (startPostionX - walkingSpeed); 
    var imageName;

    if (count % 2 === 1) {
        imageName = "matt-stokes-side-frontup";
    } else {
        imageName = "matt-stokes-side-backup";
    } 


    stage.clearRect(0, 0, canvas.width, canvas.height);

    loadImage("ground", 0, height-200);
    loadImage(imageName, newPosition, height-340)
    
    console.log(newPosition, width);
    setTimeout(function () {
        requestAnimationFrame(function() {
            walk(newPosition, count+1)
        });

    }, 200);
}

/* TODO:
- Need a walking pixel person picture
- Character should be "walking all the time", but can't walk past the canvas
- "jump" button which jumps the charactor
- assets should be loaded randomly so charactor can jump to the stop
- Top should be a star or coin
- Once reached game ends and you have a similar end page as the start page
*/

function writeText (text, fontSize, lineWidth, startPostionX, startPostionY, cb) {

    var dashLen = 220;
    var dashOffset = dashLen;
    var speed = 20; // change to 7
    
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
