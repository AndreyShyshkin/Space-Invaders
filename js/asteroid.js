function createAsteroid() {
    let spawn = random(1, 2);
    if (spawn == 1) {
      let positionLeft = random(150, ($(window).width() - 150));
      let asteroid = $('<div class="asteroid"><img class="asteroidimg" src="./images/asteroid1.png" alt="asteroidimg"></div>');
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
        EndGame();
      }
    }, 100);
  }
  