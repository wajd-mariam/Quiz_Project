/**
* The trafficQuizScript.js is a file that runs the Traffic Laws Quiz for both car and motorcycle.
* 
* @author Wajd Mariam
* Version 1.0
* Created on : 2021/01/24
*/


// Elements:

// Quiz page link:
const quizPageLink = document.getElementById("currentQuiz").textContent;
console.log(quizPageLink); //////DELETE LATER
// Title element:
const pageTitleElement = document.getElementById('title');
// Question container (Holds all questions, and choices):
const questionContainerElement = document.getElementById('question-container');
// Question Text:
const questionTextElement = document.getElementById("questions");
// Choices buttons:
const choices = Array.from(document.getElementsByClassName("choice-text"));
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
let trafficQuestions = [
    // First question:
    {
        question: "- How far should you leave between you and the vehicles ahead? ",
        choice1: "100 meters",
        choice2: "5 meters",
        choice3: "10 meters",
        choice4: "A safe distance",
        answer: 4,
        correction: '*You should always keep a safe distance between you and the vehicles ahead.'
    },

    // Second question:
    {
        question: "- Who is required to wear a seatbelt?",
        choice1: "Everyone in the vehicle.",
        choice2: "Driver only.",
        choice3: "Passenger beside the driver.",
        choice4: "No one is required to",
        answer: 1,
        correction: '*Everyone in the vehicle is required to wear a seatbelt for their safety.'
    },

    // Third question:
    {
        question: "- What sould you do when traffic light turns red?",
        choice1: "Stop.",
        choice2: "Pass cautiously.",
        choice3: "Speed up and pass quickly.",
        choice4: "None of the above.",
        answer: 1,
        correction: '*When traffic light turns red, you must stop!'
    },
    // Fourth question:
    {
        question: "- What devices are you allowed to use while driving?",
        choice1: "Cell phone.",
        choice2: "Laptop.",
        choice3: "All of the above.",
        choice4: "None of the above.",
        answer: 4,
        correction: "*You must not use any devices while driving unless it's a handsfree device"
    },
    // Fifth question:
    {
        question: "- What should you do if one of your tires blows up?",
        choice1: "Keep hands on steering wheel.",
        choice2: "Don't press break",
        choice3: "Start pressing brakes gently when car slows down.",
        choice4: "All of the above.",
        answer: 4,
        correction: '*When car tire blows up, keep hands on steering wheel, and only start applying breaks when it slows down.'
    },
    // Sixth Question:
    {
        question: "- What should you do when you see a Yield Sign?",
        choice1: "Give the right-of-way to other traffic and pedesterians.",
        choice2: "Stop fully.",
        choice3: "Ignore it",
        choice4: "None of the above.",
        answer: 1,
        correction: '*You should give the right-of-way to other traffic and pedesterians at Yield Signs.'
    },
    // Seventh question:
    {
        question: "- What sould you do when traffic light turns amber?",
        choice1: "Attempt to stop from a close distance.",
        choice2: "Speed up and pass quickly if you were distant.",
        choice3: "Stop if possible, else, pass cautiously.",
        choice4: "None of the above.",
        answer: 3,
        correction: '*When traffic light turns amber, you must stop if possible, else, pass cautiously!'
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
    availableQuestions = [...trafficQuestions];
    // Calling function "nextQuestion" to set next question in cue.
    getNewQuestion();
} 



// This function shuffles the questions from the arraylist, displays them,
// and makes further decisions for the quiz to flow.
function getNewQuestion() { 
    // If the question counter equals or is larger than MAX_QUESTION --> End quiz:
    if (questionCounter >= MAX_QUESTIONS)  {
        // Go to the final page.
        window.location="finalPage.html";
        // Importing score to "finalPage.js":
        localStorage.setItem('score', score);
        // Exporting link of the current quiz page to "finalSignsTest.js":
        localStorage.setItem('quizPageLink', quizPageLink);
    }

    // Incrementing question counter:
    questionCounter++;
    
    // Printing out current progress:
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    // Randomly selecting questions from "trafficQuestions" arraylist:
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
            
    // Creating a variable to hold all the data of one specific question:
    currentQuestion = availableQuestions[questionIndex];

    // Displaying the data from the arraylist:

    // Displaying question:
    questionTextElement.innerHTML = "<p>" + currentQuestion.question + "</p>";
    
    // Displaying choices:
    choices.forEach(choice => {
        // Getting the data-number of each choice:
        const number = choice.dataset["number"]; 
        // Matching data-number of choice with the matched choice number from database:
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
        console.log(classToApply); ////////////// DELETE LATER

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

        // Unhiding correction text class to show correct answer::
        correctionTextElement.classList.remove("hide1");

        // Entering a period of 2 seconds, where the user would be able to see if the chosen choice was
        // correct or not along with correction text. After it, the classes that's been applied to buttons
        // and correction text will be removed and hiden for the next question.
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            correctionTextElement.classList.add("hide1");
            getNewQuestion();
        }, 2000);
        
        console.log(questionCounter);////////////// DELETE LATER
        console.log(score);////////////// DELETE LATER
    });
});