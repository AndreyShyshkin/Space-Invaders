function createAsteroid() {

  switch (selectedLevel) {
    case 0:
      speed = 2;
      break;
    case 1:
      speed = 5;
      break;
    case 2:
      speed = 7;
      break;
}

    speed += speedPlus;

    let spawn = random(1, 2);
    if (spawn == 1) {
      let positionLeft = random(150, ($(window).width() - 150));
      let asteroid = $('<div class="asteroid"><img class="asteroidimg" src="images/asteroid1.png" alt="asteroidimg"></div>');
      asteroid.css('left', positionLeft + 'px');
      asteroid.css('top', '-150px');
      $("#app").append(asteroid);
      moveAsteroid(asteroid);
    }
  }
  
  function moveAsteroid(asteroid) {
  
    let timerID = setInterval(function() {
      asteroid.css('top', asteroid.position().top + speed + 'px');
      if (asteroid.position().top > $(window).height()) {
        clearInterval(timerID);
        asteroid.remove();
        hpPlayer = hpPlayer - 100;
        hpPlayerLive();
        if(hpPlayer <= 0){
            EndGame();
        }else{
          createAsteroid();
        }
      }
      if (
        asteroid.position().top > $("#player1").position().top - 50 &&
        asteroid.position().top < $("#player1").position().top + 50 &&
        asteroid.position().left > $("#player1").position().left - 50 &&
        asteroid.position().left < $("#player1").position().left + 50
      ) {
      clearInterval(timerID);
        asteroid.remove();
        hpPlayer = hpPlayer - 100;
        hpPlayerLive();
        if(hpPlayer <= 0){
            EndGame();
        }else{
          createAsteroid();
        }
    }
    }, 100);
  }
  