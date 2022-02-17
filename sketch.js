var playerCount = 0
var database
var gameState = 0
var form, player
var allPlayers
var paddle1, paddle2, paddles
var p1, p2, pk, puck
var edge1, edge2, edge3, edge4
var goal1, goal2, goals
var g1, g2
var score1, score2
var scores

function preload(){
    p1 = loadImage("assets/p1.png");
    p2 = loadImage("assets/p2.png");
    pk = loadImage("assets/puck.png");
    g1 = loadImage("assets/g1.png");
    g2 = loadImage("assets/g2.png");
}

function setup(){
    var canvas = createCanvas(1400,500);
    database = firebase.database()
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background("purple");
    if(playerCount === 2){
        game.updateState(1);
      }
      if(gameState === 1){
        game.play();
      }
      if(gameState === 2){
        game.end();
      }
      console.log(score1,score2)
}


