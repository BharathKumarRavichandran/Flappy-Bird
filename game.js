var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth=400;
var canvasHeight=660;

var b=0;
var birdColor = Math.random(); //Bird Color Selector
var bx = 40; //Bird's Width
var by = 40; //Bird's Height
var dy = 1; //Bird's velocity
var g = 1.5; //Bird's gravity variable
var pipeDist = 400;// Distance b/w North and South Pipe
var px = 51; //pipe's width
var py = 317; //pipe's height
var pdx = 1; //pipe moving velocity
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
var pipeNorth = new Image();
var pipeSouth = new Image();

var date = new Date(); // To get Current Date
var birdArray = new Array(); //Array to store the down,mid,up frames of the bird
var pipeArray = [];

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
	
	if((date.getHours())<19 && date.getHours()>6)
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

function pipeSelector(){
	
	if(Math.random() < 0.5){
		pipeNorth = pipeNorthG;
		pipeSouth = pipeSouthG;
	}
	else{
		pipeNorth = pipeNorthR;
		pipeSouth = pipeSouthR;
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

function pipe(p,q){
	this.p = p;
	this.q = q;

	this.update = function(){
		if(this.p <= 0){
			this.p = canvasWidth-px;
			this.q = -1*(Math.random()*170);
		}
	}
}

function pipePosition(i){
	var p=canvasWidth-px+i*(100); //Tunnel's X-xoordinate
	var q= -1*(Math.random()*170); //Tunnel's Y-coordinate
	pipeArray.push(new pipe(p,q));
}

for(i=0;i<2;i++){
	pipePosition(i);
}

function gameInitialiser(){
	bgSelector();
	birdColorSelector();
	pipeSelector();
	birdFramesInitialiser();
}

function draw(){
	ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(birdArray[Math.floor(b%3)],x,y,bx,by);
	for(j=0; j<pipeArray.length; j++){
		pipeArray[j].update();
		ctx.drawImage(pipeNorth,pipeArray[j].p,pipeArray[j].q);
		ctx.drawImage(pipeSouth,pipeArray[j].p,pipeArray[j].q+pipeDist);
		px += pdx;
		pipeArray[j].p=canvasWidth-px+j*(300);
	}
	ctx.drawImage(base,0,canvasHeight-112,canvasWidth,112);

	document.addEventListener('keydown',function(event){
				if(event.keyCode == 32){ 
					y -= dy;
					wing.play();  
				}
			}, false);

	b+=0.1;
	y+=g;

	requestAnimationFrame(draw);
}

gameInitialiser();
draw();