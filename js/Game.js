class Game{
    constructor(){
        this.resetButton = createButton("");
    }
    getState(){
        var gamestateref = database.ref("gameState")
        gamestateref.on("value", function(data){
            gameState = data.val();
        })
    }
    updateState(state){
        database.ref("/").update({
            gameState: state
        })
    }
    start(){
        form = new Form();
        form.display();
        player = new Player();
        playerCount = player.getCount();

        paddle1 = createSprite(500,250,100,50);
        paddle1.addImage("p1",p1)
        paddle1.scale = 0.5

        paddle2 = createSprite(900,250,100,50);
        paddle2.addImage("p2",p2);
        paddle2.scale = 0.5

        edge1 = createSprite(700,0,1400,1);
        edge2 = createSprite(0,250,1,500);
        edge3 = createSprite(1400,250,1,500);
        edge4 = createSprite(700,500,1400,1);

        paddles = [paddle1,paddle2];

        goal1 = createSprite(0,250,10,500);
        goal1.addImage("g1",g1);
        goal2 = createSprite(1400,250,10,500)
        goal2.addImage("g2",g2);

        goals = [goal1,goal2];

        puck = createSprite(700,250,100,100);
        puck.addImage("puck",pk);
        puck.scale = 0.7;
        puck.setVelocity(0.5,0.5);

        score1 = 0;
        score2 = 0;
        scores = [score1,score2];
        
    }
    play(){
        this.handleElements();
        this.handleResetButton();
        Player.getPlayersInfo();
        this.changePuckVelocity();
        if(allPlayers != undefined){
            var index = 0
            for(var plr in allPlayers){
                index = index + 1
                var x = allPlayers[plr].PositionX;
                var y = allPlayers[plr].PositionY;
                paddles[index - 1].position.x = x;
                paddles[index - 1].position.y = y;
                if(puck.overlap(goals[index-1])){
                    player.score += 5
                    puck.position.x = 700;
                    puck.position.y = 250;
                }   
                if(player.score >= 25){
                    this.updateState(2);
                }
                if(player.index === index){
                fill("yellow");
                ellipse(x,y,150,150)
                textSize(30)
                fill("white")
                text("Score = "+player.score,700,50)
                }
                           
                console.log(score1,score2)
                
            }
        }
        
        this.handlePlayercontrols();
        player.update();
        drawSprites();
    }
    handleElements(){
        form.hide();
        this.resetButton.position(width/2+200,15);
        this.resetButton.class("resetButton");
    }
    handleResetButton(){
        this.resetButton.mousePressed(() =>{
            database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                players: {}
            })
            puck.position.x = 700;
            puck.position.y = 250;
        window.location.reload();
        })
    }
    handlePlayercontrols(){
          if(keyIsDown(UP_ARROW) && (player.positionY<510 && player.positionY>0)){
            player.positionY -= 10;
            player.update();
          }
          if(keyDown("LEFT")){
            player.positionX -= 5;
            player.update();
          }
          if(keyDown("RIGHT")){
            player.positionX += 5;
            player.update();
          }
          if(keyIsDown(DOWN_ARROW) && (player.positionY<500 && player.positionY>-10)){
            player.positionY += 10;
            player.update();
          }
        }
    changePuckVelocity(){
        var r = random(0,5);
        var s = random(0,5);
        if(puck.overlap(paddle1)){
            puck.setVelocity(r,s);
        }
        if(puck.overlap(paddle2)){
            puck.setVelocity(-r,-s);
        }
        if(puck.overlap(edge1)){
            puck.setVelocity(0,s);
        }
        if(puck.overlap(edge2)){
            puck.setVelocity(r,0);
        }
        if(puck.overlap(edge3)){
            puck.setVelocity(-r,0);
        }
        if(puck.overlap(edge4)){
            puck.setVelocity(0,-s);
        }
    }

    end(){
        background("lightblue");
        this.handleResetButton();
        if(player.score >= 25){
            swal({
                title:  `You Won!`,
                text: "You have succesfully won this game of Air Hockey!",
                imageUrl: "https://cdn2.vectorstock.com/i/1000x1000/39/41/champion-trophy-cartoon-vector-23303941.jpg" ,
                imageSize: "100x100",
                confirmButtonText: "Ok"
            })
        }
        else{
            swal({
                title:  `You Lost`,
                text: "Your opponent was too good :(",
                imageUrl: "https://i.pinimg.com/originals/da/84/b9/da84b9937f9da0a7146b19ed2340a7eb.png" ,
                imageSize: "100x100",
                confirmButtonText: "I accept defeat. :("
            })
        }
    }
}