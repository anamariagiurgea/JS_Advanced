

// Definire structura JSON în JS
const quizData = {
  q1: {
    question: "Which one is correct team name in NBA?",
    options: ["New York Bulls", "Los Angeles Kings", "Golden State Warrios", "Huston Rocket"],
    answer: "Huston Rocket"
  },
  q2: {
    question: "'Namaste' is a traditional greeting in which Asian language?",
    options: ["Hindi", "Mandarin", "Nepalese", "Thai"],
    answer: "Hindi"
  },
  q3: {
    question: "The Spree river flows through which major European capital city?",
    options: ["Berlin", "Paris", "Rome", "London"],
    answer: "Berlin"
  },
  q4: {
    question: "Which famous artist had both a 'Rose Period' and a 'Blue Period'?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Salvador Dali", "Edgar Degas"],
    answer: "Pablo Picasso"
  }
};

const quizContainer = document.getElementById('quiz-container');
const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};

// Validam structura datelor din quiz in consola+stilizare
if (quizData && Object.keys(quizData).length > 0) {
  console.log(
    "%c Structura quizului a fost validată cu succes! Numar întrebari: " + Object.keys(quizData).length,"color: green;");
} else {
  console.error(
    "%c Eroare: Structura quizului este goala!","color: red; font-weight: bold;");
}

function renderQuiz() {
  quizContainer.innerHTML = ''; // curatam continutul vechi

  for (const key in quizData) {
    const questionObj = quizData[key];
    const userAnswer = savedAnswers[key];

    // intrebarile
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

      // bifam raspunsul salvat anterior
      if (userAnswer === option) {
        input.checked = true;
      }

      // salvam în localStorage
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
}
// Funcția pentru calcularea scorului și afișarea răspunsurilor corecte
function checkAnswers() {
  let score = 0;
  const total = Object.keys(quizData).length;

  // verificăm fiecare întrebare
  for (const key in quizData) {
    const correctAnswer = quizData[key].answer;
    const userAnswer = savedAnswers[key];

    if (userAnswer === correctAnswer) {
      score++;
    }
  }

  // Afișăm scorul
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Scorul tău: ${score} din ${total}`;

  // Afișăm răspunsurile corecte
  const labels = document.querySelectorAll("label");
  labels.forEach(label => {
    const input = label.querySelector("input");
    if (input && input.value === quizData[input.name].answer) {
      label.style.color = "green"; // corect
      label.style.fontWeight = "bold";
    } else if (input && savedAnswers[input.name] === input.value) {
      label.style.color = "red"; // greșit
    }
  });

  /// Mesaj motivațional colorat și separat
if (score === total) {
  resultElement.innerHTML += `<br><span style="color: green; font-weight: bold;"> Felicitări! Toate răspunsurile sunt corecte!</span>`;
} else {
  resultElement.innerHTML += `<br><span style="color: red; font-weight: bold;"> Încearcă din nou!</span>`;
}
}
//gestionarea eventualelor erori aparute la randare
try {
  renderQuiz();
} catch (error) {
  console.error("Eroare la afisarea quizzului:", error);
  document.getElementById('quiz-container').innerHTML =
    "<p style='color:red;'>Eroare la încarcarea quizului. Va rugam reincercati.</p>";
}
document.getElementById("check-answers").addEventListener("click", checkAnswers);
console.log("%c Randarea quizzului s-a finalizat fara erori.", "color: blue;" );

//testare eroare intentionata
//function renderQuiz() {
  //throw new Error("Test eroare intentionata");
  //quizContainer.innerHTML = ''; 

//}