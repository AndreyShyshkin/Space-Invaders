$("#bg-audio")[0].volume=0.1;

let soundVolume = 0.5;

$(".soundMusic").on("click", function(){
    if ($("#bg-audio")[0].volume > 0){
        $("#bg-audio")[0].volume = 0;
        $("#soundMusicImg").attr("src", "/images/sound off.png");
    }else {
        $("#bg-audio")[0].volume = 0.1;
        $("#soundMusicImg").attr("src", "/images/sound on.png");
    }
}
)
$(".soundEffect").on("click", function(){     
    if (soundVolume > 0){
        soundVolume = 0;
        $("#soundEffectImg").attr("src", "/images/sound off.png");
    }else {
        soundVolume = 1;
        $("#soundEffectImg").attr("src", "/images/sound on.png");
    }
})



function playBoom() {
    let audio_boom = new Audio('/audio/boom.wav');

    audio_boom.volume = soundVolume;

    audio_boom.play();
}

function playShot() {
    let audio_shot = new Audio('/audio/shot.wav');

    audio_shot.volume = soundVolume;

    audio_shot.play();
}
