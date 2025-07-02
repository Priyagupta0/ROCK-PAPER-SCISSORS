document.addEventListener("DOMContentLoaded", () => {
  const choices = ["ROCK", "PAPER", "SCISSORS"];
  const userItems = document.querySelectorAll(".box:nth-child(1) .items");
  const userResult = document.querySelector(".box:nth-child(1) .result");
  const compResult = document.querySelector(".box:nth-child(2) .result");
  const restartBtn = document.querySelector("button");
  let celebrationActive = false;

  const winnerDisplay = document.createElement("h2");
  winnerDisplay.id = "winner-display";
  document.body.appendChild(winnerDisplay);

  const celebration = document.createElement("div");
  celebration.className = "winner-celebration";
  document.body.appendChild(celebration);

  function createConfetti() {
    if (celebrationActive) return;

    celebrationActive = true;
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = Math.random() * 10 + 5 + "px";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confetti.style.animationDelay = Math.random() * 2 + "s";
      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }

  function showCelebration(message) {
    celebration.textContent = message;
    celebration.classList.add("show");
    createConfetti();

    setTimeout(() => {
      celebration.classList.remove("show");
      celebrationActive = false;
    }, 3000);
  }

  userItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (celebrationActive) return;

      const userChoice = item.textContent.trim().split(" ")[0].toUpperCase();
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

      userResult.textContent = `USER CHOSE: ${userChoice}`;
      compResult.textContent = `COMPUTER CHOSE: ${computerChoice}`;

      let winner = "";
      if (userChoice === computerChoice) {
        winner = "It's a Tie!";
      } else if (
        (userChoice === "ROCK" && computerChoice === "SCISSORS") ||
        (userChoice === "PAPER" && computerChoice === "ROCK") ||
        (userChoice === "SCISSORS" && computerChoice === "PAPER")
      ) {
        winner = "You Win!";
        showCelebration("🎉 YOU WIN! 🎉");
      } else {
        winner = "Computer Wins!";
        showCelebration("🤖 COMPUTER WINS!");
      }

      winnerDisplay.textContent = winner;
      restartBtn.style.display = "block";
    });
  });

  restartBtn.addEventListener("click", () => {
    if (celebrationActive) return;

    userResult.textContent = "USER CHOOSED";
    compResult.textContent = "COMPUTER CHOOSED";
    winnerDisplay.textContent = "";
    restartBtn.style.display = "none";
    celebration.classList.remove("show");
  });
});
