optionButtons = document.querySelectorAll(".option-button");
newGameButton = document.querySelector("#new-game-button");
sheldonsDisplay = document.querySelector("#sheldons-display");
playersDisplay = document.querySelector("#players-display");
resultDisplay = document.querySelector("#result-display");
explanationDisplay = document.querySelector("#explanation-display");
lanternLit = document.querySelector("#lanternlit");

let explanationArray = [
    { 1: "Az olló elvágja a papírt", 3: "Az olló lefejezi a gyíkot" },
    { 2: "A papír bevonja a követ", 4: "A papír megcáfolja Spockot" },
    { 3: "A kő agyonüti a gyíkot", 0: "A kő eltöri az ollót" },
    { 4: "A gyík megmarja Spockot", 1: "A gyík megeszi a papírt" },
    { 0: "Spock eltöri az ollót", 2: "Spock cseppfolyósítja a követ" }
];

if (localStorage.lanternVisibility) {
    lanternLit.style.visibility = localStorage.lanternVisibility;
    explanationDisplay.style.visibility = localStorage.lanternVisibility;
} else {
    lanternLit.style.visibility = "hidden";
    explanationDisplay.style.visibility = "hidden";
}

window.addEventListener("load", preloadIcons());

function preloadIcons() {
    let iconsArray = ["img/0.png", "img/1.png", "img/2.png", "img/3.png", "img/4.png"];
    for (let i = 0; i < iconsArray.length; i++) {
        let temp = new Image();
        temp.src = iconsArray[i];
    }
}

function startGame(playersChoice) {
    disableOptionButtons(true);
    let sheldonsChoice = Math.floor(Math.random() * 5);
    sheldonsDisplay.src = "../img/" + sheldonsChoice + ".png";
    playersDisplay.src = "../img/" + playersChoice + ".png";
    whoWon(sheldonsChoice, playersChoice);
}

function disableOptionButtons(value) {
    for (let optionButton of optionButtons) {
        optionButton.disabled = value;
    }
    newGameButton.disabled = !value;
}

function whoWon(sheldonsChoice, playersChoice) {
    if (sheldonsChoice == playersChoice) {
        resultDisplay.style.color = "rgb(221, 171, 0)";
        resultDisplay.innerHTML = "Döntetlen!";
    } else if ((sheldonsChoice == (playersChoice + 1) % 5) || (sheldonsChoice == (playersChoice + 3) % 5)) {
        resultDisplay.style.color = "rgb(0, 152, 87)";
        resultDisplay.innerHTML = "Ön nyert!";
        explanationDisplay.innerHTML = explanationArray[playersChoice][sheldonsChoice];
    } else {
        resultDisplay.style.color = "rgb(199, 15, 37)";
        resultDisplay.innerHTML = "Sheldon nyert!";
        explanationDisplay.innerHTML = explanationArray[sheldonsChoice][playersChoice];
    }
}

function resetGame() {
    sheldonsDisplay.src = "";
    playersDisplay.src = "";
    resultDisplay.style.color = "white";
    resultDisplay.innerHTML = "Válasszon!";
    explanationDisplay.innerHTML = "";
    disableOptionButtons(false);
}

function toggleLantern() {
    if (lanternLit.style.visibility == "hidden") {
        lanternLit.style.visibility = "visible";
        explanationDisplay.style.visibility = "visible";
        localStorage.lanternVisibility = "visible";
    } else {
        lanternLit.style.visibility = "hidden";
        explanationDisplay.style.visibility = "hidden";
        localStorage.lanternVisibility = "hidden";
    }
}