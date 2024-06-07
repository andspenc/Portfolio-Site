
var gamePattern = [];

var userClickedPattern = [];
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

$(document).on("keydown", function() {
   
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }

    else {}
 })

function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// aduio for the selected color
    playSound(randomChosenColour);

    $("h1").text("level "+level);


   console.log(gamePattern);
}

$(".btn").click( function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern.length-1);

});


// Play sound function
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
        
    }

function checkAnswer(currentLevel) {
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success!");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
       
     }
     else {console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();

     }
}

function startOver() {
    level = 0;
    gamePattern=[];
    started = false;
}

