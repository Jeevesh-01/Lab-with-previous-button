const questions = {
  q1: {
    text: "Do you currently own a pet?",
    options: {
      "Yes": "q2",
      "No, but planning to get one soon": "q2b",
      "No, and not planning to get one": "q2c"
    }
  },
  q2: {
    text: "What type(s) of pet do you have?",
    options: {
      "Dog": "q3",
      "Cat": "q3",
      "Bird": "q3",
      "Fish": "q3",
      "Rabbit": "q3",
      "Other": "q3"
    }
  },
  q3: {
    text: "What breed(s) is your pet? (optional)",
    options: { "Continue": "q4" }
  },
  q4: {
    text: "What’s your pet’s gender?",
    options: {
      "Male": "q5",
      "Female": "q5",
      "Prefer not to say": "q5"
    }
  },
  q5: {
    text: "What’s your biggest challenge as a pet parent?",
    options: {
      "Finding reliable services": "q6",
      "Managing health and vaccinations": "q6",
      "Connecting with other pet parents": "q6",
      "Buying trusted products": "q6",
      "Other": "q6"
    }
  },
  q2b: {
    text: "When do you plan to get a pet?",
    options: {
      "Within 6 months": "q3b",
      "Within 1 year": "q3b",
      "Not sure": "q3b"
    }
  },
  q3b: {
    text: "What type of pet would you prefer?",
    options: {
      "Dog": "q4b",
      "Cat": "q4b",
      "Bird": "q4b",
      "Rabbit": "q4b",
      "Other": "q4b"
    }
  },
  q4b: {
    text: "What’s your main concern before getting a pet?",
    options: {
      "Responsibility/time commitment": "q6",
      "Cost of care": "q6",
      "Finding trusted services": "q6",
      "Lack of information": "q6",
      "Other": "q6"
    }
  },
  q2c: {
    text: "Would you be interested in offering pet services to others?",
    options: {
      "Yes, professionally": "q3c",
      "Yes, casually": "q3c",
      "No, not interested": "q6"
    }
  },
  q3c: {
    text: "What kind of services would you be most interested in providing?",
    options: {
      "Pet sitting": "q6",
      "Dog walking": "q6",
      "Grooming": "q6",
      "Training": "q6",
      "Play dates": "q6",
      "Other": "q6"
    }
  },
  q6: { text: "Which apps or services do you currently use for pet needs?", options: { Continue: "q7" } },
  q7: {
    text: "How often do you consume pet-related content online?",
    options: {
      "Daily": "q8",
      "Weekly": "q8",
      "Occasionally": "q8",
      "Rarely": "q8"
    }
  },
  q8: {
    text: "Would you use a single platform that combines social community + pet care services?",
    options: {
      "Definitely yes": "q9",
      "Maybe": "q9",
      "No": "q9"
    }
  },
  q9: {
    text: "Would you like early access to Pettxo when we launch?",
    options: {
      "Yes, sign me up!": "qEmailYes",
      "Maybe later": "qEmailMaybe",
      "No": "q10"
    }
  },
  qEmailYes: { text: "Your best email address to get early access", options: { Continue: "q10" } },
  qEmailMaybe: { text: "Your best email (optional)", options: { Continue: "q10" } },
  q10: { text: "Any features or services you’d love to see in Pettxo? (optional)", options: { Finish: "end" } }
};

let answers = {};
let history = [];
let currentQuestion = "q1";

function renderQuestion(qId) {
  const q = questions[qId];
  if (!q) return;

  const formArea = document.getElementById("formArea");
  formArea.innerHTML = `
    <div class="question">
      <h3>${q.text}</h3>
      ${Object.keys(q.options).map(opt => `
        <button onclick="handleAnswer('${qId}','${opt}')">${opt}</button>
      `).join("")}
    </div>
  `;

  document.getElementById("prevBtn").disabled = history.length === 0;
}

function handleAnswer(qId, answer) {
  answers[qId] = answer;
  history.push(qId);
  const nextQ = questions[qId].options[answer];
  if (nextQ === "end") {
    document.getElementById("formArea").innerHTML = "<h3>🎉 Thank you for helping shape Pettxo!</h3><p>Follow us on Instagram @pettxo</p>";
    document.getElementById("prevBtn").disabled = true;
    document.getElementById("nextBtn").style.display = "none";
  } else {
    currentQuestion = nextQ;
    renderQuestion(nextQ);
  }
}

function goPrevious() {
  if (history.length > 0) {
    const lastQ = history.pop();
    currentQuestion = lastQ;
    renderQuestion(lastQ);
  }
}

function submitForm() {
  console.log("User Answers:", answers);
  alert("Survey Completed! Check console for answers.");
}

// Start survey
renderQuestion(currentQuestion);
