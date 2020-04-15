/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;
//initialise the game
init();

//Event Listner and function for btn roll

//function inside the event listener is an anonymous func .
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result // the img is changed with help of src names of dice and rndm num gen by math
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    //3. Update the round score If the rolled number was not 1  //!= type coercion
    if (dice != 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore; //currrent-  type coercion
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

//Event Listener and function for hold btn

document.querySelector(".btn-hold").addEventListener("click", () => {
  //Add current score to Global score //pushes the score of round to total score
  scores[activePlayer] += roundScore;

  //Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  //Check if player won the game
  if (scores[activePlayer] >= 100) {
    if (gamePlaying) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";

      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");

      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer(); //next player
    }
  }
});

//Event listener and function for new game btn

//we pass in the func directly
document.querySelector(".btn-new").addEventListener("click", init);

//We implement DRY principle  as the same code is used in the program at some places

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // 0 because we are going to read from an 0 based array
  gamePlaying = true; //state variable (which keeps tab of whats on and off)

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  //we remove active from both cuz we dont know which is active  and hence we init player 1 again as active
  document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  //we use toggle rather than add and remove
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

{
  // just for learning concepts
  //
  // document.querySelector(
  //   "#current-" + activePlayer
  // ).innerHTML = `<em> ${dice} </em>`;
  //var x = document.querySelector("#score-0").textContent;
  //console.log(x);
  {
    //add and remove class examples
    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");
  }
}
