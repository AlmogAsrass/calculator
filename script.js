let firstNum;
let secondNum;
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
            secondNum = undefined;
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
        secondNum = undefined;
    }
})

clear.addEventListener('click', () => {
    display.textContent = "0";
    firstNum = undefined;
    secondNum = undefined;
    operation = undefined;
    displayValue = "";
})
