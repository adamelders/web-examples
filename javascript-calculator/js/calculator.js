/*global document, window, $ */

"use strict";

(function() {
  
  // Set a global variable so we can properly calculate later.
  window.userEnteredInputValue = false;
  
  // Set a global variable to keep track of operator input.
  // This is so we can reset the input after the user adds an operator,
  // otherwise, they will just keep typing on the same input.
  window.userEnteredOperator = false;
  
  // Set a global variable to keep track of the decimal key.
  window.userEnteredDecimal = false;
  
  // Adde event listeners for click events.
  document.getElementById("clearLastButton").addEventListener("click", clearLastButton);
  document.getElementById("clearAllButton").addEventListener("click", clearAllButton);
  document.getElementById("backspaceButton").addEventListener("click", backspaceButton);
  document.getElementById("divideButton").addEventListener("click", divideButton);
  
  document.getElementById("sevenButton").addEventListener("click", sevenButton);
  document.getElementById("eightButton").addEventListener("click", eightButton);
  document.getElementById("nineButton").addEventListener("click", nineButton);
  document.getElementById("multiplyButton").addEventListener("click", multiplyButton());
  
  document.getElementById("fourButton").addEventListener("click", fourButton);
  document.getElementById("fiveButton").addEventListener("click", fiveButton);
  document.getElementById("sixButton").addEventListener("click", sixButton);
  document.getElementById("subtractButton").addEventListener("click", subtractButton);
  
  document.getElementById("oneButton").addEventListener("click", oneButton);
  document.getElementById("twoButton").addEventListener("click", twoButton);
  document.getElementById("threeButton").addEventListener("click", threeButton);
  document.getElementById("addButton").addEventListener("click", addButton);
  
  document.getElementById("negativeButton").addEventListener("click", negativeButton);
  document.getElementById("zeroButton").addEventListener("click", zeroButton);
  document.getElementById("decimalButton").addEventListener("click", decimalButton);
  document.getElementById("equalsButton").addEventListener("click", equalsButton);
  
})();

// Define functions for button/keypresses.

function zeroButton() {
  addNumberToInput(0);
}

function oneButton() {
  addNumberToInput(1);
}

function twoButton() {
  addNumberToInput(2);
}

function threeButton() {
  addNumberToInput(3);
}

function fourButton() {
  addNumberToInput(4);
}

function fiveButton() {
  addNumberToInput(5);
}

function sixButton() {
  addNumberToInput(6);
}

function sevenButton() {
  addNumberToInput(7);
}

function eightButton() {
  addNumberToInput(8);
}

function nineButton() {
  addNumberToInput(9);
}

// Define a function for the "CE" button.
function clearLastButton() {
  
  // Only reset the input text.
  document.getElementById("inputOutputText").value = 0;
  
  // Reset global variables.
  window.userEnteredDecimal = false;
  window.userEnteredInputValue = false;
  window.userEnteredOperator = false;
}

// Define a function for the "C" button.
function clearAllButton() {
  
  // Reset the input text and expression text.
  document.getElementById("inputOutputText").value = 0;
  document.getElementById("expressionText").value = "";
  
  // Reset global variables.
  window.userEnteredDecimal = false;
  window.userEnteredInputValue = false;
  window.userEnteredOperator = false;
}

// Define a function for the "BACK" button.
function backspaceButton() {
  
  // Get the input text.
  var inputText = document.getElementById("inputOutputText").value;
  
  // If the text is not default (0), remove the last character.
  // If the last character removed leaves the text blank, replace with a zero.
  if (inputText != 0)
    inputText = inputText.slice(0, -1);
  
  if (inputText === "")
    inputText = 0;
  
  // Set the new input text.
  document.getElementById("inputOutputText").value = inputText;
}

// Define functions for the operator buttons.
function divideButton() {
  
}

function multiplyButton() {
  
}

function subtractButton() {
  
}

function addButton() {
  
  // Get the input and current expression text.
  var inputText = document.getElementById("inputOutputText").value;
  var expressionText = document.getElementById("expressionText").value;
  
  // Set the user operator global.
  window.userEnteredOperator = true;
  
  // If the value is not 0, add the input text and operator to the expression text.
  if (inputText != 0) {
    expressionText += inputText + " + ";
    document.getElementById("expressionText").value = expressionText;
    
    // Reset input text.
    document.getElementById("inputOutputText").value = 0;
    
    // Calculate total.
    calculate();
  }
}

// Functions for the "=", "+/-", and "." buttons.
function equalsButton() {
  calculate(true);
}

function negativeButton() {
  
}

