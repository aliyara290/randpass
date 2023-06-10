const increment = document.getElementById('increment')
const decrement = document.getElementById('decrement');
const lengthText = document.getElementById('pass-length');
const upperCaseEl = document.getElementById('uppercase');
const lowerCaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generate = document.getElementById('generate-btn');
const resultEl = document.getElementById('final-result');
const passSituation = document.getElementById('pass-situation');
const clipboard = document.getElementById('clipboard');

// this is for copy btn 

clipboard.addEventListener("click", ()=> {
    navigator.clipboard.writeText(resultEl.innerHTML);
    document.getElementById("copied").style.display = `block `;
    document.getElementById("copied").style.top = `-55%`;
});

// this is for btns length
let lengthValue = 12;
increment.addEventListener('click', () => {
    if (lengthValue < 25) {
        lengthValue++;
        lengthText.innerText = lengthValue;
    }
})
decrement.addEventListener("click", () => {
    if (lengthValue > 0) {
        lengthValue--;
        lengthText.innerText = lengthValue;
    }
});

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumbers,
	symbol: getRandomSymbols
}


generate.addEventListener('click', () => {
	const length = lengthText.innerText;
	const hasLower = lowerCaseEl.checked;
	const hasUpper = upperCaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i< length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}


function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 9) + 48);
}

function getRandomSymbols() {
    const symbols = '!@#$%&{}[]/';
    return symbols[Math.floor(Math.random() * symbols.length)];
}



const cards = document.querySelectorAll('.faq-card');
cards.forEach((card) => {
    const cardHead = card.querySelector('h3');
    const showText = card.querySelector('.show-faq');
    const rotatImg = card.querySelector('.show-faq img');
    const showAnswer = card.querySelector('.answer')
    card.addEventListener('mouseenter', () => {
        cardHead.style.color = '#007bff';
        showText.style.backgroundColor = '#0054ad';
    });
    card.addEventListener('mouseleave', () => {
        cardHead.style.color = '#071d2b';
        showText.style.backgroundColor = '#007bff';
    });
    card.addEventListener('click', () => {
        rotatImg.classList.toggle('rotate-plus');
    });
    card.addEventListener('click', () => {
        showAnswer.classList.toggle('answer');
    });
});

