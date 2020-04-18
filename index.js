var theQuestion = document.querySelector("#header");
var instructionPara = document.querySelector("#instructions");
var choicesContainer = document.querySelector(".choices");
var aEl = document.querySelector("#choices-a");
var bEl = document.querySelector("#choices-b");
var cEl = document.querySelector("#choices-c");
var dEl = document.querySelector("#choices-d");
var start = document.querySelector("#startButton");
var timer = document.querySelector("#timer");
var displayAnswer = document.querySelector("#answer");
var scoreCard = document.querySelector("#score");
var form = document.querySelector(".userForm");
var inputBox = document.querySelector("#input");
var saveScoreBtn = document.querySelector("#submitButton");

var score = 0;
var currentIndex = 0;
var secondsLeft = 60;
var scoresArr = JSON.parse(localStorage.getItem("Highscore")) || [];


// Array of questions & answers
let questionsArr = [
    {
        question: "What is the CSS universal selector?",
        answer: ["A. %", "B. *", "C. &", "D. $"],
        correct: "B. *"
    },
    {
        question: "Which is an example of a Ternary Operator?",
        answer: ["A. let defaultName = username || 'stranger'",
                "B. defaultName = () => {}",
                "C. var a = value", 
                "D. defaultName ? return username : return stranger"],
        correct: "D. defaultName ? return username : return stranger"     
    },
    {
        question: "JS code blocks are defined between what characters?",
        answer: ["A. [ ]",
                "B. { }",
                "C. ( )", 
                "D. < >"], 
        correct: "B. { }"      
    },
    {
        question: "Which is an example of lower camel-case?",
        answer: ["A.  camelcase",
                "B.  CamelCase",
                "C.  camelCase", 
                "D.  CAMELCASE"],  
        correct: "C.  camelCase"     
    },
    {
        question: "Which choice is NOT a primitive data types",
        answer: ["A.  Boolean",
                "B.  String",
                "C.  Object", 
                "D.  Number"], 
        correct: "C.  Object"      
    },
    {
        question: "Which is not a property of the box model?",
        answer: ["A.  Floats",
                "B.  Margin",
                "C.  Padding", 
                "D.  Border"],  
        correct: "A.  Floats"    
    },
    {
        question: "An object literal is made of 2 components in which respective order:",
        answer: ["A.  Object:Value",
                "B.  Value:Key",
                "C.  Value:Value", 
                "D.  Key:Value"],
        correct: "D.  Key:Value"       
    },
    {
        question: "Functions that gets passed in as parameters into another function and invoked are called:",
        answer: ["A.  Callback Functions",
                "B.  High Order Functions",
                "C.  A Function", 
                "D.  Anonymous Function"],  
        correct: "A.  Callback Functions"     
    },
    {
        question: "Which of these are not used to comment in HTML/ CSS/ JS",
        answer: ["A.  <!-- -->",
                "B.  [--]",
                "C.  //", 
                "D.  /* */"],    
        correct: "B.  [--]"   
    },
    {
        question: "Arrays in JS can be used to store:",
        answer: ["A.  Other Arrays",
                "B.  Numbers & Strings",
                "C.  Booleans", 
                "D.  All the Above"],   
        correct: "D.  All the Above"    
    }
];


// Event listener for start quiz button & display 1st question & choices
start.addEventListener("click", function() {
    instructionPara.remove();
    start.remove();
    // Show the current question
    theQuestion.textContent = questionsArr[currentIndex].question;

    renderQuiz();
    setTimer();
});

renderQuiz = () => {
    // Show answer A
    var choice1Btn = document.createElement("button");
    choice1Btn.innerHTML = questionsArr[currentIndex].answer[0];
    choice1Btn.setAttribute("data-index", 0);
    choice1Btn.setAttribute("style", "border: 2px dashed black");
    choice1Btn.style.minWidth = "500px";
    aEl.appendChild(choice1Btn);

    // Show answer B
    var choice2Btn = document.createElement("button");
    choice2Btn.innerHTML = questionsArr[currentIndex].answer[1];
    choice2Btn.setAttribute("data-index", 1);
    choice2Btn.setAttribute("style", "border: 2px dashed black");
    choice2Btn.style.minWidth = "500px";
    bEl.appendChild(choice2Btn);

    // Show answer C
    var choice3Btn = document.createElement("button");
    choice3Btn.innerHTML = questionsArr[currentIndex].answer[2];
    choice3Btn.setAttribute("data-index", 2);
    choice3Btn.setAttribute("style", "border: 2px dashed black");
    choice3Btn.style.minWidth = "500px";
    cEl.appendChild(choice3Btn);

    // Show answer D
    var choice4Btn = document.createElement("button");
    choice4Btn.innerHTML = questionsArr[currentIndex].answer[3];
    choice4Btn.setAttribute("data-index", 3);
    choice4Btn.setAttribute("style", "border: 2px dashed black");
    choice4Btn.style.minWidth = "500px";
    dEl.appendChild(choice4Btn);

    // Load next set of questions and answer choices when a choice is clicked
    choicesContainer.addEventListener("click", function(event) {
        event.preventDefault();

        // Get its data-index, get its value, and check user's answer 
        var userAnswer = event.target.getAttribute("data-index");
        var userAnswerValue = questionsArr[currentIndex].answer[userAnswer];

        if (event.target.matches("button") && currentIndex < questionsArr.length - 1) {
            if (userAnswerValue === questionsArr[currentIndex].correct) {
                displayAnswer.textContent = "-- Correct! --";
                score += 10;
                console.log(score);
            }
            if (userAnswerValue != questionsArr[currentIndex].correct) {
                displayAnswer.textContent = "-- Incorrect! --";
                secondsLeft -= 10;
            }
            currentIndex++;
            theQuestion.textContent = questionsArr[currentIndex].question;
            choice1Btn.textContent = questionsArr[currentIndex].answer[0];
            choice2Btn.textContent = questionsArr[currentIndex].answer[1];
            choice3Btn.textContent = questionsArr[currentIndex].answer[2];
            choice4Btn.textContent = questionsArr[currentIndex].answer[3];

        } else if (event.target.matches("button") && currentIndex == questionsArr.length - 1) {
            if (userAnswerValue === questionsArr[currentIndex].correct) {
                displayAnswer.textContent = "-- Correct! --";
                score += 10;
                console.log(score);
            }
            if (userAnswerValue != questionsArr[currentIndex].correct) {
                displayAnswer.textContent = "-- Incorrect! --";
                secondsLeft -= 10;
            }
            secondsLeft = 0;

        }
    });
    
}


// Set timer to countdown
setTimer = () => {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Timer: " + secondsLeft + " seconds";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Timer: 0 seconds";
            finishScreen();
        } 
        
    }, 1000)
};

// The last screen
finishScreen = () => {
    choicesContainer.remove();
    displayAnswer.remove();
    theQuestion.textContent = "Coding Quiz Challenge";

    scoreCard.innerHTML = "Your final score is: " + score;

    if (form.style.display === "none") {
        form.style.display = "block";
      } 

    // Event listener for submit button & store info into local storage & display on page
    saveScoreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        var initials = inputBox.value;

        scoresArr.push({
            Initials: initials,
            Score: score
        })

        localStorage.setItem("Highscore", JSON.stringify(scoresArr));

        // Linking next page for highscores
        location.href = "highscores.html";
    });

}
