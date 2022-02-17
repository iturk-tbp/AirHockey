class Player{
    constructor(){
        this.name = null,
        this.poisitionX = 0,
        this.positionY = 250,
        this.dangerGoal = null,
        this.score = 0,
        this.scorex = 0
    }
    addPlayer(){
        var playerIndex  = "players/player" + this.index;
        if(playerCount === 1){
            this.positionX = 500;
            this.dangerGoal = "goal1";
            this.scorex = 100;
          
        }
        else{
            this.positionX = 900;
            this.dangerGoal = "goal2"
            this.scorex = 1100;
           
        }
        database.ref(playerIndex).set({
            Name: this.name,
            PositionX: this.positionX,
            PositionY: this.positionY,
            Danger: this.dangerGoal,
            Score: this.score,
            ScoreX: this.scorex
        })
    }
    getCount(){
        var countref = database.ref("playerCount")
        countref.on("value",data => {
          playerCount = data.val()
        })
      }
    updateCount(count){
    database.ref("/").update({
      playerCount: count
    })
  }
  update(){
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).update({
      PositionX: this.positionX,
      PositionY: this.positionY,
      Score: this.score
    })
  }
  getScore(){
    var playerscoreref = database.ref("players/player"+this.index)
    playerscoreref.on("value",data=>{
      var data = data.val()
      this.score = data.Score
    })
  }
  updateScore(){
    var playerscoreref = database.ref("players/player" + this.index)
    playerscoreref.update({
      Score: this.score
    })
  }
  static getPlayersInfo(){
    var playerInforef = database.ref("players")
    playerInforef.on("value",data =>{
      allPlayers = data.val();
    })
  }
    
}