var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth=400;
var canvasHeight=660;

var b=0;
var birdColor = Math.random(); //Bird Color Selector
var bx = 40; //Bird's Width
var by = 40; //Bird's Height
var dx = 1; //Bird's velocity
var dy = 3; //Bird's gravity variable
var i;
var j;
var pipeDist = 400;
var px = 51; //51 x 317
var py = 317;
var pdx = 2.5;
var p=canvasWidth-px; //Tunnel's X-xoordinate
var q=0; //Tunnel's Y-coordinate
var score = 0;
var x = 80;  //Bird's X-coordinate
var y = 260;  //Bird's Y-coordinate

var base = new Image(); //Base Surface Image
var bg = new Image(); // Background selector variable 
var bgDay = new Image(); //Background Image Day
var bgNight = new Image(); //Background Image Night
var bd = new Image(); //Bluebird downflap
var bm = new Image(); //Bluebird midflap
var bu = new Image(); //Bluebird upflap
var gameOver = new Image(); //gameover Image
var gameStart = new Image(); //gamestart Image
var pipeNorthG = new Image(); //Pipe-green-north
var pipeNorthR = new Image(); //Pipe-red-north
var pipeSouthG = new Image(); //Pipe-green-south
var pipeSouthR = new Image(); //Pipe-red-north
var rd = new Image(); //Redbird downflap
var rm = new Image(); //Redbird midflap
var ru = new Image(); //Redbird upflap
var yd = new Image(); //Yellowbird downflap
var ym = new Image(); //Yellowbird downflap
var yu = new Image(); //Yellowbird upflap
var birdDown = new Image(); //To select among Blue, Red, Yellow
var birdMid = new Image(); //To select among Blue, Red, Yellow
var birdUp = new Image(); //To select among Blue, Red, Yellow

var date = new Date(); // To get Current Date
var birdArray = new Array(); //Array to store the down,mid,up frames of the bird

base.src = "sprites/base.png";
bgDay.src = "sprites/background-day.png";
bgNight.src = "sprites/background-night.png";
bd.src = "sprites/bluebird-downflap.png"
bm.src = "sprites/bluebird-midflap.png";
bu.src = "sprites/bluebird-upflap.png";
gameOver.src = "sprites/gameover.png";
gameStart.src = "sprites/message.png";
pipeNorthG.src = "sprites/pipe-green-north.png";
pipeNorthR.src = "sprites/pipe-red-north.png";
pipeSouthG.src = "sprites/pipe-green-south.png";
pipeSouthR.src = "sprites/pipe-red-south.png";
rd.src = "sprites/redbird-downflap.png";
rm.src = "sprites/redbird-midflap.png";
ru.src = "sprites/redbird-upflap.png";
yd.src = "sprites/yellowbird-downflap.png";
ym.src = "sprites/yellowbird-midflap.png";
yu.src = "sprites/yellowbird-upflap.png";

var die = new Audio('audio/die.wav');
var hit = new Audio('audio/hit.wav');
var point = new Audio('audio/point.wav');
var swoosh = new Audio('audio/swoosh.wav');
var wing = new Audio('audio/wing.wav');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function stopAudio(audio) {    //Function to stop audio the current audio from playing
    audio.pause();
    audio.currentTime = 0;
}

function bgSelector(){
	
	if((date.getHours()) < 19)
		bg = bgDay;
	else
		bg = bgNight;
}

function birdColorSelector(){
	
	if(birdColor < 0.3){
		birdDown = bd;
		birdMid = bm;
		birdUp = bu;
	}

	else if(birdColor >= 0.3 && birdColor <0.6){
		birdDown = rd;
		birdMid = rm;
		birdUp = ru;
	}

	else{
		birdDown = yd;
		birdMid = ym;
		birdUp = yu;
	}
}

function birdFramesInitialiser(){
	birdArray[0] = new Image();
	birdArray[1] = new Image();
	birdArray[2] = new Image();
	birdArray[0] = birdDown;
	birdArray[1] = birdMid;
	birdArray[2] = birdUp;
}

function gameInitialiser(){
	bgSelector();
	birdColorSelector();
	birdFramesInitialiser();
}

function draw(){
	ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(birdArray[Math.floor(b%3)],x,y,bx,by);
	ctx.drawImage(pipeNorthG,p,q);
	ctx.drawImage(pipeSouthG,p,q+pipeDist);
	ctx.drawImage(base,0,canvasHeight-112,canvasWidth,112);

	document.addEventListener('keydown',function(event){
				if(event.keyCode == 32){ 
					y-=0.8;
					wing.play();  
				}
			}, false);

	b+=0.1;
	y+=dy;
	px += pdx;
	p=canvasWidth-px;

	requestAnimationFrame(draw);
}

gameInitialiser();
draw();