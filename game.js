/*var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "9px Arial";*/

var dx = 1; //Bird's velocity
var dy = 1; //Bird's gravity variable
var i;
var j;
var p; //Tunnel's X-xoordinate
var q; //Tunnel's Y-coordinate
var score = 0;
var x;  //Bird's X-coordinate
var y;  //Bird's Y-coordinate

var base = new Image(); //Base Surface Image
var bgDay = new Image(); //Background Image Day
var bgNight = new Image(); //Background Image Night
var bd = new Image(); //Bluebird downflap
var bm = new Image(); //Bluebird midflap
var bu = new Image(); //Bluebird upflap
var gameOver = new Image(); //gameover Image
var gameStart = new Image(); //gamestart Image
var pipeg = new Image(); //Pipe-green
var piper = new Image(); //Pipe-red
var rd = new Image(); //Redbird downflap
var rm = new Image(); //Redbird midflap
var ru = new Image(); //Redbird upflap
var yd = new Image(); //Yellowbird downflap
var ym = new Image(); //Yellowbird downflap
var yu = new Image(); //Yellowbird upflap

var die = new Audio('audio/die.wav');
var hit = new Audio('audio/hit.wav');
var point = new Audio('audio/point.wav');
var swoosh = new Audio('audio/swoosh.wav');
var wing = new Audio('audio/wing.wav');

function stopAudio(audio) {    //Function to stop audio the current audio from playing
    audio.pause();
    audio.currentTime = 0;
}

