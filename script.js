//Homepage section
let homepage = document.querySelector("#homepage");
let newGame = document.querySelector("#newgame");
let help = document.querySelector("#help");
let about = document.querySelector("#about");
let backtoHome = document.querySelector("#backtohome");
let backTohome = document.querySelector("#backTohome");
let backtohome = document.querySelector("#backtoHome");
let h1 = document.querySelector("#h1");

//Gamepage section
let gamePage = document.querySelector("#gamepage");
let boxes = document.querySelectorAll(".box");
let msg = document.querySelector(".msg");
let reset = document.querySelector("#resetgame");
let player1 = document.querySelector(".player1");
let player2 = document.querySelector(".player2");
let draw = document.querySelector(".draw");

//Help and About sections
let Help = document.querySelector("#Help");
let About = document.querySelector("#About");

//Player's turn
let turn0 = true;
let player1Score = 0;
let player2Score = 0;
let drawScore = 0;

//Popup Element
let popup = document.querySelector(".popup");
let closed = document.querySelector(".close");
let winmsg = document.querySelector(".msg-winner");

//Check winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
];

//Show homepage on load
const showHome = () => {
  h1.classList.remove("hide");
  homepage.classList.remove("hide");
  Help.classList.add("hide");
  About.classList.add("hide");
  gamePage.classList.add("hide");
};

//Show Gamepage on clicking New Game
const showGame = () => {
  h1.classList.add("hide");
  gamePage.classList.remove("hide");
  Help.classList.add("hide");
  About.classList.add("hide");
  homepage.classList.add("hide");
};

//Help section showing clicking Help
const helpPage = () => {
  h1.classList.add("hide");
  homepage.classList.add("hide");
  Help.classList.remove("hide");
  About.classList.add("hide");
};

//About section Showing on clicking About
const aboutPage = () => {
  h1.classList.add("hide");
  homepage.classList.add("hide");
  Help.classList.add("hide");
  About.classList.remove("hide");
};

//Mark the boxes with M and R
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turn0 ? "X" : "O";
    turn0 = !turn0;
    box.disabled = true;
    checkWinner();
  });
});

//Reset Game
const resetGame = () => {
  turn0 = true;
  msg.classList.add("hide");
  enableBoxes();
};

//Enable Boxes
const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//Disable Boxes
const disbleBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

//show winner
const showWinner = (winner) => {
  msg.classList.add("hide");
  msg.innerText = `Congratulations winner is: ${winner}`;
  
  disbleBoxes();
  updateScore(winner);
  showPopup(winner);
  // resetGame();
};

//Check Winner
const checkWinner = () => {
  let isDraw = true;
  for (pattern of winPatterns) {
    let pos1value = boxes[pattern[0]].innerText;
    let pos2value = boxes[pattern[1]].innerText;
    let pos3value = boxes[pattern[2]].innerText;
    if (pos1value !== "" && pos2value !== "" && pos3value !== "") {
      if (pos1value === pos2value && pos2value === pos3value) {
        showWinner(pos1value);
      }
    }
    if(!pos1value || !pos2value || !pos3value){
      isDraw = false;
    }
  }
  if(isDraw === true){
    drawScore++;
    draw.innerText = `Draw:${drawScore}`;
    msg.innerText = "Its a draw"
    showPopup('No One');
  }
};

//Update Scores
const updateScore = (winner) => {
  if (winner === "X") {
    player1Score++;
    player1.innerText = `Player 1:${player1Score}`;
  } else if (winner === "O") {
    player2Score++;
    player2.innerText = `Player 2:${player2Score}`;
};
};

//Show Popup after winning
const showPopup = (winner) => {
  winmsg.innerText = `The winner is ${winner}`;
  popup.classList.remove("hide");
  popup.style.display = "flex";
};

//Close Popup 
const closePopup = () => {
  popup.classList.add("hide");
  popup.style.display = "none"
  resetGame();
}

showHome();

newGame.addEventListener("click", showGame);
help.addEventListener("click", helpPage);
about.addEventListener("click", aboutPage);
backtoHome.addEventListener("click", showHome);
backTohome.addEventListener("click", showHome);
backtohome.addEventListener("click", showHome);
reset.addEventListener("click", resetGame);
closed.addEventListener("click",closePopup);
