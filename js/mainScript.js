var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var centerX = cvs.width / 2;
var centerY = cvs.height / 2;

var xPos = 500;
var yPos = 0;

var getEq = 30;
var anotherGraph = false;
var isItPassat = false;
document.addEventListener("keydown", keyPressed);

var aud = new Audio();
var hit = new Audio();
aud.src = "audio/fly.mp3";
hit.src = "audio/hit.mp3";

var passat = new Image();
var most = new Image();
var opelsTop = new Image();
var opelsBottom = new Image();
var gap = 200;
passat.src = "img/passat.png";
most.src = "img/most.png";
opelsTop.src = "img/opelsTop.png";
opelsBottom.src = "img/opelsBottom.png";

draw();

function keyPressed(event){
    if (event.defaultPrevented) {
        return;
    }
        switch (event.key) {
            case "Down":
            case "ArrowDown":
                getDown();
                break;
            case "Up":
            case "ArrowUp":
                getUp();
                break;
            case "Right":
            case "ArrowRight":
                getRight();
                break;
            case "ArrowLeft":
                getLeft();
                break;
            default:
                return;
        }


    event.preventDefault();
}

function getRight() {
    centerX -= 10;
    xPos += 20;
    aud.pause()
    aud.currentTime = 0
    aud.play()﻿
    draw();
}
function getLeft() {
    centerX += 10;
    xPos -= 20;
    aud.pause()
    aud.currentTime = 0
    aud.play()﻿
    draw();
}
function getUp() {
    centerY += 10;
    yPos -= 20;
    aud.pause()
    aud.currentTime = 0
    aud.play()﻿
    draw();
}
function getDown() {
    centerY -= 10;
    yPos += 20;
    aud.pause()
    aud.currentTime = 0
    aud.play()﻿
    draw();
}

function draw() {

    if(isItPassat === false){
        drawGraph();
    }



//f(x) = equation



function drawGraph() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    for (var xCoord = 0; xCoord < cvs.width; xCoord++) {
        for (var yCoord = 0; yCoord < cvs.height; yCoord++) {
            //draw Cartesian coordinate system
            if (xCoord === centerX || yCoord === centerY) {
                ctx.fillStyle = "#80b4ff";
                ctx.fillRect(xCoord, yCoord, 1, 1);
            }
            //f(x) = equation
            var x = xCoord - centerX;
            //getEq is getting in field
            var equation = Math.pow(0.2*x + 22, 2) + 17;

            if(anotherGraph) {
                equation = eval(getEq.toString());
            }

            if (centerY - yCoord === equation) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(xCoord, yCoord, 2, 2);
            }
        }
    }

    ctx.fillStyle = "#5ecfff";
    ctx.font = "12px Verdana";
    ctx.fillText("x equals " + (512 - centerX) , cvs.width - 100, cvs.height - 40);
    ctx.fillText("y eqals " + (centerY - 256), cvs.width - 100, cvs.height - 20);
}
}

function showCoords(event) {
    var x = event.screenX;
    var y = event.screenY;
    ctx.fillStyle = "#5ecfff";
    ctx.font = "12px Verdana";
    ctx.fillText("X equals: " + x, cvs.width - 100, cvs.height - 40);
    ctx.fillText("Y equals: " + y, cvs.width - 100, cvs.height - 20);

}

function setEq(){
    getEq = document.getElementById('func').value;
    anotherGraph = true;
    draw();
}

var opels = [];

opels[0] = {
    x : -100,
    y : 0
}

var dmg = 0;

function drawPassat() {
    isItPassat = true;

    ctx.drawImage(most, 0, 0);

    ctx.drawImage(passat, xPos, yPos, 100, 100);

    for(var i = 0; i < opels.length; i++) {
        ctx.drawImage(opelsTop, opels[i].x, opels[i].y);
        ctx.drawImage(opelsBottom, opels[i].x, opels[i].y  + opelsTop.height +  gap);

        opels[i].x++;

        if(opels[i].x == 500) {
            opels.push({
                x : -100,
                y : Math.floor(Math.random()*250) - 250
            })
        }

        if(xPos < opels[i].x + opelsTop.width && xPos + 100 > opels[i].x
            && (yPos <= opels[i].y + opelsTop.height || yPos + 100 >= opels[i].y + opelsTop.height + gap)) {

            ctx.fillStyle = "#dc1100";
            ctx.font = "112px Verdana";
            ctx.fillText("CRASHED", 50, 150);
            hit.play()﻿
            dmg++;
        }


    }

    ctx.fillStyle = "#fcffe0";
    ctx.font = "12px Verdana";
    ctx.fillText("Нанес себе урона:" + dmg, cvs.width - 200, cvs.height - 40);

    yPos += 1;

    requestAnimationFrame(drawPassat);
}