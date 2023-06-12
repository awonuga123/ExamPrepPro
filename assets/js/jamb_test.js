let rate = window.localStorage.getItem("rate");
let title = window.localStorage.getItem("title");
let questions = JSON.parse(window.sessionStorage.questions)

let count = 0;

let status_no = [];

let user_answers = [];
let correct_answers = [];

function questionAction(question, index) {
    document.getElementById("subject-title").innerHTML = window.sessionStorage.subject;
    document.getElementById("question-no").innerHTML = `Question ${index + 1} of 40`;
    let edit_section = question[index].section.replaceAll(":", ":<br>");
    document.getElementById("question").innerHTML = question[index].question;
    document.getElementById("section").innerHTML = edit_section.replaceAll(";", '<br>').replaceAll("].", "].<br>");
    document.getElementsByTagName('img')[0].src = question[index].image;
    let answers = [question[index].option.a, question[index].option.b, question[index].option.c, question[index].option.d];
    let option = document.getElementById("answers")
    option = option.getElementsByTagName("label")
    for(let i = 0; i < 4; i++){
        option[i].innerHTML = answers[i]
    }
    //console.log(question[index].answer)
    console.log(correct_answers.push(questions[index].option[questions[index].answer]))
}


var seconds = 60;
var minute = 29;

function timeManager() {
    var timeDuration = setInterval(function(){
        
        seconds--;
        
        if (seconds == 0){
            minute--;
            seconds = 59;
            document.getElementById("duration").innerHTML = `Time remaining: 0${minute} : ${seconds}`
        } else if(minute <= 0 && seconds < 1) {
            document.getElementById("duration").innerHTML = `Time remaining: 00 : 00`
            clearInterval(timeDuration);
        } else {
            if (seconds < 10) {
                document.getElementById("duration").innerHTML = `Time remaining: ${minute} : 0${seconds}`
            } else {
                document.getElementById("duration").innerHTML = `Time remaining: ${minute} : ${seconds}`
            }
        }
    }, 1000);
}


document.getElementById("next-btn").onclick = function() {
    nextButton();
}

function nextButton() {
    if (count !== 0) {
        let answer = document.querySelectorAll('input[name="fav_language"]');
        let selectedAnswer = document.getElementsByTagName("label")
        for (var a = 0; a < answer.length; a++) {
            if (answer[a].checked == true) {
                user_answers.push(selectedAnswer[a].innerHTML);
            }
        }
        
        if (answer[0].checked != true && answer[1].checked != true && answer[2].checked != true & answer[3].checked != true) {
            user_answers.push("None");
        }
    }
    
    
    if (count == 40) {
        Result();
        document.getElementById("next-btn").innerHTML = `<a href="./end_quiz.html"><button class="btn-01" id="next-btn">Submit</button></a>`;
    } else if(count < 39) {
        questionAction(questions, count);
    }
    
    var elements = document.getElementsByTagName("input");
    
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            elements[i].checked = false;
        }
    }
    count++;
    status_no[0] = count;
}

document.getElementById("previous-btn").onclick = function() {
    if (status_no[0] > 1) {
        questionAction(questions, status_no[0] - 2);
        status_no[0] = status_no[0] - 1;
        count = status_no[0] + 1;
        console.log(status_no[0]);
        user_answers.pop();
    }
}


function Result(){
    var cal_score = 0;
    for (let a = 0; a < questions.length; a++) {
        correct_answers.push(questions[a].option[questions[a].answer]);
    }
    for (let i = 0; i < user_answers.length; i++) {
        if (correct_answers[i] === user_answers[i]) {
            cal_score++;
        }
    }
    window.localStorage.setItem("score", cal_score);
}

document.getElementById("submit-btn").onclick = function() {
    Result();
    window.location.replace("./end_quiz.html")
}

setTimeout(function(){
    Result();
    window.location.replace("./end_quiz.html")
}, 2400000)


nextButton();
timeManager();