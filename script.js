const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accElement = document.getElementById('accuracy');
const startBtn = document.getElementById('start-btn');

const textToType = "Dunia digital terus berkembang dengan sangat cepat dan kita harus beradaptasi dengan teknologi terbaru.";

let timer = 0;
let interval = null;

startBtn.addEventListener('click', () => {
    // Reset Stats
    timer = 0;
    timerElement.innerText = 0;
    wpmElement.innerText = 0;
    accElement.innerText = 100;
    
    // Set Teks
    quoteDisplay.innerHTML = '';
    textToType.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });

    quoteInput.value = '';
    quoteInput.disabled = false;
    quoteInput.focus();
    
    clearInterval(interval);
    interval = setInterval(() => {
        timer++;
        timerElement.innerText = timer;
        updateWPM();
    }, 1000);
});

quoteInput.addEventListener('input', () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');
    let correctChars = 0;

    arrayQuote.forEach((span, index) => {
        const character = arrayValue[index];
        if (character == null) {
            span.classList.remove('correct', 'incorrect');
        } else if (character === span.innerText) {
            span.classList.add('correct');
            span.classList.remove('incorrect');
            correctChars++;
        } else {
            span.classList.remove('correct');
            span.classList.add('incorrect');
        }
    });

    // Hitung Akurasi
    if (arrayValue.length > 0) {
        let acc = Math.floor((correctChars / arrayValue.length) * 100);
        accElement.innerText = acc;
    }

    // Cek Selesai
    if (quoteInput.value === textToType) {
        clearInterval(interval);
        quoteInput.disabled = true;
        alert("Tes Selesai! Kamu luar biasa.");
    }
});

function updateWPM() {
    const charCount = quoteInput.value.length;
    if (timer > 0 && charCount > 0) {
        const wpm = Math.round((charCount / 5) / (timer / 60));
        wpmElement.innerText = wpm;
    }
}
