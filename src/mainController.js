function loadQuestionData(questionNumber) {
    let questions = require("./questions.json");
    document.location = "./questionResponse.html";
    let question = questions.questions[questionNumber].question;
    let answer = questions.questions[questionNumber].answer;
    document.getElementById("question").innerHTML = question;
    document.getElementById("answer").innerHTML = answer;
}