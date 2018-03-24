var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth=400;
var canvasHeight=660;

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
var gameOver = new Audio('audio/gameover.mp3');
var hit = new Audio('audio/hit.wav');
var point = new Audio('audio/point.wav');
var swoosh = new Audio('audio/swoosh.wav');
var wing = new Audio('audio/wing.wav');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function start(){

var b=0;
var birdColor = Math.random(); //Bird Color Selector
var baseWidth = 336; //Base-Ground png's actual width
var baseHeight = 112; //Base-Ground png's actual height
var bx = 40; //Bird's Width
var by = 40; //Bird's Height
var dy = 1; //Bird's Uppertap Velocity
var g = 1.5; //Bird's gravity variable
var pipeDist = 400;// Distance b/w North and South Pipe
var px = 51; //pipe's width
var py = 317; //pipe's height
var pdx = 1; //pipe moving velocity
var score = 0;
var x = 80;  //Bird's X-coordinate
var y = 260;  //Bird's Y-coordinate

var date = new Date(); // To get Current Date
var birdArray = new Array(); //Array to store the down,mid,up frames of the bird
var pipeArray = [];
var pause = false;

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
		if(this.p <= -px){
			this.p = (canvasWidth-px)+20;
			this.q = -1*(Math.random()*170);
		}
	}

	this.collide = function(){

		if( (x+bx>=this.p) && (x<=(this.p+px)) && (y<=(this.q+py))) {   //North Pipe Collision Testing
			pause=true;
			hit.play();
		}

		else if( (x+bx>=this.p) && (x<=(this.p+px)) && (y+by>=(this.q+pipeDist)) ) {	  //South Pipe Collision Testing
			pause=true;
			hit.play();
		}

		else if( (y+by) >= (canvasHeight-baseHeight) ) {   //Ground Collision Testing
			pause=true;
			die.play();
		}

	}

	this.score = function(){

		if(x==(this.p+px) && (y>(this.q+py)) && (y<(this.q+pipeDist))) {
			score++;
			point.play();
		}

	}
}

function pipePosition(i){
	var p= canvasWidth+i*200; //Tunnel's X-xoordinate
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
	ctx.fillStyle= '#000000';
	ctx.font = '25px Arial';
}

function draw(){
	ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(birdArray[Math.floor(b%3)],x,y,bx,by);
	for(j=0; j<pipeArray.length; j++){
		pipeArray[j].update();
		ctx.drawImage(pipeNorth,pipeArray[j].p,pipeArray[j].q);
		ctx.drawImage(pipeSouth,pipeArray[j].p,pipeArray[j].q+pipeDist);
		pipeArray[j].collide();
		pipeArray[j].score();
		pipeArray[j].p-=pdx;
	}
	ctx.drawImage(base,0,canvasHeight-baseHeight,canvasWidth,baseHeight);
	ctx.fillText("Score: "+score,20,50);
	document.addEventListener('keydown',function(event){
				if(event.keyCode == 32){ //Spacebar keycode
					y=y-dy;
					wing.play();  
				}
			}, false);

	b+=0.1;
	if(b==0.3){
		b=0;
	}
	y+=g;

	if(pause==true){

			ctx.fillStyle = "#000000";
			ctx.globalAlpha = 0.6;
			ctx.fillRect(70,180,250,150);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "#FF0000";
			ctx.font = "25px Arial";
			ctx.fillText("GAME OVER",120,220);
			ctx.font = "15px Arial";
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("Score : "+score,130,260);
			ctx.fillText("Press R to restart",130,290);
			gameOver.play();
			
			document.addEventListener('keydown',function(event){
				if(event.keyCode == 82){ //r keyCode
					stopAudio(gameOver);
					start();
				}
			}, false);
		
		return;

	}

	requestAnimationFrame(draw);
}

gameInitialiser();
draw();

}

start();