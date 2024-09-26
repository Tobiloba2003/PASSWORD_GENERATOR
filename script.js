const passwordDisplay = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const strengthLabel = document.getElementById('strength-label');
const strengthBars = document.querySelectorAll('.bars div');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123, 126)
);

lengthSlider.addEventListener('input', syncCharacterAmount);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

function syncCharacterAmount(e) {
    const value = e.target.value;
    lengthValue.textContent = value;
}

function generatePassword() {
    const characterAmount = lengthSlider.value;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const charCodes = [];
    if (includeUppercase) charCodes.push(...UPPERCASE_CHAR_CODES);
    if (includeLowercase) charCodes.push(...LOWERCASE_CHAR_CODES);
    if (includeNumbers) charCodes.push(...NUMBER_CHAR_CODES);
    if (includeSymbols) charCodes.push(...SYMBOL_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }

    const password = passwordCharacters.join('');
    passwordDisplay.textContent = password;
    updateStrength(password);
}

function copyPassword() {
    const textarea = document.createElement('textarea');
    const password = passwordDisplay.textContent;
    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
}

function updateStrength(password) {
    let strength = 0;
    const regexes = [
        /[A-Z]/,
        /[a-z]/,
        /[0-9]/,
        /[^A-Za-z0-9]/
    ];

    regexes.forEach((regex) => {
        if (regex.test(password)) {
            strength++;
        }
    });

    strengthBars.forEach((bar, index) => {
        if (index < strength) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });

    const strengthLevels = ['WEAK', 'MEDIUM', 'STRONG', 'VERY STRONG'];
    strengthLabel.textContent = strengthLevels[strength - 1] || 'WEAK';
}

function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}