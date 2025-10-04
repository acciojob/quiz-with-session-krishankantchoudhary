// Get references
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Questions are already defined in HTML file above 👆

// Load saved progress from sessionStorage (if any)
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let savedScore = localStorage.getItem("score");

// If user has already submitted, display score from localStorage
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}`;
}

// -------------------------
// RENDER QUESTIONS
// -------------------------
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before rendering

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    // Question text
    const qText = document.createElement("p");
    qText.textContent = q.question;
    questionDiv.appendChild(qText);

    // Choices
    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore from session storage
      if (savedProgress[i] === choice) {
        choiceElement.checked = true;
      }

      // Save answer to session storage on selection
      choiceElement.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  });
}

renderQuestions();

// -------------------------
// SUBMIT QUIZ
// -------------------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) {
      score++;
    }
  });

  // Display score
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}`;

  // Save to localStorage
  localStorage.setItem("score", score);
});
