const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clean = document.querySelector('.clean');
const del = document.querySelector('.delete');
const total = document.querySelector('.total');
const previousScore = document.querySelector('.previous-operation');
const actualScore = document.querySelector('.actual-operation');

let actualOperation = '';
let operation = undefined;
let previousOperation = '';

const calculate = () => {
    let action;
    if(!previousOperation || !actualOperation) {
        return
    }

    const previous = parseFloat(previousOperation)
    const actual = parseFloat(actualOperation)

    if(isNaN(previous) || isNan(actual)){
        return
    }

    switch (operation) {
        case '+':
            action = previous + actual
            break
        case '-':
            action = previous - actual
            break
        case '×':
            action = previous * actual
            break 
        case '÷':
            if(actual === 0) {
                deleteScore()
                return 
            }
            action = previous / actual
            break
        case '^':
            action = Math.pow(previous, actual)
            break
        case '√':
            action = Math.pow(previous, 1 / actual)
            break
        case '%':
            action = previous / 100 * actual
            break
        case 'log':
            action = Math.log(previous) / Math.log(actual)
            break
        default:
            return
    }

    actualOperation = action
    operation = undefined
    previousOperation = ''
}

const chooseOperation = (operator) => {
    if(actualOperation === '') {
        return
    }
    if(previousOperation !== '') {
        const previous = previousOperation.innerText
        if(actualOperation.toString() === '0' && previous[previous.length - 1] === '÷') {
            deleteScore()
            return
        }
        calculate()
    }

    operation = operator;
    previousOperation = actualOperation;
    actualOperation = '';
}

const addNumber = (numb) => {
    if(numb === '.') {
        if(actualOperation.includes('.')) {
            return
        }
        numb = '.'
    }
    actualOperation = actualOperation.toString() + numb.toString();
}

const deleteNumber = () => {
    actualOperation = actualOperation.toString().slice(0, -1)
}

const updateScore = () => {
    actualScore.innerText = actualOperation;

    if(operation != null) {
     previousScore.innerText = previousOperation + operation
    } else {
        previousScore.innerText = ''
    }
    
 }

const deleteScore = () => {
    actualOperation = ''
    operation = undefined
    previousOperation = ''
    
}


numbers.forEach((numb) => {
    numb.addEventListener('click', () => {
        addNumber(numb.innerText);
        updateScore();
    })
})

del.addEventListener('click', () => {
    deleteNumber();
    updateScore();
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        chooseOperation(operator.innerText);
        updateScore();
    })
})

total.addEventListener('click', () => {
    calculate();
    updateScore();
})

clean.addEventListener('click', () => {
    deleteScore();
    updateScore();
})