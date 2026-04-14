const wordList = ["makan", "tidur", "lari", "coding", "server", "data", "web", "program", "logic", "sistem", "digital", "internet", "cepat", "ketik", "belajar", "komputer", "laptop", "mouse", "keyboard", "layar", "koneksi", "aplikasi", "database", "admin", "hosting", "cloud"];

let words = [];
let currentWordIndex = 0;
let timeLeft = 60;
let timerStarted = false;
let interval = null;
let stats = { correct: 0, wrong: 0, totalChars: 0 };

const wordSection = document.getElementById('word-section');
const wordInput = document.getElementById('word-input');
const timerDisplay = document.getElementById('timer');
const resultBoard = document.getElementById('result-board');

function initGame() {
    words = [...wordList].sort(() => Math.random() - 0.5).slice(0, 50);
    renderWords();
    currentWordIndex = 0;
    timeLeft = 60;
    timerStarted = false;
    stats = { correct: 0, wrong: 0, totalChars: 0 };
    wordInput.value = '';
    wordInput.disabled = false;
    timerDisplay.innerText = timeLeft;
    resultBoard.classList.add('hidden');
}

function renderWords() {
    wordSection.innerHTML = words.map((w, i) => `<span class="word" id="word-${i}">${w}</span>`).join('');
    document.getElementById(`word-0`).classList.add('current-word');
}

wordInput.addEventListener('input', (e) => {
    if (!timerStarted) startTimer();
    
    const inputVal = wordInput.value;

    // Jika user menekan Space
    if (inputVal.endsWith(' ')) {
        const typedWord = inputVal.trim();
        const targetWord = words[currentWordIndex];
        const wordEl = document.getElementById(`word-${currentWordIndex}`);

        if (typedWord === targetWord) {
            wordEl.classList.add('correct');
            stats.correct++;
            stats.totalChars += targetWord.length;
        } else {
            wordEl.classList.add('wrong');
            stats.wrong++;
        }

        wordEl.classList.remove('current-word');
        currentWordIndex++;
        
        if (document.getElementById(`word-${currentWordIndex}`)) {
            document.getElementById(`word-${currentWordIndex}`).classList.add('current-word');
        }
        
        wordInput.value = ''; // Kosongkan input
    }
});

function startTimer() {
    timerStarted = true;
    interval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft === 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    wordInput.disabled = true;
    
    const wpm = Math.round((stats.totalChars / 5) / 1);
    const acc = Math.round((stats.correct / (stats.correct + stats.wrong)) * 100) || 0;

    document.getElementById('res-wpm').innerText = wpm;
    document.getElementById('res-acc').innerText = acc;
    document.getElementById('res-correct').innerText = stats.correct;
    document.getElementById('res-wrong').innerText = stats.wrong;
    resultBoard.classList.remove('hidden');
}

document.getElementById('reset-btn').addEventListener('click', initGame);

initGame();
