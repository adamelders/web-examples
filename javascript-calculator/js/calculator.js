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
  
  // Set a global variable for the floating-point precision workaround
  // if the checkbox is checked.
  window.userCheckedWorkaround = false;
  if (document.getElementById("workaround").checked)
    window.userCheckedWorkaround = true;
  
  // Adde event listeners for click events.
  document.getElementById("clearLastButton").addEventListener("click", clearLastButton);
  document.getElementById("clearAllButton").addEventListener("click", clearAllButton);
  document.getElementById("backspaceButton").addEventListener("click", backspaceButton);
  document.getElementById("divideButton").addEventListener("click", divideButton);
  
  document.getElementById("sevenButton").addEventListener("click", sevenButton);
  document.getElementById("eightButton").addEventListener("click", eightButton);
  document.getElementById("nineButton").addEventListener("click", nineButton);
  document.getElementById("multiplyButton").addEventListener("click", multiplyButton);
  
  document.getElementById("fourButton").addEventListener("click", fourButton);
  document.getElementById("fiveButton").addEventListener("click", fiveButton);
  document.getElementById("sixButton").addEventListener("click", sixButton);
  document.getElementById("subtractButton").addEventListener("click", subtractButton);
  
  document.getElementById("oneButton").addEventListener("click", oneButton);
  document.getElementById("twoButton").addEventListener("click", twoButton);
  document.getElementById("threeButton").addEventListener("click", threeButton);
  document.getElementById("addButton").addEventListener("click", addButton);
  
  document.getElementById("negateButton").addEventListener("click", negateButton);
  document.getElementById("zeroButton").addEventListener("click", zeroButton);
  document.getElementById("decimalButton").addEventListener("click", decimalButton);
  document.getElementById("equalsButton").addEventListener("click", equalsButton);
  
  document.getElementById("workaround").addEventListener("change", toggleWorkaround);
  
})();


/* ============================== Number Keys ============================== */


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


/* ============================ Special Functions ============================ */


// Define a function for the "CE" button.
function clearLastButton() {
  
  // Only reset the input text.
  setInputOutputValue(0);
  
  // Reset global variables.
  window.userEnteredDecimal = false;
  window.userEnteredInputValue = false;
  window.userEnteredOperator = false;
}

// Define a function for the "C" button.
function clearAllButton() {
  
  // Reset the input text and expression text.
  setInputOutputValue(0);
  setExpressionValue("");
  
  // Reset global variables.
  window.userEnteredDecimal = false;
  window.userEnteredInputValue = false;
  window.userEnteredOperator = false;
}

// Define a function for the "BACK" button.
function backspaceButton() {
  
  // Get the input text.
  var inputText = getInputOutputValue();
  
  // If the text is not default (0), remove the last character.
  // If the last character removed leaves the text blank, replace with a zero.
  if (inputText != 0)
    inputText = inputText.slice(0, -1);
  
  if (inputText === "")
    inputText = 0;
  
  // Set the new input text.
  setInputOutputValue(inputText);
}

// Define a function for the "=" button.
function equalsButton() {
  calculate(true);
}

// Define a function for the "+/-" button.
function negateButton() {
  
  // Get input and expression values.
  var inputText = getInputOutputValue();
  
  // Negate the current input value. Do not negate if the user hasn't entered any input.
  if (inputText != 0 && window.userEnteredInputValue) {
    if (inputText.indexOf("-") >= 0)
      inputText = inputText.slice(1);
    else
      inputText = "-" + inputText;
  }
  
  // Set input text with negated value.
  setInputOutputValue(inputText);
    
}

