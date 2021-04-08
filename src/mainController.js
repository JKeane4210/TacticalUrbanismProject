var fs = require('fs');

function loadQuestionData(questionNumber) {
    var data = fs.readFileSync("questions.json");
    var questionsJSON = JSON.parse(data);
    questionsJSON.desired_question = questionNumber;
    var dataOuput = JSON.stringify(questionsJSON, null, 2);
    fs.writeFileSync("questions.json", dataOuput, finished);
    function finished(err) {
        console.log("Problem reading");
    }
    document.location = "./questionResponse.html";
}

function popup(source) {
    var popup = source.children[0];
    popup.classList.toggle("show");
}