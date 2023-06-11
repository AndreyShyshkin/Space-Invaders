let selectedLevel = null;
let selectedCosmolet = null;
let hpPlayer = 0;
let score = 0;
let hp = 0;
let speed = 0;
let speedPlus = 0;

$(document).ready(function() {

    $('input[name="level"]').change(function() {
      selectedLevel = $('input[name="level"]:checked').index('input[name="level"]');;
    });
  
    $('input[name="cosmolet"]').change(function() {
    selectedCosmolet = $('input[name="cosmolet"]:checked').index('input[name="cosmolet"]');; 
    switch (selectedCosmolet){
      case 0:
          $("#player1img").attr("src", "images/space-ship.png");
          break;
      case 1:
          $("#player1img").attr("src", "images/space-ship-1.png");
          break;
      case 2:
          $("#player1img").attr("src", "images/space-ship-2.png");
          break;        
  }
  });
});

$(".start").on("click", function(){
    if(selectedLevel == null || selectedCosmolet == null){
        alert("Выберите уровень и комплеель");
    }else {
        startGame();
    }
}
)

function startGame(){
    $(".startScreen").css("display", "none");
    $("#player1").css("display", "flex");
    hpPlayer = 300;
    speedPlus = 0;

    hpPlayerLive()
    positionStart();

    for(let i = 0; i < random(2, 5); i++){
        createEnemy();

        createAsteroid()

        score = 0;
        $(".score").html(score);
    }
}


