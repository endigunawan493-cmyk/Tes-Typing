document.addEventListener('DOMContentLoaded', () => {
    const wordList = ["makan", "tidur", "lari", "coding", "server", "data", "web", "program", "logic", "sistem", "digital", "internet", "cepat", "ketik", "belajar", "komputer", "laptop", "mouse", "keyboard", "layar", "koneksi", "aplikasi", "database", "admin", "hosting", "cloud", "teknologi", "modern", "futuristik", "cyber", "kecepatan", "akurasi", "prestasi", "pengembang", "software", "hardware"];

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
    const resetBtn = document.getElementById('reset-btn');

    function initGame() {
        // Acak kata
        words = [...wordList].sort(() => Math.random() - 0.5).slice(0, 40);
        renderWords();
        
        // Reset Variabel
        currentWordIndex = 0;
        timeLeft = 60;
        timerStarted = false;
        stats = { correct: 0, wrong: 0, totalChars: 0 };
        
        // UI Reset
        clearInterval(interval);
        wordInput.value = '';
        wordInput.disabled = false;
        wordInput.focus();
        timerDisplay.innerText = timeLeft;
        resultBoard.classList.add('hidden');
    }

    function renderWords() {
        wordSection.innerHTML = words.map((w, i) => `<span class="word" id="word-${i}">${w}</span>`).join('');
        const firstWord = document.getElementById('word-0');
        if(firstWord) firstWord.classList.add('current-word');
    }

    wordInput.addEventListener('input', () => {
        if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
        
        const inputVal = wordInput.value;

        // Logika saat tekan Spasi
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
            
            const nextWord = document.getElementById(`word-${currentWordIndex}`);
            if (nextWord) {
                nextWord.classList.add('current-word');
            }
            
            wordInput.value = ''; 
        }
    });

    function startTimer() {
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
        const totalAttempts = stats.correct + stats.wrong;
        const acc = totalAttempts > 0 ? Math.round((stats.correct / totalAttempts) * 100) : 0;

        document.getElementById('res-wpm').innerText = wpm;
        document.getElementById('res-acc').innerText = acc + "%";
        document.getElementById('res-correct').innerText = stats.correct;
        document.getElementById('res-wrong').innerText = stats.wrong;
        
        resultBoard.classList.remove('hidden');
    }

    resetBtn.addEventListener('click', initGame);

    // Jalankan pertama kali
    initGame();
});
