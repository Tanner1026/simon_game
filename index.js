var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenColor);
    level++;
    $('h1').text("Level: " + level);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (currentLevel === (gamePattern.length - 1)){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200
        );
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver()
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = []
    userClickedPattern = []
}

$(".btn").on("click", function(){
    var userColor = this.id;
    userClickedPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userClickedPattern.length - 1)
})

$(document).keypress(function(){
    nextSequence();
    $('h1').text("Level: " + level);
})

