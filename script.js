let firstNum = 0
let secondNum = 0
let operation;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, firstNum, secondNum) {
    return operation(firstNum, secondNum);
}

const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operators')
const result = document.querySelector('#equals')
const clear = document.querySelector('#clear')
const decimal = document.querySelector('#decimal')
const backspace = document.querySelector('#backspace')
let displayValue = "";

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (displayValue.includes(".")) {
            decimal.disabled = true;
        } else { decimal.disabled = false }
        if (!operation) {
            displayValue += number.textContent;
            display.textContent = displayValue;
            firstNum = Number(displayValue);
        } else {
            displayValue += number.textContent;
            display.textContent = displayValue;
            secondNum = Number(displayValue);
        }
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        displayValue = "";
        if (secondNum && operation) {
            display.textContent = operate(operation, firstNum, secondNum);
            firstNum = Number(display.textContent);
            secondNum = 0;
        }
        if (operator.textContent === "+") {
            operation = add
        } else if (operator.textContent === "-") {
            operation = subtract
        } else if (operator.textContent === "*") {
            operation = multiply
        } else if (operator.textContent === "/") {
            operation = divide
        }
    })
})

result.addEventListener('click', () => {
    if (operation == divide && secondNum == 0) {
        display.textContent = "Don't do that.";
    } else if (!operation || !secondNum) {
        display.textContent = firstNum;
    } else {
        display.textContent = operate(operation, firstNum, secondNum);
        firstNum = Number(display.textContent);
        secondNum = 0;
    }
})

clear.addEventListener('click', () => {
    display.textContent = "0";
    firstNum = 0;
    secondNum = 0;
    operation = undefined;
    displayValue = "";
})

backspace.addEventListener('click', () => {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1)
        display.textContent = displayValue;
    } else {
        display.textContent = "0";
        displayValue = "";
    } if (!operation || !secondNum) {
        firstNum = Number(display.textContent);
    } else secondNum = Number(display.textContent);
})
