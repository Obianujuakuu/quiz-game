const welcomeEl = document.getElementById('welcome');
const nameInput = document.getElementById('nameInput'); 
const startBtn = document.getElementById('startBtn');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const quizEl = document.getElementById('quiz');
const resultsEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

let currentQuestion = 0;
let score = 0;

const quizData = [
    {
        question: "What is the capital of Nigeria?",
        choices: ["Abuja", "Ogun", "Lagos", "Delta"],
        correctAnswer: 0
    },
    {
        question: "When did Nigeria gain independence?",
        choices: ["1690", "1960", "1990", "1980"],
        correctAnswer: 1
    },
    {
        question: "Nigeria is located in what continent?",
        choices: ["Asia", "Europe", "Africa", "America"],
        correctAnswer: 2
    },
    {
        question: "What is the official language of Nigeria?",
        choices: ["Hausa", "Igbo", "Yoruba", "English"],
        correctAnswer: 3
    },
    {
        question: "What is the currency of Nigeria?",
        choices: ["Naira", "Dollar", "Pound", "Euro"],
        correctAnswer: 0
    },
    {
        question: "Which river is the longest in Nigeria?",
        choices: ["River Niger", "River Benue", "River Kaduna", "River Ogun"],
        correctAnswer: 0
    },
    {
        question: "What is the largest city in Nigeria by population?",
        choices: ["Abuja", "Lagos", "Kano", "Ibadan"],
        correctAnswer: 1
    },
    {
        question: "Which of these is a popular Nigerian dish?",
        choices: ["Sushi", "Tacos", "Jollof Rice", "Pasta"],
        correctAnswer: 2
    },
    {
        question: "What year did Nigeria become a republic?",
        choices: ["1963", "1970", "1985", "1999"],
        correctAnswer: 0
    },
    {
        question: "Who was the first president of Nigeria?",
        choices: ["Nnamdi Azikiwe", "Olusegun Obasanjo", "Muhammadu Buhari", "Goodluck Jonathan"],
        correctAnswer: 0
    },
    {
        question: "Which of these is a Nigerian ethnic group?",
        choices: ["Zulu", "Maasai", "Igbo", "Berber"],
        correctAnswer: 2
    },
    {
        question: "What is the national football team of Nigeria called?",
        choices: ["Black Stars", "Pharaohs", "Super Eagles", "Lions"],
        correctAnswer: 2
    },
    {
        question: "Which Nigerian city is known as the 'Coal City'?",
        choices: ["Lagos", "Abuja", "Enugu", "Port Harcourt"],
        correctAnswer: 2
    },
    {
        question: "What is the predominant religion in Northern Nigeria?",
        choices: ["Christianity", "Islam", "Hinduism", "Buddhism"],
        correctAnswer: 1
    },
    {
        question: "Which Nigerian musician is known for the song 'Fall'?",
        choices: ["Wizkid", "Davido", "Burna Boy", "2Baba"],
        correctAnswer: 1
    },
    {
        question: "Which of these is a Nigerian landmark?",
        choices: ["Mount Kilimanjaro", "Zuma Rock", "Victoria Falls", "Table Mountain"],
        correctAnswer: 1
    },
    {
        question: "What is the traditional Yoruba attire called?",
        choices: ["Ankara", "Agbada", "Kente", "Dashiki"],
        correctAnswer: 1
    },
    {
        question: "Which Nigerian city is known as the 'Garden City'?",
        choices: ["Lagos", "Abuja", "Enugu", "Port Harcourt"],
        correctAnswer: 3
    },
    {
        question: "Who is the author of the novel 'Things Fall Apart'?",
        choices: ["Wole Soyinka", "Chimamanda Ngozi Adichie", "Chinua Achebe", "Ben Okri"],
        correctAnswer: 2
    },
    {
        question: "Which Nigerian state is known as the 'Land of Promise'?",
        choices: ["Kano", "Akwa Ibom", "Osun", "Borno"],
        correctAnswer: 1
    }
];

const showElement = (element) =>{
    element.classList.add('active');
    element.classList.remove('hidden');

}

const hideElement = (element) =>{
    element.classList.remove('hidden');
    element.classList.remove('active')
}

startBtn.addEventListener('click', () =>{
        hideElement(welcomeEl);
        showElement(quizEl);
        startQuiz();
})

const loadQuestion = () => {
    if (currentQuestion >= quizData.length) {
        showResults();
        return;
    }
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;

    choicesEl.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener("click", () => selectChoice(button, i));
        choicesEl.appendChild(button);
    }

};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const startQuiz = () => {
    currentQuestion = 0;
    score = 0;
    shuffleArray(quizData);
    loadQuestion();
};


const selectChoice = (selected, index) => {
    const choices = choicesEl.getElementsByClassName("choice");
    for (let choice of choices) {
        choice.disabled = true;
    }
    const correctIndex = quizData[currentQuestion].correctAnswer;
    if (index !== correctIndex) {
        if (selected) {
            selected.classList.add("incorrect");
        }
    } else {
        if (selected) {
            selected.classList.add("correct");
        }
        score++;
    }
    submitBtn.disabled = false;
};

submitBtn.addEventListener("click", () => {
    moveToNextQuestion();
});

const moveToNextQuestion = () => {
    currentQuestion++;
    if(currentQuestion < quizData.length){
        loadQuestion();
    }else{
        showResults();
    }
    submitBtn.disabled = true;
};

const showResults = () => {
    scoreEl.textContent = `${score} out of ${quizData.length}`;
    hideElement(quizEl);
    showElement(resultsEl);
};
console.log(showResults)

restartBtn.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;
    hideElement(resultsEl);
    showElement(quizEl);
    startQuiz();
});

showElement(welcomeEl);
