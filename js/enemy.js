function createEnemy() {
  switch (selectedLevel) {
    case 0:
      hp = 200;
      speed = 2;
      break;
    case 1:
      hp = 600;
      speed = 5;
      break;
    case 2:
      hp = 1000;
      speed = 7;
      break;
  }
  speed += speedPlus;

  let positionLeft = random(150, $(window).width() - 150);
  let enemySkinRand = random(1, 3);
  let enemy = $('<div class="enemy"></div>');
  enemy.css('left', positionLeft + 'px');
  enemy.css('top', '-150px');
  enemy.css('background-image', 'url(images/enemy' + enemySkinRand + '.png)');
  $("#app").append(enemy);
  moveEnemy(enemy);
}

function moveEnemy(enemy) {
  let timerID = setInterval(function () {
    enemy.css('top', enemy.position().top + speed + 'px');
    if (enemy.position().top > $(window).height()) {
      clearInterval(timerID);
      enemy.remove();
      hpPlayer = hpPlayer - 100;
      hpPlayerLive();
      if (hpPlayer <= 0) {
        EndGame();
      } else {
        createEnemy();
      }
    }
    if (
      enemy.position().top > $("#player1").position().top - 50 &&
      enemy.position().top < $("#player1").position().top + 50 &&
      enemy.position().left > $("#player1").position().left - 50 &&
      enemy.position().left < $("#player1").position().left + 50
    ) {
      clearInterval(timerID);
      enemy.remove();
      hpPlayer = hpPlayer - 100;
      hpPlayerLive();
      if (hpPlayer <= 0) {
        EndGame();
      } else {
        createEnemy();
      }
    }
  }, 100);
}