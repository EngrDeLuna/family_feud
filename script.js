// Main answers with scores and possible variants
const answers = [
  { 
    text: "Stay at home", 
    revealed: false, 
    placeholderId: "ph1", 
    score: 25,
    variants: ["stay at home", "stay home", "stay indoors"]
  },
  { 
    text: "Drink coffee", 
    revealed: false, 
    placeholderId: "ph2", 
    score: 15,
    variants: ["drink coffee", "have coffee", "coffee"]
  },
  { 
    text: "Read books", 
    revealed: false, 
    placeholderId: "ph3", 
    score: 10,
    variants: ["read books", "reading books", "books"]
  },
  { 
    text: "Watch TV", 
    revealed: false, 
    placeholderId: "ph4", 
    score: 20,
    variants: ["watch tv", "watch television", "tv"]
  },
  { 
    text: "Play games", 
    revealed: false, 
    placeholderId: "ph5", 
    score: 18,
    variants: ["play games", "play game", "gaming"]
  },
  { 
    text: "Go online", 
    revealed: false, 
    placeholderId: "ph6", 
    score: 12,
    variants: ["go online", "online", "surf internet"]
  }
];

// Create wrong image element
const wrongImg = document.createElement("img");
wrongImg.src = "wrong.png";
wrongImg.style.position = "absolute";
wrongImg.style.top = "50%";
wrongImg.style.left = "50%";
wrongImg.style.transform = "translate(-50%, -50%)";
wrongImg.style.zIndex = "30";
wrongImg.style.display = "none";
wrongImg.style.width = "200px";
wrongImg.style.height = "200px";
document.body.appendChild(wrongImg);

// Load wrong sound
const wrongSound = new Audio("wrong.mp3");

// Function to reveal answer
function revealAnswer(input) {
  const userInput = input.value.trim().toLowerCase();
  let found = false;

  answers.forEach(answer => {
    if (!answer.revealed) {
      // Check if input matches any variant
      if (answer.variants.some(variant => variant.toLowerCase() === userInput)) {
        answer.revealed = true;

        // Reveal main text
        document.getElementById(answer.placeholderId).textContent = answer.text;

        // Reveal score in small placeholder
        const smallId = answer.placeholderId + "s";
        const smallElem = document.getElementById(smallId);
        if (smallElem) {
          smallElem.textContent = answer.score;
        }

        found = true;
      }
    }
  });

  if (!found) {
    // Show wrong image & play sound
    wrongImg.style.display = "block";
    wrongSound.currentTime = 0;
    wrongSound.play();

    setTimeout(() => {
      wrongImg.style.display = "none";
    }, 1500);
  }

  input.value = ""; // clear input
}

// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", () => {
  const input = document.getElementById("searchInput");
  revealAnswer(input);
});

// Allow pressing Enter to search
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    revealAnswer(e.target);
  }
});
