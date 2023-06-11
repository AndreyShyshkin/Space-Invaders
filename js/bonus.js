function createBoomAll() {
      let spawn = random(1, 50);
      if (spawn == 1) {
        let positionLeft = random(150, ($(window).width() - 150));
        let BoomAll = $('<div class="boomAll"><img class="BoomAllimg" src="images/boomALL.png" alt="BoomAllimg"></div>');
        BoomAll.css('left', positionLeft + 'px');
        BoomAll.css('top', '-150px');
        $("#app").append(BoomAll);
        moveBoomAll(BoomAll);
      }
    }
    
    function moveBoomAll(BoomAll) {
    
      let timerID = setInterval(function() {
        BoomAll.css('top', BoomAll.position().top + 10 + 'px');
        if (BoomAll.position().top > $(window).height()) {
          clearInterval(timerID);
          BoomAll.remove();
        }
        if (
          BoomAll.position().top > $("#player1").position().top - 50 &&
          BoomAll.position().top < $("#player1").position().top + 50 &&
          BoomAll.position().left > $("#player1").position().left - 50 &&
          BoomAll.position().left < $("#player1").position().left + 50
        ) {
        clearInterval(timerID);
          BoomAll.remove();
          let enemies = $('.enemy').toArray();
          for (let i = 0; i < enemies.length; i++) {
            let enemy = $(enemies[i]);
            playBoom()
            enemy.addClass("enemy-boom");
            enemy.removeClass("enemy");
            createEnemy();
            createAsteroid();
            score += 1;
            $(".score").html(score);
  
            setTimeout(function () {
              enemy.remove();
            }, 1100);
        }
        let asteroidElements = $('.asteroid').toArray();
        for (let i = 0; i < asteroidElements.length; i++) {
            let currentAsteroid = $(asteroidElements[i]);
            let asteroidImage = currentAsteroid.find(".asteroidimg");
            playBoom()
            currentAsteroid.addClass("enemy-boom");
            asteroidImage.remove();
            currentAsteroid.removeClass("asteroid");
            score += 1;
            $(".score").html(score);
    
            setTimeout(function () {
                currentAsteroid.remove();
            }, 1100);
      }
      }
      }, 100);
    }

    function createHeal() {
        let spawn = random(1, 50);
        if (spawn == 1) {
          let positionLeft = random(150, ($(window).width() - 150));
          let heal = $('<div class="heal"><img class="healimg" src="images/heal.png" alt="healimg"></div>');
          heal.css('left', positionLeft + 'px');
          heal.css('top', '-150px');
          $("#app").append(heal);
          moveheal(heal);
        }
      }
      
      function moveheal(heal) {
      
        let timerID = setInterval(function() {
          heal.css('top', heal.position().top + 10 + 'px');
          if (heal.position().top > $(window).height()) {
            clearInterval(timerID);
            heal.remove();
          }
          if (
            heal.position().top > $("#player1").position().top - 50 &&
            heal.position().top < $("#player1").position().top + 50 &&
            heal.position().left > $("#player1").position().left - 50 &&
            heal.position().left < $("#player1").position().left + 50
          ) {
          clearInterval(timerID);
            heal.remove();
            hpPlayer = 300;
            $(".liveImg1").attr("src", "images/heart.png")
            $(".liveImg2").attr("src", "images/heart.png")
            $(".liveImg3").attr("src", "images/heart.png")
              
        }
        }, 100);
      }
    