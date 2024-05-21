const screen = document.querySelector("#screen");
const clearButton = document.querySelector(".ac-button");
const sqrtButton = document.querySelector("[data-sqrt]");
const backSpace = document.querySelector(".backspace");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const decimalButton = document.querySelector("[data-decimal]");
const equalButton = document.querySelector("[data-equal]");

// Declaring variables
let currentOperand = "";
let previousOperand = "";
let operator = "";
let result;

// AC button
clearButton.addEventListener("click", () => {
  currentOperand = "";
  previousOperand = "";
  operator = "";
  screen.value = "";
  result = undefined;
});

// Backspace button
backSpace.addEventListener("click", () => {
  if (currentOperand == result) return;
  else if (currentOperand !== "" && previousOperand !== currentOperand) {
    currentOperand = currentOperand.toString().slice(0, -1);
    screen.value = previousOperand + operator + currentOperand;
  } else {
    operator = operator.toString().slice(0, -1);
    currentOperand = previousOperand;
    screen.value = previousOperand;
  }
});

numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumbers);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperators);
});

// Square root button
sqrtButton.addEventListener("click", () => {
  if (currentOperand !== "" && currentOperand >= 0) {
    result = Math.sqrt(currentOperand);
    screen.value = result;
    currentOperand = result.toString();
  }
});

// Decimal button
decimalButton.addEventListener("click", () => {
  if (!currentOperand.includes(".")) {
    currentOperand += ".";
    screen.value = currentOperand;
  }
});

equalButton.addEventListener("click", operate);

// Handling numbers
function handleNumbers(e) {
  screen.value += e.target.textContent;
  currentOperand += e.target.textContent;
}

// Handling operators
function handleOperators(e) {
  if (currentOperand !== "") {
    previousOperand = currentOperand;
    currentOperand = "";
    operator = e.target.textContent;
    screen.value += operator;
  }
}

// Calculation
function operate() {
  if (currentOperand !== "" && previousOperand !== "") {
    currentOperand = Number(currentOperand);
    previousOperand = Number(previousOperand);

    switch (operator) {
      case "+":
        add(previousOperand, currentOperand);
        break;
      case "-":
        subtract(previousOperand, currentOperand);
        break;
      case "×":
        multiply(previousOperand, currentOperand);
        break;
      case "÷":
        divide(previousOperand, currentOperand);
    }

    currentOperand = result.toString();
  }
}

function add(previousOperand, currentOperand) {
  result = previousOperand + currentOperand;
  screen.value = result;
}

function subtract(previousOperand, currentOperand) {
  result = previousOperand - currentOperand;
  screen.value = result;
}

function multiply(previousOperand, currentOperand) {
  result = previousOperand * currentOperand;
  screen.value = result;
}

function divide(previousOperand, currentOperand) {
  if (currentOperand === 0) screen.value = "Ignored!";
  else {
    result = previousOperand / currentOperand;
    screen.value = result;
  }
}
