let rate = window.localStorage.getItem("rate");
let title = window.localStorage.getItem("title");
let question_url = `https://the-trivia-api.com/api/questions?categories=${title}&limit=20&difficulty=${rate}`

let count = 1;

let status_no = [];

let user_answers = [];
let correct_answers = [];


async function get_question(url) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
}

const questions = get_question(question_url)

function questionAction(question, index) {
    questions.then(
        data => {
            document.getElementById("subject-title").innerHTML = data[index].category;
            document.getElementById("question-no").innerHTML = `Question ${count} of 20`;
            document.getElementById("question").innerHTML = data[index].question;
            let answers = [data[index].correctAnswer, data[index].incorrectAnswers[2], data[index].incorrectAnswers[0], data[index].incorrectAnswers[1]];
            answers = shuffleArray(answers);
            let option = document.getElementById("answers")
            option = option.getElementsByTagName("label")
            for(let i = 0; i < 4; i++){
                option[i].innerHTML = answers[i]
            }
        }
    )
}


questionAction(questions, 0);

questions.then(
    data => {
        var timeDuration = setInterval(function(){
        
            seconds--;
        
            if (seconds == 0){
                minute--;
                seconds = 60;
                document.getElementById("duration").innerHTML = `Time remaining: 0${minute} : ${seconds}`
            } else if(minute <= 0 && seconds < 1) {
                document.getElementById("duration").innerHTML = `Time remaining: 00 : 00`
                clearInterval(timeDuration);
            } else {
                if (seconds < 10) {
                    document.getElementById("duration").innerHTML = `Time remaining: 0${minute} : 0${seconds}`
                } else {
                    document.getElementById("duration").innerHTML = `Time remaining: 0${minute} : ${seconds}`
                }
            }
        }, 1000);
    }
)

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }

document.getElementById("next-btn").onclick = function() {
    if (count == 19) {
        Result();
        document.getElementById("next-btn").innerHTML = `<a href="./end_quiz.html"><button class="btn-01" id="next-btn">Submit</button></a>`;
    }
    if (count <= 20) {
        questionAction(questions, count);
    }
    status_no[0] = count;
    count++;


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

    var elements = document.getElementsByTagName("input");

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            elements[i].checked = false;
        }
    }
}

document.getElementById("previous-btn").onclick = function() {
    questionAction(questions, status_no[0] - 1);
    status_no[0] = status_no[0] - 1;
    count = status_no[0] + 1;
    console.log(status_no[0]);
    user_answers.pop();
}


function Result(){
    questions.then(
        data => {
            var cal_score = 0;
            for (let a = 0; a < data.length; a++) {
                correct_answers.push(data[a].correctAnswer);
            }
            for (let i = 0; i < user_answers.length; i++) {
                if (correct_answers[i] === user_answers[i]) {
                    cal_score++;
                }
            }
            window.localStorage.setItem("score", cal_score);
        }
    )
}

document.getElementById("submit-btn").onclick = function() {
    Result();
    window.location.replace("./end_quiz.html")
}

setTimeout(function(){
    Result();
    window.location.replace("./end_quiz.html")
}, 120000)

var seconds = 60;
var minute = 1;