// Define a function for the "." button.
function decimalButton() {
  
  // If the input is currently 0, do not add a decimal until after the second number.
  var inputText = getInputOutputValue();
  if (inputText != 0) {
    
    // If the first button pressed after an operator is decimal, do not add the
    // current input to the new decimal.
    // Still set userEnteredDecimal to true, in case the user wants to type ".2"
    // instead of "0.2".
    if (window.userEnteredOperator)
      window.userEnteredDecimal = true;
    
    // If a user has already entered a decimal, do not add another.
    else if (inputText.indexOf(".") < 0) {
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


/* ============================ Operator Functions ============================ */


// Enumeration to store values for operators.
var OperatorEnum = {
  DIVIDE: 0,
  MULTIPLY: 1,
  SUBTRACT: 2,
  ADD: 3,
  properties: {
    0: {name: "divide", operator: "/"},
    1: {name: "multiply", operator: "*"},
    2: {name: "subtract", operator: "-"},
    3: {name: "addition", operator: "+"}
  }
};

// Define functions for the operator buttons.

function divideButton() {
  var operatorEntered = OperatorEnum.DIVIDE;
  
  // If user has not recently entered an operator, add the input and operator to expression.
  if (!window.userEnteredOperator)
    addToExpression(operatorEntered);
  
  // If the user recently entered different operator, we need to change it.
  // Do not add the input again.
  else if (window.userOperatorValue != operatorEntered)
    replaceOperatorInExpression(operatorEntered);    
}

function multiplyButton() {
  var operatorEntered = OperatorEnum.MULTIPLY;
  
  // If user has not recently entered an operator, add the input and operator to expression.
  if (!window.userEnteredOperator)
    addToExpression(operatorEntered);
  
  // If the user recently entered different operator, we need to change it.
  // Do not add the input again.
  else if (window.userOperatorValue != operatorEntered)
    replaceOperatorInExpression(operatorEntered);    
}

function subtractButton() {
  var operatorEntered = OperatorEnum.SUBTRACT;
  
  // If user has not recently entered an operator, add the input and operator to expression.
  if (!window.userEnteredOperator)
    addToExpression(operatorEntered);
  
  // If the user recently entered different operator, we need to change it.
  // Do not add the input again.
  else if (window.userOperatorValue != operatorEntered)
    replaceOperatorInExpression(operatorEntered);    
}

function addButton() {
  var operatorEntered = OperatorEnum.ADD;
  
  // If user has not recently entered an operator, add the input and operator to expression.
  if (!window.userEnteredOperator)
    addToExpression(operatorEntered);
  
  // If the user recently entered different operator, we need to change it.
  // Do not add the input again.
  else if (window.userOperatorValue != operatorEntered)
    replaceOperatorInExpression(operatorEntered);    
}

/* ====================== Evaluation/Operation Functions ====================== */

// When the "use floating-point precision workaround" checkbox is 
// changed, toggle the workaround global variable.
function toggleWorkaround() {
  var isChecked = document.getElementById("workaround").checked;
  
  window.userCheckedWorkaround = isChecked;
}

// This function is designed to work around the floating-point precision error
// with JavaScript. Because JS has no Decimal type, you will get precision errors
// with certain fractions like 1/10 or 0.1, because a base 2 number system
// cannot describe these values "cleanly", and have repeating decimals.
// In this function, each number in the expression is multiplied by 10,
// then evaluated and divided by 10 in the calculate() function.
function floatingPointWorkaround(expressionText) {
  
  // We need to split the expression text into an array.
  var expressions = expressionText.split(" ");
  
  if (expressions.length > 0) {
    
    // We only want every other (even) array item, not the operators.
    for (var i = 0; i < expressions.length; i += 2) {
      expressions[i] *= 10;
    }
    
    // Rebuild the array.
    var returnExpressionText = expressions.join(" ");
    
    // Return the array.
    return returnExpressionText;
  }
  else
    return 0;
}

// Function to add a number key pressed into the input/output text box.
// If the user last pressed the decimal button, append the decimal before
// or after the input number, depending on if the input is 0.
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
  else
    inputText += numberToAdd;
  
  // Set the new input text.
  setInputOutputValue(inputText);
  
  // Set the global variable to tell calculate() if the user has recently entered input.
  window.userEnteredInputValue = true;
}

// Function to add/concat the current input value to the expression text.
// Takes the arithmetic operator as an argument.
function addToExpression(operator) {
  
  // Get the input and current expression text.
  var inputText = getInputOutputValue();
  var expressionText = getExpressionValue();
  
  // Set the user operator global to true, set value entered to false.
  // Set global operator value.
  window.userEnteredInputValue = false;
  window.userEnteredOperator = true;
  window.userOperatorValue = operator;
  
  // If the input value is not 0, add the input text and operator to the expression text.
  if (inputText != 0) {
    expressionText += inputText + " " + OperatorEnum.properties[operator].operator + " ";
    setExpressionValue(expressionText);
    
    // Reset input text. This is to prevent calculate() from re-using the input value.
    setInputOutputValue(0);
    
    // Calculate total.
    calculate();
  }
}

// Function to replace the last operator used in the expression text.
// Allows the user to change the last operator entered.
// For example, enter a number, press an operator, change your mind and press another operator.
function replaceOperatorInExpression(operator) {
  
  // Get the current expression, and remove the trailing operator.
  var expression = removeTrailingOperator(getExpressionValue());
  
  // Add the new operator to the expression.
  expression = expression + " " + OperatorEnum.properties[operator].operator + " ";
  setExpressionValue(expression);
  
  // Set global operator value.
  window.userOperatorValue = operator;
}

// Function to calculate the total from the expression text. Includes the input
// text if necessary.
function calculate(resetExpressionText) {
  
  // Get the input and expression text.
  var inputText = getInputOutputValue();
  var expressionText = getExpressionValue();
  
  // If user recently entered a value, add the input text to the expression text.
  if (window.userEnteredInputValue)
    expressionText += inputText;
  
  // Remove trailing operator from expression text.
  else
    expressionText = removeTrailingOperator(expressionText);
  
  // If the workaround is checked, use the workaround.
  var total;
  if (window.userCheckedWorkaround && !window.userEnteredOperator) {
    expressionText = floatingPointWorkaround(expressionText);
    total = eval(expressionText);
    total /= 10;
  }
  else
    // Evaluate the expression.
    total = eval(expressionText);
  
  // Write to output.
  setInputOutputValue(total);
  
  // Optionally reset the expression text (should only be set to true from the
  // equalsButton function).
  if (resetExpressionText) {
    setExpressionValue("");
    window.userEnteredOperator = true;
  }
}


/* ============================ Private Functions ============================ */


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

// Removes the trailing equation operator from the given expression text.
function removeTrailingOperator(expressionText) {
  
  // Remove trailing operator (there should always be one).
  expressionText = expressionText.slice(0, -3);
  
  return expressionText;
}

// Functions to add or remove a pseudo hover effect to buttons when keys are pressed.
function addHoverEffect(buttonId) {
  document.getElementById(buttonId).style.backgroundColor = "#c9c9c9";
  document.getElementById(buttonId).style.color = "black";
}
function removeHoverEffect(buttonId) {
  document.getElementById(buttonId).style.backgroundColor = "#555";
  document.getElementById(buttonId).style.color = "white";
}


/* ============================ Key Event Handlers ============================ */


// Use keydown event handlers for numbers and operators.
$(window).keydown(function(e) {
  var key = e.which || e.keyCode;
  switch (key) {
    case 48: // 0
      zeroButton();
      addHoverEffect("zeroButton");
      return false;
    case 49: // 1
      oneButton();
      addHoverEffect("oneButton");
      return false;
    case 50: // 2
      twoButton();
      addHoverEffect("twoButton");
      return false;
    case 51: // 3
      threeButton();
      addHoverEffect("threeButton");
      return false;
    case 52: // 4
      fourButton();
      addHoverEffect("fourButton");
      return false;
    case 53: // 5
      fiveButton();
      addHoverEffect("fiveButton");
      return false;
    case 54: // 6
      sixButton();
      addHoverEffect("sixButton");
      return false;
    case 55: // 7
      sevenButton();
      addHoverEffect("sevenButton");
      return false;
    case 56: // 8
      eightButton();
      addHoverEffect("eightButton");
      return false;
    case 57: // 9
      nineButton();
      addHoverEffect("nineButton");
      return false;
    
    case 96: // numpad 0
      zeroButton();
      addHoverEffect("zeroButton");
      return false;
    case 97: // numpad 1
      oneButton();
      addHoverEffect("oneButton");
      return false;
    case 98: // numpad 2
      twoButton();
      addHoverEffect("twoButton");
      return false;
    case 99: // numpad 3
      threeButton();
      addHoverEffect("threeButton");
      return false;
    case 100: // numpad 4
      fourButton();
      addHoverEffect("fourButton");
      return false;
    case 101: // numpad 5
      fiveButton();
      addHoverEffect("fiveButton");
      return false;
    case 102: // numpad 6
      sixButton();
      addHoverEffect("sixButton");
      return false;
    case 103: // numpad 7
      sevenButton();
      addHoverEffect("sevenButton");
      return false;
    case 104: // numpad 8
      eightButton();
      addHoverEffect("eightButton");
      return false;
    case 105: // numpad 9
      nineButton();
      addHoverEffect("nineButton");
      return false;
      
    case 8: // Backspace
      backspaceButton();
      addHoverEffect("backspaceButton");
      return false;
    case 13: // Enter
      equalsButton();
      addHoverEffect("equalsButton");
      return false;
    case 27: // Escape
      clearAllButton();
      addHoverEffect("clearAllButton");
      return false;
    case 46: // Delete
      clearLastButton();
      addHoverEffect("clearLastButton");
      return false;
    case 107: // +
      addButton();
      addHoverEffect("addButton");
      return false;
    case 110: // .
      decimalButton();
      addHoverEffect("decimalButton");
      return false;
    case 106: // *
      multiplyButton();
      addHoverEffect("multiplyButton");
      return false
    case 109: // -
      subtractButton();
      addHoverEffect("subtractButton");
      return false;
    case 111: // /
      divideButton();
      addHoverEffect("divideButton");
      return false;
    case 120: // F9
      negateButton();
      addHoverEffect("negateButton");
      return false;
    
    default:
      return false;      
  }
});

// Use keyup event handler to reset the button hover effect.
$(window).keyup(function(e) {
  var key = e.which || e.keyCode;
  switch (key) {
    case 48: // 0
      removeHoverEffect("zeroButton");
      return false;
    case 49: // 1
      removeHoverEffect("oneButton");
      return false;
    case 50: // 2
      removeHoverEffect("twoButton");
      return false;
    case 51: // 3
      removeHoverEffect("threeButton");
      return false;
    case 52: // 4
      removeHoverEffect("fourButton");
      return false;
    case 53: // 5
      removeHoverEffect("fiveButton");
      return false;
    case 54: // 6
      removeHoverEffect("sixButton");
      return false;
    case 55: // 7
      removeHoverEffect("sevenButton");
      return false;
    case 56: // 8
      removeHoverEffect("eightButton");
      return false;
    case 57: // 9
      removeHoverEffect("nineButton");
      return false;
    
    case 96: // numpad 0
      removeHoverEffect("zeroButton");
      return false;
    case 97: // numpad 1
      removeHoverEffect("oneButton");
      return false;
    case 98: // numpad 2
      removeHoverEffect("twoButton");
      return false;
    case 99: // numpad 3
      removeHoverEffect("threeButton");
      return false;
    case 100: // numpad 4
      removeHoverEffect("fourButton");
      return false;
    case 101: // numpad 5
      removeHoverEffect("fiveButton");
      return false;
    case 102: // numpad 6
      removeHoverEffect("sixButton");
      return false;
    case 103: // numpad 7
      removeHoverEffect("sevenButton");
      return false;
    case 104: // numpad 8
      removeHoverEffect("eightButton");
      return false;
    case 105: // numpad 9
      removeHoverEffect("nineButton");
      return false;
      
    case 8: // Backspace
      removeHoverEffect("backspaceButton");
      return false;
    case 13: // Enter
      removeHoverEffect("equalsButton");
      return false;
    case 27: // Escape
      removeHoverEffect("clearAllButton");
      return false;
    case 46: // Delete
      removeHoverEffect("clearLastButton");
      return false;
    case 107: // +
      removeHoverEffect("addButton");
      return false;
    case 110: // .
      removeHoverEffect("decimalButton");
      return false;
    case 106: // *
      removeHoverEffect("multiplyButton");
      return false
    case 109: // -
      removeHoverEffect("subtractButton");
      return false;
    case 111: // /
      removeHoverEffect("divideButton");
      return false;
    case 120: // F9
      removeHoverEffect("negateButton");
      return false;
    
    default:
      return false;      
  }
});
