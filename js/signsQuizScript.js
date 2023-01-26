/**
* he signsQuizScript.js is a file that runs the Signs traffic Quiz for both car and motorcycle.
* 
* @author Wajd Mariam 
* Version 1.0
* Created on : 2021/01/24
*/

// Quiz page link:
const quizPageLink = document.getElementById("currentQuiz").textContent;
// Title element:
const pageTitleElement = document.getElementById("title");
// Question container (Holds all questions, choices, and images):
const questionContainerElement = document.getElementById('question-container');
// Question Text:
const questionTextElement = document.getElementById("questions");
// Choices buttons:
const choices = Array.from(document.getElementsByClassName("choice-text"));
// Image element:
const ImageSource = document.getElementById('image');
// Progress text:
const progressText = document.querySelector('#progressText');
// Control buttons used:
// "Start Quiz" button: 
const startButtonElement = document.getElementById('startButton');
// "Correction" text:
const correctionTextElement = document.getElementById('correction');

// Declaring used variables:
let acceptingAnswers = false;
let currentQuestion = {};
let questionCounter = 1;
let score = 0;
let availableQuestions = [];
let questionIndex = 0;

// Declaring used constants:
const MAX_QUESTIONS = 5;


// Arraylist of questions:
let signsQuestions = [
    // First question:
    {
        question: "- What does this sign mean?",
        imageSrc: "assets/noUTurnSign.png",
        choice1: "No right turn permitted.",
        choice2: "No left turn permitted.",
        choice3: "No U-turns allowed.",
        choice4: "Do not enter.",
        answer: 3,
        correction: '*This is a "No U-Turns Allowed" sign'
    },

    // Second question:
    {
        question: "- What does this sign mean?",
        imageSrc: "assets/schoolZone.png",
        choice1: "Hidden intersection ahead.",
        choice2: "Pedesterians crosses street here.",
        choice3: "School zone area",
        choice4: "Passing is not allowed",
        answer: 3,
        correction: '*This is a "School Zone Area" sign'
    },

    // Third question:
    {
        question: "- What does this sign mean?",
        imageSrc: "assets/stopSign.png",
        choice1: "Constructions site.",
        choice2: "Narrow road ahead.",
        choice3: "Hospital.",
        choice4: "Stop sign.",
        answer: 4,
        correction: '*This is a "Stop Sign" sign'
    },
    // Fourth question:
    {
        question: "- What does this sign mean?",
        imageSrc: "assets/speedLimit.png",
        choice1: "Airport.",
        choice2: "Speed limit is 55 KM/H.",
        choice3: "Speed limit will change up ahead.",
        choice4: "Minimum speed is 55 KM/H.",
        answer: 2,
        correction: '*This is a "Speed Limit is 55KM/H" sign'
    },
    // Fifth question:
    {
        question: "- What does this sign mean?",
        imageSrc: "assets/slipperyRoads.png",
        choice1: "No overtaking.",
        choice2: "Roads ahead are slippery.",
        choice3: "There's a round about ahead.",
        choice4: "Stop sign.",
        answer: 2,
        correction: '*This is a "Slippery Roads" sign'
    },
];


// Event Listeners:
// Clicking on "Start Quiz" to initiate the quiz app:
// Calling function "startQuiz" to start:
startButtonElement.addEventListener('click', startQuiz);


// Functions

// This function initializes quiz:
function startQuiz() {
    // Hiding Start Button and title after clicking on Start Button:
    startButtonElement.classList.add('hide1');
    pageTitleElement.classList.add('hide1');
    // Unhiding "Question Container" after clicking on Start Button:
    questionContainerElement.classList.remove('hide1');
    // Assigning variables to values:
    questionCounter = 0;
    score = 0;
    availableQuestions = [...signsQuestions];
    // Calling function "getNewQuestion" to set next a new question from arraylist:
    getNewQuestion();
} 


// This function shuffles the questions from the arraylist, displays them,
// and makes further decisions for the quiz to flow.
function getNewQuestion() { 
    // If the question counter equals or is larger than MAX_QUESTION --> End quiz:
    if (questionCounter >= MAX_QUESTIONS)  {
        // Go to the final page.
        window.location="finalPage.html";
        // Exporting score to "finalSignsTest.js":
        localStorage.setItem('score', score);
        // Exporting link of the current quiz page to "finalSignsTest.js":
        localStorage.setItem('quizPageLink', quizPageLink);
    }

    // Incrementing question counter:
    questionCounter++;

    // Printing out current progress:
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    // Randomly selecting questions from "signsQuestions" arraylist: 
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    // Creating a variable to hold all the data of one specific question:
    currentQuestion = availableQuestions[questionIndex];

    // Displaying the data from the arraylist:

    // Displaying question:
    questionTextElement.innerHTML = "<p>" + currentQuestion.question + "</p>";

    // Displaying image:
    ImageSource.innerHTML = "<img src=" + currentQuestion.imageSrc + " width='350' height='350'>";
    
    // Displaying choices:
    choices.forEach(choice => {
        // Getting the data-number of each choice:
        const number = choice.dataset["number"];
        // Matching data-number of choice with the matched choice from database:
        choice.innerText = currentQuestion["choice" + number];
    });

    // Splicing questions at current index to avoid using it again:
    availableQuestions.splice(questionIndex, 1);
    // Assigning "acceptingAnswers" to true so the program is ready to take in answer:
    acceptingAnswers = true;

}


// Adding event listeners to all choice buttons:
choices.forEach(choice => {
    // Adding event listeners to all choice buttons:
    choice.addEventListener("click", e => {
        // If program isn't accepting answers, return:
        if (!acceptingAnswers) return;

        // Setting "acceptingAnswers" to false:
        acceptingAnswers = false;

        // "selectedChoice" constant to refernce the choice that was clicked:
        const selectedChoice = e.target;

        // "selectedAnswer" constant to reference the choice that matches the data number of each:
        const selectedAnswer = selectedChoice.dataset["number"];

        // After matching the data number of button to "selcetedAnswer", now check if this data number 
        // matches the correct answer set for that specific question in the Arraylist:
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        // If statement to check if the choice clicked was either correct or incorrect:
        if (classToApply == "correct") {
            // Incrementing score:
            score ++;
            // Unhiding correction text class to show correct answer:
            correctionTextElement.classList.remove("hide1");
            // Coloring correction text green:
            correctionTextElement.classList.add("correctCorrection");
        } else {
            // Unhiding correction text class to show correct answer:
            correctionTextElement.classList.remove("hide1");
            // Coloring correction text red:
            correctionTextElement.classList.add("incorrectCorrection");
        }
        
        // Adding the class to the button (".correct" or ".incorrect")so it can be colored accordingly:
        selectedChoice.parentElement.classList.add(classToApply);

        // Displaying "correctionTextElement":
        correctionTextElement.innerHTML = "<p>" + currentQuestion.correction + "</p>";

        // Entering a period of 2 seconds, where the user would be able to see if the chosen choice was
        // correct or not along with correction text. After it, the classes that's been applied to buttons
        // and correction text will be removed and hiden for the next question.
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            correctionTextElement.classList.add("hide1");
            getNewQuestion();
        }, 2000);
    });
});