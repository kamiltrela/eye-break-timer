/**
 * Eye Break Timer written in JavaScript
 * @author Kamil Trela, 2021
 */

var timerMinutes = 20; //Variable to keep track of minutes remaining
var timerSeconds = 0; //Variable to keep track of seconds remaining
var intervalID = 0; //Variable to store setInterval ID for work timer
var breakIntervalID = 0; //Variable to store setInterval ID for break timer
var timerBreak = 20; //Variable to keep track of seconds remaining for break
var runningTimer = "work"; //Variable to keep track of which timer is running
var muted = false; //Toggle-able variable to keep track if sound effect is muted

/**
 * This function is invoked when the "Start" button is pressed. It will call
 * either the work timer or the break timer depending on which one was running
 * when the timer was paused. The application defaults to the work timer on 
 * page load.
 */
function startButton(){
    //clearInterval for work and break timer in case they are running
    clearInterval(intervalID);
    clearInterval(breakIntervalID);

    if (runningTimer == "work") {
        workTimer();
    } 
    else if (runningTimer == "break") {
        breakTimer();
    }
}

/**
 * This function has a setInterval that executes once per second.
 * Once per second the HTML element displaying the time is updated and the 
 * timerSeconds variable is reduced by one. Once the timerSeconds variable 
 * reaches zero, timerMinutes variable is reduced by one until both 
 * timer variables reach zero.
 */
function workTimer(){
    //Bold "Start" button text
    boldSelectedButton("start");

    /**
     * Runs once per second. Each second subtract one from seconds variable, 
     * when seconds variable reaches 0, subtract one from minute variable and
     * put seconds back to 59.
     * Update HTML each second with new timer to show remaining time to user.
     */
    intervalID = setInterval(() => {
        if (timerSeconds == 0) {
            timerMinutes--;
            timerSeconds = 59;
        }
        
        if (timerMinutes < 10) {
            if (timerSeconds < 10) {
                document.getElementById("timer").innerHTML = "Work Timer: 0" + timerMinutes + ":" + "0" + timerSeconds; 
            } else {
                document.getElementById("timer").innerHTML = "Work Timer: 0" + timerMinutes + ":" + timerSeconds;
            }
            
        } else {
            if (timerSeconds < 10) {
                document.getElementById("timer").innerHTML = "Work Timer: " + timerMinutes + ":" + "0" + timerSeconds; 
            } else {
                document.getElementById("timer").innerHTML = "Work Timer: " + timerMinutes + ":" + timerSeconds;
            }
        } 

        timerSeconds--;

        /**
         * When timer reaches 0 minutes and 0 seconds, clear this interval and
         * play the beep sound 3x. Then start the breakTimer function
         */
        if (timerMinutes == 0 && timerSeconds == 0) {
            clearInterval(intervalID);
            
            setTimeout(() => {
                playSoundEffect();
            }, 100);

            setTimeout(() => {
                playSoundEffect();
            }, 1800); 

            setTimeout(() => {
                playSoundEffect();
            }, 1000);

            setTimeout(() => {
                breakTimer();
            }, 3000);
        }
    }, 1000); 
}


/**
 * This function performs clearInterval on the work timer if it is running,
 * allowing the user to pause and continue the work timer as needed.
 */
function pauseTimer(){
    //Clear the workTimer setInterval function if it is running
    clearInterval(intervalID);

    //Clear the breakTimer, break timer is reset and cannot be unpaused
    clearInterval(breakIntervalID);

    //Styling to make pressed button bold and other appear normal
    boldSelectedButton("pause");
}

/**
 * This function clears any running timers and resets the HTML to "20:00" and 
 * timer variables back to 20 minutes and 0 seconds
 */
function resetTimer(){
    //clearInterval for work and break timer in case they are running
    clearInterval(intervalID);
    clearInterval(breakIntervalID);

    //Set runningTimer to "work" and work timer variables to 20 minutes
    runningTimer = "work";
    timerMinutes = 20;
    timerSeconds = 0;

    //Reset break timer variable
    timerBreak = 20;

    //Set HTML back to 20 minute work timer
    document.getElementById("timer").innerHTML = "Work Timer: 20:00";

    //Bold reset button text
    boldSelectedButton("reset");
}

/**
 * This function starts or resumes the break timer. Functionality is the same 
 * as the work timer.
 */
function breakTimer(){
    runningTimer = "break";
     
    breakIntervalID = setInterval(() => {
        if (timerBreak < 10) {
            document.getElementById("timer").innerHTML = "Time for a break! \n\n" + "0:0" + timerBreak;
        } else {
            document.getElementById("timer").innerHTML = "Time for a break! \n\n" + "0:" + timerBreak;
        }

        if (timerBreak < 0) {
            var reworkTimer = 5;
            
            document.getElementById("timer").innerHTML = "Break is over! Please reset the timer";

            setTimeout(() => {
                playSoundEffect();
            }, 200);

            clearInterval(breakIntervalID);            
        }

        timerBreak--;
    }, 1000);
}

/**
 * This function displays a pop-up when the credits button is clicked.
 */
function showCredits(){
    var myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
}

/**
 * This function first sets each button text to normal font weight, then
 * makes the element ID entered as an input parameter bold
 * @param {string} option 
 */
function boldSelectedButton(option){
    document.getElementById("reset").style.fontWeight = "normal";
    document.getElementById("pause").style.fontWeight = "normal";
    document.getElementById("start").style.fontWeight = "normal";
    document.getElementById(option).style.fontWeight = "bolder";
}

/**
 * This function uses Howler.js to play sound the beeping sound effect.
 */
function playSoundEffect(){
    //Create a new sound variable with source as our beep mp3 file
    var sound = new Howl({
        src: ['sounds/beep-beep.mp3']
        });
        
    var id1; //Variable to store sound ID
    

    if (muted) {
        //intentionally left blank
        //If muted is true, sound is not played
    } else {
        id1 = sound.play(); //Play sound and store sound ID
    } 
    
    sound.rate(0.7, id1); //Reduce the pitch of the sound played

    //Pausing after 1000ms keeps the sound effects from overlapping with each other
    setTimeout(function() {
        sound.pause();
      }, 1000);
}

/**
 * This function allows the mute button to be toggled
 */
function muteSound(){
    if (muted) {
        muted = false;
        document.getElementById("mute").innerHTML = "Mute Sound";
    } else {
        muted = true;
        document.getElementById("mute").innerHTML = "Unmute Sound";
    }
}