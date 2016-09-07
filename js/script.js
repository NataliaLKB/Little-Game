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

        stage.clearRect(x, y, img.width, img.height);

        stage.drawImage(img, x, y);


        if (cb) {
            cb(img);
        }
    }
}

function happyBday () {
    writeText("Happy", "50px", 5, 110, 90, 
        writeText.bind( null, "Birthday", "50px", 5, 80, 150, writeName)
    );
}

function writeName () {
    writeText("Matt!", "85px", 3, 95, height-100, characterWave.bind(null, 0));
}

function characterWave (count) {

    console.log(count);

    if (count < 20) {
        setTimeout(function () {

            if (count % 2 === 1) {

                loadImage("wave2", null, null, characterWave.bind(null, count+1));
            } else {

                loadImage("wave1", null, null, characterWave.bind(null, count+1));
            }
        }, 200);
    }
}

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
