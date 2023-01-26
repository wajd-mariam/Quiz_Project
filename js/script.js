/**
 * The script.js is the main Java Script file of the quiz game.
 * 
 * @author Wajd Mariam 
 * Version 1.0
 * Created on : 2021/01/24
 */

// Assigning elements to variables:
// Main Page Buttons (car, motorcycle):
var vehicleChoice = document.getElementById('vehicleButton');


// Event Listeners:
// Clicking on one of the choices of vehicles (Main Page):
// Calling function "startWebsite" to start:
vehicleChoice.addEventListener('click', startWebsite);



// Functions

// Initializing website:
function startWebsite() {
    // Running "assigningName" function to store inputted name to a variable:
    assigningName();
} 


// This function assigns name entered to a variable:
function assigningName() {
    // Assigning entered name input to variable for later usage:
    const nameUser = document.getElementById('nameTextBox').value;
    // Exporting item for later use:
    localStorage.setItem('userName', nameUser);
}