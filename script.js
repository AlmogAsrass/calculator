const display = document.querySelector('#display')
const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operators')
const result = document.querySelector('#equals')
const clear = document.querySelector('#clear')
const decimal = document.querySelector('#decimal')
const backspace = document.querySelector('#backspace')

let firstNum = 0
let secondNum = 0
let operation;
let displayValue = "";

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

function modulo(a, b) {
    return a % b;
}

function operate(operation, firstNum, secondNum) {
    return operation(firstNum, secondNum);
}

function getNumber(number) {
    if (displayValue.length > 12) return;
    if (typeof (number) === "string") {
        if (number === "." && displayValue.includes(".")) return
        else displayValue += number
    } else {
        displayValue += number.textContent;
    }
    display.textContent = displayValue;
    if (!operation) {
        firstNum = Number(displayValue);
    } else {
        secondNum = Number(displayValue);
    }
    decimal.disabled = false;
    if (displayValue.includes(".")) decimal.disabled = true;
}

numbers.forEach(number => {
    number.addEventListener('click', () =>
        getNumber(number))
})

function getOperator(operator) {
    displayValue = "";
    if (secondNum && operation) {
        display.textContent = operate(operation, firstNum, secondNum);
        firstNum = Number(display.textContent);
        secondNum = 0;
    }
    let text = operator.textContent;
    if ((text || operator) === "+") operation = add;
    if ((text || operator) === "-") operation = subtract;
    if ((text || operator) === "*") operation = multiply;
    if ((text || operator) === "/") operation = divide;
    if ((text || operator) === "%") operation = modulo;
}


operators.forEach(operator => {
    operator.addEventListener('click', () =>
        getOperator(operator))
})

function getResult() {
    if (operation == divide && secondNum == 0) {
        display.textContent = "Don't do that.";
    } else if (!operation || !secondNum) {
        display.textContent = firstNum;
    } else {
        display.textContent = operate(operation, firstNum, secondNum);
        firstNum = Number(display.textContent);
        secondNum = 0;
    }
}

result.addEventListener('click', () =>
    getResult()
)

function clearAll() {
    display.textContent = "0";
    firstNum = 0;
    secondNum = 0;
    operation = undefined;
    displayValue = "";
}

clear.addEventListener('click', () =>
    clearAll()
)

function erase() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1)
        display.textContent = displayValue;
    } else {
        display.textContent = "0";
        displayValue = "";
    } if (!operation) {
        firstNum = Number(display.textContent);
    } else secondNum = Number(display.textContent);
}

backspace.addEventListener('click', () =>
    erase()
)

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 || e.key === ".") {
        getNumber(e.key)
    }
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" || e.key === "%") {
        getOperator(e.key)
    }
    if (e.key === "Enter" || e.key === "=") {
        getResult()
    }
    if (e.key === "Delete") {
        clearAll()
    }
    if (e.key === "Backspace") {
        erase()
    }
})