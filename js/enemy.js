let hp = 0;
let speed = 0;

function createEnemy(){
    switch (selectedLevel) {
        case 0:
          hp = 100;
          speed = 1;
          break;
        case 1:
          hp = 300;
          speed = 3;
          break;
        case 2:
          hp = 500;
          speed = 5;
          break;
      }
    let positionLeft = random(150, ($(window).width() - 150));
    let enemy = $('<div class="enemy"></div>');
    enemy.css('left', positionLeft + 'px');
    enemy.css('top', '-150px');
    $("#app").append(enemy);
    moveEnemy(enemy);
}

function moveEnemy(enemy){
    let timerID = setInterval(function() {
        enemy.css('top', enemy.position().top + speed + 'px');
        if(enemy.position().top > $(window).height()){
            clearInterval(timerID);
            enemy.remove();
            EndGame();
    }
    if(enemy.position().top > $("#player1").position().top - 50 && enemy.position().top < $("#player1").position().top + 50 && enemy.position().left > $("#player1").position().left - 50 && enemy.position().left < $("#player1").position().left + 50){
        clearInterval(timerID);
        enemy.remove();
        EndGame();
    }
}, 100);
}