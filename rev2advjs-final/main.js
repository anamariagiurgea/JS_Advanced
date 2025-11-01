console.log(" Verificare ok : main.js a fost încărcat corect!");
const quizContainer = document.getElementById('quiz-container');
const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
async function renderQuiz() {
  try {
    const response = await fetch('./quizz.json');
    const data = await response.json();
    const quizData = data.quiz; 
    quizContainer.innerHTML = '';

    for (const key in quizData) {
      const questionObj = quizData[key];
      const userAnswer = savedAnswers[key];

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
        // răsp salvat anterior
        if (userAnswer === option) {
          input.checked = true;
        }
        // Salvam rasp in localStporage
        input.addEventListener('change', () => {
          savedAnswers[key] = option;
          localStorage.setItem('userAnswers', JSON.stringify(savedAnswers));
        });
        label.appendChild(input);
        label.append(` ${option}`);
        questionDiv.appendChild(label);
      });
      quizContainer.appendChild(questionDiv);
    }
  } catch (error) {
    console.error('Eroare la încărcarea quizului:', error);
  }
}
renderQuiz();


