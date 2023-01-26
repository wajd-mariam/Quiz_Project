/**
* The finalPageScript.js runs the final page after finishing quiz.
* 
* @author Wajd Mariam 
* Version 1.0
* Created on : 2021/01/27
*/


// Elements:

// Quiz page link:

// Getting "quizLink" link from the current quiz:
var quizLink = localStorage.getItem("quizPageLink");

// Username element from "script.js":
const userName = localStorage.getItem("userName");

// Score element from "signsTestScript.js":
const score1 = localStorage.getItem("score");

// Pass Container (Yellow Container):
const passContainer = document.getElementById("userPass");

// Fail Container (Red Container):
const failContainer = document.getElementById("userFail");

// Control buttons:
// "Redo Quiz" button:
const redoButton = document.getElementById("redoButton");
// "Main Menu" button:
const mainMenuButton = document.getElementById("mainMenuButton");
// "passMark" text:
const passMarkElement = document.getElementById("passMark");
// "passName" text:
const passNameElement = document.getElementById("passName");
// "failMark" text:
const failMarkElement = document.getElementById("failMark");
// "failName" text:
const failNameElement = document.getElementById("failName");

// Constants:
const MAX_QUESTIONS1 = 5;

// Calling function "calculatePercentage":
calculatePercentage();


// Functions: 

// This function calculates the final percentage and display it:
function calculatePercentage() {
    // Constants:
    let MAX_QUESTIONS1 = 5;
    
    // Converting "score" to an integer:
    var scoreInteger = parseInt(score1);
    
    // Calculating percentage:
    let finalPerecntage = Math.floor((scoreInteger / MAX_QUESTIONS1) * 100);
    
    // Converting "finalPerecntage" to an integer:
    var finalPerecntageInteger = parseInt(finalPerecntage);

    // Proceeding depending on the user's percentage score:
    // If user got 60% or higher (Answered 3 questions correctly):
    if (finalPerecntageInteger >= 60) {
        // User passed quiz:
        // Calling function "quizPassed" with "finalPerecntageInteger" as parameters to proceed:
        quizPassed(finalPerecntageInteger);
    } else {
        // User failed quiz:
        // Calling function "quizFailed" with "finalPerecntageInteger" as parameters to proceed:
        quizFailed(finalPerecntageInteger);
    }
}


// Function "quizPassed":
function quizPassed(percentage) {
    // Unhiding the "passContainer":
    passContainer.classList.remove("hide1");
    
    // Unhiding control buttons:
    // "Redo Button":
    redoButton.classList.remove("hide1");
    // "Main Menu":
    mainMenuButton.classList.remove("hide1");
    // Telling the user what they got:
    passMarkElement.innerHTML = "<p>" + `You got ${percentage}%!` + "</p>";
    passNameElement.innerHTML = "<p>" + `Way to go ${userName}!` + "</p>";
}


// Function "quizPassed":
function quizFailed(percentage1) {
    // Unhiding the "passContainer":
    failContainer.classList.remove("hide1");

    // Unhiding control buttons:
    // "Redo Button":
    redoButton.classList.remove("hide1");
    // "Main Menu":
    mainMenuButton.classList.remove("hide1");
    // Telling the user what they got:
    failMarkElement.innerHTML = "<p>" + `You only got ${percentage1}%` + "</p>";
    failNameElement.innerHTML = "<p>" + `You will get it next time ${userName}!` + "</p>";
}

// Function "referringPage" to reload the same quiz agains when "reload" button has been clicked:
function referringPage() {
    window.location = quizLink;
}