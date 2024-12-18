let score = 0;
let currentQuestion = 0;

const questions = [
    { question: "5 + 3", answer: 8, options: [6, 8, 9, 7] },
    { question: "12 - 4", answer: 8, options: [10, 8, 5, 6] },
    { question: "7 + 9", answer: 16, options: [14, 16, 12, 10] },
    { question: "15 - 7", answer: 8, options: [7, 9, 8, 6] },
    { question: "9 + 6", answer: 15, options: [12, 15, 14, 16] }
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
    const selectedAnswer = parseInt(selectedOption.textContent);
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
