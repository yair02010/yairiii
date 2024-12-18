let score = 0;
let currentQuestion = 0;

const questions = [
    { question: "מהו צבע השמיים?", answer: "כחול", options: ["כחול", "ירוק", "אדום", "צהוב"] },
    { question: "מהי בירת ישראל?", answer: "ירושלים", options: ["תל אביב", "ירושלים", "חיפה", "נתניה"] },
    { question: "מהו מספר הימים בשנה רגילה?", answer: "365", options: ["360", "365", "366", "350"] },
    { question: "איזה חלבון נמצא ביצים?", answer: "חלבון", options: ["חלבון", "שומן", "פחמימות", "סוכר"] },
    { question: "מהו צבע התפוח?", answer: "אדום", options: ["אדום", "ירוק", "צהוב", "כחול"] }
];

const questionElement = document.getElementById('question');
const options = document.querySelectorAll('.option-button');
const scoreElement = document.getElementById('score');
const nextQuestionButton = document.getElementById('next-question');

function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    options.forEach((button, index) => {
        button.textContent = q.options[index];
        button.disabled = false;
        button.style.backgroundColor = '';
    });
}

function checkAnswer(selectedOption) {
    const q = questions[currentQuestion];
    const selectedAnswer = selectedOption.textContent;
    if (selectedAnswer === q.answer) {
        score++;
        scoreElement.textContent = `ניקוד: ${score}`;
        selectedOption.style.backgroundColor = 'green';
    } else {
        selectedOption.style.backgroundColor = 'red';
    }

    options.forEach(button => {
        button.disabled = true;
    });
    nextQuestionButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        nextQuestionButton.style.display = 'none';
    } else {
        alert(`סיימת את המשחק! סיימת עם ${score} נקודות.`);
    }
}

options.forEach(option => {
    option.addEventListener('click', () => checkAnswer(option));
});

nextQuestionButton.addEventListener('click', nextQuestion);

loadQuestion();
