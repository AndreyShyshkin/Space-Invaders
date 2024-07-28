let position = 0;
let bulletSpawn = 0;
let bulletBotom = 0;
let bulletSpeed = 20;
function positionStart(){
  position = $("#player1").offset().left;
}

$(document).on("keydown", function(event) {
    if (position >= 0){
        if (event.keyCode === 37 || event.keyCode === 65) {
            moveLeft();
        }}
    if (position <= ($(window).width() - ($("#player1").width()))){    
        if (event.keyCode === 39 || event.keyCode === 68) {
            moveRight();
        }
    }
    if (event.keyCode === 32) {
        shot();
    }
});

async function moveLeft() {
    position -= 40;
    $("#player1").css("left", position +"px")
}

async function moveRight() {
    position += 40;
    $("#player1").css("left", position + "px")
}

async function shot() {
  bulletSpawn = 0;
  if(selectedCosmolet == 0){
    bulletSpawn = -40;
    bulletSpeed = 20;
    bulletBotom = 100;
    playShot1()
    for (let i = 0; i < 3; i++){
    bulletSpawn += 50;
    let bullet = new Bullet();
    bullets.push(bullet);
    bullet.move();
    }
  }else if(selectedCosmolet == 1){
    bulletSpawn = -60;
    bulletSpeed = 40;
    bulletBotom = 100;
    playShot()
    for (let i = 0; i < 2; i++){
    bulletSpawn += 80;
    let bullet = new Bullet();
    bullets.push(bullet);
    bullet.move();
    }
  }else if(selectedCosmolet == 2){
    bulletSpawn = 60;
    bulletSpeed = 20;
    bulletBotom = 180;
    playShot2()
    for (let i = 0; i < 4; i++){
    let bullet = new Bullet();
    bullets.push(bullet);
    bullet.move();
    }
  }

  
}

let bullets = [];

function Bullet() {
    this.element = $("<div>").addClass("bullet");
    this.element.css("left", position + bulletSpawn + "px");
    this.element.css("bottom", bulletBotom + "px");
    $("#targetDiv").append(this.element);
    
    this.move = function() {
        let bullet = this;
        let timerID = setInterval(function() {
            
            isHit(bullet);

            if (bullet.element.offset().top < 0) {
                clearInterval(timerID);
                bullet.element.remove();
                bullets.splice(bullets.indexOf(bullet), 1);
            }
            bullet.element.offset({ top: bullet.element.offset().top - bulletSpeed });
        }, 100);
    };
}

function isHit(bullet) {
    if (bullet.element) {
      let asteroidElements = $('.asteroid').toArray();
      let enemies = $('.enemy').toArray();
  
      for (let i = 0; i < enemies.length; i++) {
        let enemy = $(enemies[i]);
  
        if (
          bullet.element.offset().top > enemy.offset().top &&
          bullet.element.offset().top < enemy.offset().top + enemy.height() &&
          bullet.element.offset().left > enemy.offset().left &&
          bullet.element.offset().left < enemy.offset().left + enemy.width()
        ) {
          hp -= 100;
          bullet.element.remove();
  
          if (hp === 0) {
            playBoom()
            score += 1;
            if (score % 10 === 0 && score !== 0) {
              $(".bonus").html("Speed +1")
              speedPlus += 1;
              setTimeout(function() {
                $(".bonus").html("")
              }, 2000);
            };
            $(".score").html(score);
            let BoomRand = random(0, 2)
            enemy.addClass("enemy-boom")
              if(BoomRand == 0){enemy.css("background-image", "url('images/boom.gif')");
              }else if (BoomRand == 1){enemy.css("background-image", "url('images/boom1.gif')");
              }else if (BoomRand == 2){enemy.css("background-image", "url('images/boom2.gif')");}
            enemy.removeClass("enemy");
            let spawnEnemy = random(1, 3)
            if(spawnEnemy == 1){
              switch (selectedLevel) {
                case 0:
                  hp = 100;
                  break;
                case 1:
                  hp = 300;
                  break;
                case 2:
                  hp = 500;
                  break;
              }
            }else if(enemies.length > 7){
              hp = 100;
            }else if(enemies.length > 0){
              for(let i = 0; (spawnEnemy - 1) >= i; i++){
                createEnemy();
              }
            }else if(enemies.length <= 0){
              createEnemy();
            }

            
            createAsteroid();
            createBoomAll();
            createHeal();
  
            setTimeout(function () {
              enemy.remove();
            }, 1100);
          }
          break;
        }
      }
  
      for (let i = 0; i < asteroidElements.length; i++) {
        let currentAsteroid = $(asteroidElements[i]);
        let asteroidImage = currentAsteroid.find(".asteroidimg");
  
        if (
          bullet.element.offset().top > currentAsteroid.offset().top &&
          bullet.element.offset().top < currentAsteroid.offset().top + currentAsteroid.height() &&
          bullet.element.offset().left > currentAsteroid.offset().left &&
          bullet.element.offset().left < currentAsteroid.offset().left + currentAsteroid.width()
        ) {
          bullet.element.remove();
          playBoom()
          score += 1;
          if (score % 10 === 0 && score !== 0) {
            $(".bonus").html("Speed +1")
            speedPlus += 1;
            setTimeout(function() {
              $(".bonus").html("")
            }, 2000);
          };
          $(".score").html(score);
          let BoomRand = random(0, 2)
          currentAsteroid.addClass("enemy-boom")
              if(BoomRand == 0){currentAsteroid.css("background-image", "url('images/boom.gif')");
              }else if (BoomRand == 1){currentAsteroid.css("background-image", "url('images/boom1.gif')");
              }else if (BoomRand == 2){currentAsteroid.css("background-image", "url('images/boom2.gif')");}
          asteroidImage.remove();
          currentAsteroid.removeClass("asteroid");
  
          setTimeout(function () {
            currentAsteroid.remove();
          }, 1100);
          break;
        }
      }
    }
  }
  
  
function hpPlayerLive(){
    if(hpPlayer == 300){
      $(".liveImg1").attr("src", "images/heart.png")
      $(".liveImg2").attr("src", "images/heart.png")
      $(".liveImg3").attr("src", "images/heart.png")
    }else if(hpPlayer == 200){
      $(".liveImg3").attr("src", "images/heart off.png")
    }else if(hpPlayer == 100){
      $(".liveImg2").attr("src", "images/heart off.png")
    }else if(hpPlayer == 0){
      $(".liveImg1").attr("src", "images/heart off.png")
    }
  }

  
function EndGame(){
  $(".endGame").css("display", "block");
  $("#player1").css("display", "none");

  $(".restart").on("click", function(){
    $(".endGame").css("display", "none");
    $(".startScreen").css("display", "block");
  })

  let asteroidElements = $('.asteroid').toArray();
  let enemies = $('.enemy').toArray();
  let heals = $('.heal').toArray();
  let boomAlls = $('.boomAll').toArray();


  for (let i = 0; i < enemies.length; i++) {
    let enemy = $(enemies[i]);
    enemy.remove();
  }

  for (let i = 0; i < asteroidElements.length; i++) {
    let currentAsteroid = $(asteroidElements[i]);
    currentAsteroid.remove();
  }

  for (let i = 0; i < heals.length; i++) {
    let currentHeal = $(heals[i]);
    currentHeal.remove();
  }

  for (let i = 0; i < boomAlls.length; i++) {
    let currentBoomAll = $(boomAlls[i]);
    currentBoomAll.remove();
  }
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
