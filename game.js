/*var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "9px Arial";*/

var dx =1; //Bird's velocity
var i;
var j;
var p; //Tunnel's X-xoordinate
var q; //Tunnel's Y-coordinate
var score = 0;
var x;  //Bird's X-coordinate
var y;  //Bird's Y-coordinate

var die = new Audio('audio/die.wav');
var hit = new Audio('audio/hit.wav');
var point = new Audio('audio/point.wav');
var swoosh = new Audio('audio/swoosh.wav');
var wing = new Audio('audio/wing.wav');

function stopAudio(audio) {    //Function to stop audio the current audio from playing
    audio.pause();
    audio.currentTime = 0;
}

