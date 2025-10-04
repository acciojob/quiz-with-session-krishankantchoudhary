// -------------------------
// QUESTIONS
// -------------------------
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// -------------------------
// REFERENCES
// -------------------------
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved progress + score
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let savedScore = localStorage.getItem("score");

// If already submitted, show last score
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}`;
}

// -------------------------
// RENDER QUESTIONS
// -------------------------
function renderQuestions() {
  questionsElement.innerHTML = "";

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

      // Restore selection from sessionStorage
      if (savedProgress[i] === choice) {
        choiceElement.checked = true;
        choiceElement.setAttribute("checked", "true"); // Cypress expects this
      }

      // Save selection on change
      choiceElement.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));

        // Ensure only one option has the attribute
        const groupRadios = document.querySelectorAll(`input[name="question-${i}"]`);
        groupRadios.forEach(r => r.removeAttribute("checked"));
        choiceElement.setAttribute("checked", "true");
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
