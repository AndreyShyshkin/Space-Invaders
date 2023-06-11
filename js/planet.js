let planet;

function createPlanet() {
      let positionLeft = random(150, ($(window).width() - 150));
      planet = $('<div class="planet"></div>');
      planet.css('left', positionLeft + 'px');
      planet.css('top', '-150px');
      planet.css('background-image', 'url("./images/planet' + random(1, 3) + '.png")');
      $("#app").append(planet);
      movePlanet(planet);
  }
  
  function movePlanet(planet) {
  
    let timerID = setInterval(function() {
      planet.css('top', planet.position().top + 3 + 'px');
      if (planet.position().top > $(window).height()) {
        clearInterval(timerID);
        planet.remove();
      }
    }, 100);
  }

  setInterval(createPlanet(), 5000);
  