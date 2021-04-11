var fs = require('fs');

function intializePage() {
    var data = fs.readFileSync("questions.json");
    var questionsJSON = JSON.parse(data);
    let desired_question = questionsJSON.desired_question;
    let question = questionsJSON.questions[desired_question].question;
    let answer = questionsJSON.questions[desired_question].answer;
    let image = questionsJSON.questions[desired_question].image;
    console.log(question);
    console.log(answer);
    document.getElementById("question").innerHTML = question;
    document.getElementById("image").src = image;
    var answerTable = document.getElementById("answer");
    answer.forEach(paragraph => {
        var p = document.createElement("p");
        p.innerHTML = paragraph;
        var td = document.createElement("td");
        td.append(p);
        var tr = document.createElement("tr");
        tr.appendChild(td);
        answerTable.appendChild(tr);
    });
}

intializePage();