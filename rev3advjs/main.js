// Importăm fișierul JSON ca obiect
//import quizData from './quizz.json' with { type: 'json' };

const quizContainer = document.getElementById('quiz-container');
const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {}; // încărcăm răspunsurile salvate

// Funcție pentru a genera quiz-ul în pagină
function renderQuiz() {
  quizContainer.innerHTML = ''; // resetăm conținutul

  const quiz = quizData.quiz;

  for (const key in quiz) {
    const questionObj = quiz[key];
    const userAnswer = savedAnswers[key]; // dacă utilizatorul a ales deja ceva

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = questionObj.question;
    questionDiv.appendChild(questionTitle);

    questionObj.options.forEach(option => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = key;
      input.value = option;

      // Dacă utilizatorul a bifat acest răspuns anterior, îl marcăm
      if (userAnswer === option) {
        input.checked = true;
      }

      input.addEventListener('change', () => {
        savedAnswers[key] = option; // salvăm alegerea curentă
        localStorage.setItem('userAnswers', JSON.stringify(savedAnswers));
      });

      label.appendChild(input);
      label.append(` ${option}`);
      questionDiv.appendChild(label);
    });

    quizContainer.appendChild(questionDiv);
  }
}

renderQuiz();