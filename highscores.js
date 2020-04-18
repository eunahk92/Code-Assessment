var scoreboard = document.querySelector(".high-scores");
var toQuizBtn = document.querySelector("#to-quiz");
var clearScoresBtn = document.querySelector("#clear-scores");
var scoreContainer = document.querySelector(".score-container")

var scoresArr = JSON.parse(localStorage.getItem("Highscore")) || [];
console.log(scoresArr);

for (var i = 0; i < scoresArr.length; i++) {
    var newScore = document.createElement("li");
    newScore.textContent = "User: " + scoresArr[i].Initials + " - Score: " + scoresArr[i].Score;
    scoreboard.appendChild(newScore);
}


clearScoresBtn.addEventListener('click', function() {
    localStorage.clear();
    newScore.remove();
})

toQuizBtn.addEventListener('click', function(e) {
    e.preventDefault();
    location.href = "index.html";
})