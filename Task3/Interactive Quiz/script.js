const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "What is the correct JavaScript syntax to change the content of an HTML element?",
        options: [
            "document.getElement('id').innerHTML = 'New Text'",
            "document.getElementById('id').innerHTML = 'New Text'",
            "#id.innerHTML = 'New Text'",
            "document.getElementByName('id').innerHTML = 'New Text'"
        ],
        correct: 1
    },
    {
        question: "Which method is used to add an element at the end of an array in JavaScript?",
        options: [
            "append()",
            "push()",
            "addLast()",
            "insert()"
        ],
        correct: 1
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    }
];

const quizContent = document.getElementById('quizContent');
const resultContainer = document.getElementById('resultContainer');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const scoreValue = document.getElementById('scoreValue');
const totalScore = document.getElementById('totalScore');
const scoreMessage = document.getElementById('scoreMessage');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    totalQuestionsSpan.textContent = quizData.length;
    totalScore.textContent = quizData.length;
    showQuestion();
}

function showQuestion(){

    resetState();
    const currentQuestion = quizData[currentQuestionIndex]
    questionText.textContent = currentQuestion.question
    currentQuestionSpan.textContent = currentQuestionIndex + 1

    currentQuestion.options.forEach((option , index) =>{
        const button =  document.createElement('button');
        button.textContent = option
        button.classList.add('option-btn');
        button.addEventListener('click' , () => selectOption(index, button));
        optionsContainer.appendChild(button);
    })


}

function resetState (){
    selectedAnswer = null;
    nextBtn.disabled = true;
     while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
    
}


function selectOption(selectedIndex, selectedButton){

        if (selectedAnswer !== null) return;

        selectedAnswer = selectedIndex

        const currentQuestion = quizData[currentQuestionIndex]
        const allButtons = document.querySelectorAll('.option-btn');

        if (selectedAnswer === currentQuestion.correct) {
            selectedButton.classList.add('correct');
        score++;
        } else {
             selectedButton.classList.add('wrong');
            allButtons[currentQuestion.correct].classList.add('correct');
        }

            allButtons.forEach(button => {
        button.classList.add('disabled');
    });
    
    nextBtn.disabled = false;
}


function handleNext() {
            currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function restartQuiz() {
        quizContent.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    initQuiz();
}

function showResult(){
        quizContent.classList.add('hidden');
    resultContainer.classList.remove('hidden');

        scoreValue.textContent = score;

                if (score === 5) {
        scoreMessage.textContent = "Perfect! You're a quiz master! 🎉";
    } else if (score >= 4) {
        scoreMessage.textContent = "Excellent work! You did great! 🌟";
    } else if (score >= 3) {
        scoreMessage.textContent = "Good job! Keep learning! 👍";
    } else if (score >= 2) {
        scoreMessage.textContent = "Not bad! Practice makes perfect! 💪";
    } else {
        scoreMessage.textContent = "Keep trying! You'll improve! 📚";
    }

}

nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restartQuiz);
initQuiz()