function decimalButton() {
  
  // If the input is currently 0, do not add a decimal until after the second number.
  var inputText = getInputOutputValue();
  if (inputText != 0) {
    
    // If the first button pressed after an operator is decimal, do not add the
    // current input to the new decimal.
    if (window.userEnteredOperator)
      window.userEnteredDecimal = true;
    else {
      inputText += ".";
      setInputOutputValue(inputText);
    }
  }
  else {
    // Set the global variable to say we've pressed the decimal button.
    // This is used when the next number is entered, so we add a decimal first.
    window.userEnteredDecimal = true;
  }
}

// Function to add the number key pressed into the input/output text box.
function addNumberToInput(numberToAdd) {
  
  // Reset input data first if the user has recently entered an operator.
  if (window.userEnteredOperator) {
    document.getElementById("inputOutputText").value = 0;
    window.userEnteredOperator = false;
  }
  
  // Get the current input text.
  var inputText = getInputOutputValue();
  
  // Add the number to the input.
  if (inputText == 0) {
    
    inputText = numberToAdd;
    
    // Add a preceding decimal if necessary.
    if (window.userEnteredDecimal) {
      inputText = "0." + inputText;
      window.userEnteredDecimal = false;
    }
  }
  else if (numberToAdd != 0)
    inputText += numberToAdd;
  else
    inputText = numberToAdd;
  
  // Set the new input text.
  setInputOutputValue(inputText);
  
  // Set the global variable to tell calculate() if the user has recently entered input.
  window.userEnteredInputValue = true;
}

function calculate(resetExpressionText) {
  
  // Get the input and expression text.
  var inputText = getInputOutputValue();
  var expressionText = getExpressionValue();
  
  // If user recently entered a value, add the input text to the expression text.
  if (window.userEnteredInputValue)
    expressionText += inputText;
  else {
    // Remove trailing operator from expression text.
    expressionText = removeTrailingOperator(expressionText);
  }
  
  // Evaluate the expression and print to input/output text.
  var total = eval(expressionText);
  setInputOutputValue(total);
  
  // Optionally reset the expression text (should only be set to true from the
  // equalsButton function).
  if (resetExpressionText) {
    setExpressionValue("");
    window.userEnteredOperator = true;
  }
}

// Functions to get or set the value of the input/output and expression text boxes.
function getInputOutputValue() {
  return document.getElementById("inputOutputText").value;
}
function getExpressionValue() {
  return document.getElementById("expressionText").value;
}

function setInputOutputValue(newValue) {
  document.getElementById("inputOutputText").value = newValue;
}
function setExpressionValue(newValue) {
  document.getElementById("expressionText").value = newValue;
}

function removeTrailingOperator(expressionText) {
  
  // Remove trailing operator (there should always be one).
  expressionText = expressionText.slice(0, -3);
  
  return expressionText;
}

// Use keypress event handlers for numbers and operators.
$(window).keypress(function(e) {
  var key = e.which || e.keyCode;
  switch (key) {
    case 48: // 0
      zeroButton();
      return false;
    case 49: // 1
      oneButton();
      return false;
    case 50: // 2
      twoButton();
      return false;
    case 51: // 3
      threeButton();
      return false;
    case 52: // 4
      fourButton();
      return false;
    case 53: // 5
      fiveButton();
      return false;
    case 54: // 6
      sixButton();
      return false;
    case 55: // 7
      sevenButton();
      return false;
    case 56: // 8
      eightButton();
      return false;
    case 57: // 9
      nineButton();
      return false;
    
    case 96: // numpad 0
      zeroButton();
      return false;
    case 97: // numpad 1
      oneButton();
      return false;
    case 98: // numpad 2
      twoButton();
      return false;
    case 99: // numpad 3
      threeButton();
      return false;
    case 100: // numpad 4
      fourButton();
      return false;
    case 101: // numpad 5
      fiveButton();
      return false;
    case 102: // numpad 6
      sixButton();
      return false;
    case 103: // numpad 7
      sevenButton();
      return false;
    case 104: // numpad 8
      eightButton();
      return false;
    case 105: // numpad 9
      nineButton();
      return false;
    
    case 106: // *
      multiplyButton();
      return false
    case 109: // -
      subtractButton();
      return false;
    case 111: // /
      divideButton();
      return false;
    
    default:
      return false;      
  }
});

// Use keydown event handler for the Backspace, Esc, Del, and operator keys.
// In Chrome, the keypress event will not trigger on these keys.
$(document).keydown(function(e) {
  switch(e.keyCode) {
    case 8: // Backspace
      backspaceButton();
      break;
    case 13: // Enter
      equalsButton();
      break;
    case 27: // Escape
      clearAllButton();
      break;
    case 46: // Delete
      clearLastButton();
      break;
    case 107: // +
      addButton();
      break;
    case 110: // .
      decimalButton();
      break;
    default:
      break;
  }
});
