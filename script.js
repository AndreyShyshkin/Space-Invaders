let position = 0;
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

function moveLeft() {
    position -= 40;
    $("#player1").css("left", position +"px")
}

function moveRight() {
    position += 40;
    $("#player1").css("left", position + "px")
}

let bullets = [];

function Bullet() {
    this.element = $("<div>").addClass("bullet");
    this.element.css("left", position + 60 + "px");
    this.element.css("bottom", "180px");
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
            bullet.element.offset({ top: bullet.element.offset().top - 20 });
        }, 100);
    };
}

function shot() {
    playShot()
    let bullet = new Bullet();
    bullets.push(bullet);
    bullet.move();
    
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
            enemy.addClass("enemy-boom");
            enemy.removeClass("enemy");
            createEnemy();
            createAsteroid();
  
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
          currentAsteroid.addClass("enemy-boom");
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
      $(".liveImg1").attr("src", "./images/heart.png")
      $(".liveImg2").attr("src", "./images/heart.png")
      $(".liveImg3").attr("src", "./images/heart.png")
    }else if(hpPlayer == 200){
      $(".liveImg3").attr("src", "./images/heart off.png")
    }else if(hpPlayer == 100){
      $(".liveImg2").attr("src", "./images/heart off.png")
    }else if(hpPlayer == 0){
      $(".liveImg1").attr("src", "./images/heart off.png")
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


  for (let i = 0; i < enemies.length; i++) {
    let enemy = $(enemies[i]);
    enemy.remove();
  }

  for (let i = 0; i < asteroidElements.length; i++) {
    let currentAsteroid = $(asteroidElements[i]);
    currentAsteroid.remove();
  }
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}