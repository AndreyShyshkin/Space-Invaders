let asteroid;

function createAsteroid() {
    let spawn = random(1, 2);
    if (spawn == 1) {
      let positionLeft = random(150, ($(window).width() - 150));
      asteroid = $('<div class="asteroid"><img class="asteroidimg" src="./images/asteroid1.png" alt="asteroidimg"></div>');
      asteroid.css('left', positionLeft + 'px');
      asteroid.css('top', '-150px');
      $("#app").append(asteroid);
      moveAsteroid(asteroid);
    }
  }
  
  function moveAsteroid(asteroid) {
  
    let timerID = setInterval(function() {
      asteroid.css('top', asteroid.position().top + 3 + 'px');
      if (asteroid.position().top > $(window).height()) {
        clearInterval(timerID);
        asteroid.remove();
        hpPlayer = hpPlayer - 100;
        hpPlayerLive()
        if(hpPlayer <= 0){
            EndGame();
        }
      }
      if(asteroid.position().top > $("#player1").position().top - 50 && asteroid.position().top < $("#player1").position().top + 50 && asteroid.position().left > $("#player1").position().left - 50 && asteroid.position().left < $("#player1").position().left + 50){
        clearInterval(timerID);
        asteroid.remove();
        hpPlayer = hpPlayer - 100;
        hpPlayerLive()
        if(hpPlayer <= 0){
            EndGame();
        }
    }
    }, 100);
  }
  