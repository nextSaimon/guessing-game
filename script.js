let limit;
let maxTries;
let remainingTries;
let targetNumber;
let lowerBound = 0;
let upperBound;

function updateLimit() {
  limit = parseInt(document.getElementById("limit").value);
  upperBound = limit;
  resetGame(); // Reset the game when the limit is changed
  targetNumber = generateRandomNumber(limit);
}

function updateTries() {
  maxTries = parseInt(document.getElementById("tries").value);
  remainingTries = maxTries;
  const triesLeftElement = document.getElementById("triesLeft");
  if (triesLeftElement) {
    triesLeftElement.innerHTML = remainingTries;
  }
  resetGame(); // Reset the game when the max tries is changed
}

function generateRandomNumber(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

function makeGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);

  if (isNaN(guess)) {
    alert("Please enter a valid number.");
    return;
  }

  if (remainingTries <= 0) {
    alert("Game Over! No tries left. Please reset the game.");
    return;
  }

  if (guess === targetNumber) {
    document.getElementById(
      "status"
    ).innerHTML = `✅ Correct! 🎉 The number was ${targetNumber}.`;
    remainingTries = 0;
  } else {
    remainingTries--;
    if (guess < targetNumber) {
      lowerBound = Math.max(lowerBound, guess);
    } else {
      upperBound = Math.min(upperBound, guess);
    }
    document.getElementById(
      "rangeDisplay"
    ).innerHTML = `Guess a number between ${lowerBound} and ${upperBound}`;
    document.getElementById(
      "status"
    ).innerHTML = `Wrong! ❌ Remaining tries: ${remainingTries}`;

    if (remainingTries <= 0) {
      alert("Game Over! You've used all your tries.");
      document.getElementById("status").innerHTML =
        "Game Over! Click reset to play again.";
    }
  }
}

function showHelp() {
  alert(
    "Guess my chosen number within the limit. Each incorrect guess will shrink the range. If you use up all your tries or the limit becomes too narrow, the game is over."
  );
}

function resetGame() {
  lowerBound = 0;
  document.getElementById("guessInput").value = "";
  document.getElementById("status").innerHTML = `Max ${maxTries} tries`;
  document.getElementById(
    "rangeDisplay"
  ).innerHTML = `Guess a number between ${lowerBound} and ${upperBound}`;
  remainingTries = maxTries;
  const triesLeftElement = document.getElementById("triesLeft");
  if (triesLeftElement) {
    triesLeftElement.innerHTML = remainingTries;
  }
}

function addToDisplay(val) {
  let dis = document.getElementById("guessInput");

  // Ensure the current value is only updated if it's not already the same
  if (dis.value !== undefined && dis.value !== null) {
    dis.value += val;
  }
}

function Back() {
  let ev = document.getElementById("guessInput");
  ev.value = ev.value.slice(0, -1);
}

// Event listener for keydown to handle number input
document.addEventListener("keydown", (event) => {
  const validKeys = "0123456789";
  if (validKeys.includes(event.key)) {
    addToDisplay(event.key);
  } else if (event.key === "Backspace") {
    Back();
  } else if (event.key === "Enter") {
    makeGuess();
  }
});

// Initialize the game with default values
updateLimit();
updateTries();
