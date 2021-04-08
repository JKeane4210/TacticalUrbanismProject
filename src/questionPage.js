var fs = require('fs');

function intializePage() {
    var data = fs.readFileSync("questions.json");
    var questionsJSON = JSON.parse(data);
    let desired_question = questionsJSON.desired_question;
    let question = questionsJSON.questions[desired_question].question;
    let answer = questionsJSON.questions[desired_question].answer;
    console.log(question);
    console.log(answer);
    console.log(document);
    document.getElementById("question").innerHTML = question;
    document.getElementById("answer").innerHTML = answer;
}

intializePage();