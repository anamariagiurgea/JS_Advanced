let quizData = null;

//2. Funcție pentru a genera quiz-ul (aceasta este funcția dvs. existentă, ușor adaptată)
// Acum acceptă obiectul quizData ca argument
function renderQuiz(data) {
    // Încarcă răspunsurile salvate (rămâne la fel)
    const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {}; 
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // resetăm conținutul

    const quiz = data.quiz; 
    
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

// 3. Funcție pentru a importa și randa datele JSON
async function loadQuiz() {
    try {
        // Utilizați FETCH API (standard) pentru a citi fișierul JSON.
        // Acesta funcționează de obicei pe protocolul file://
        const response = await fetch('./quizz.json');
        
        // Verificați dacă cererea a fost reușită
        if (!response.ok) {
             throw new Error('Eroare la încărcarea fișierului JSON: ${response.statusText}');
        }
        
        // Preluarea datelor ca obiect JavaScript
        quizData = await response.json();
        
        // Apelați funcția de randare după ce datele au fost încărcate
        renderQuiz(quizData); 
        
    } catch (error) {
        console.error("Nu s-au putut încărca datele quiz-ului. Verificați calea:", error);
        // Puteți afișa un mesaj de eroare în quiz-container aici
        document.getElementById('quiz-container').innerHTML = '<h2>Eroare: Nu s-a putut încărca quiz-ul.</h2>';
    }
}

// 4. Apelați funcția de încărcare la pornire
loadQuiz();