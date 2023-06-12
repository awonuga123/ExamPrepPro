let quiz_id = window.sessionStorage.getItem("quiz_id");
window.sessionStorage.setItem("quiz_score", 00);


//This function fetchs the question
async function fetchQuestion() {
    let response = await fetch(`https://web-01.awonuga.tech/ExamPrepPro_api/quiz_questions?quiz_id=${quiz_id}`)
    let data = await response.json()
    return(data.data)
}

let questions = fetchQuestion()
let count = 1;
let status_no = [];
let user_answers = [];
let correct_answers = [];
var seconds = 10;
var minute = 1;

//This function fills in the question fields
let my_name = window.sessionStorage.getItem("name")
document.getElementById("my_name").innerHTML = my_name;

function questionAction(index) {
    var elements = document.getElementsByTagName("input");
    
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            elements[i].checked = false;
        }
    }
    questions.then(
        data => {
            document.getElementById("subject-title").innerHTML = data[index].category;
            document.getElementById("question-no").innerHTML = `Question ${index+1} of 10`;
            document.getElementById("question").innerHTML = data[index].question;
            let answers = [data[index].correctAnswer, data[index].incorrectAnswers[2], data[index].incorrectAnswers[0], data[index].incorrectAnswers[1]];
            answers = shuffleArray(answers);
            let option = document.getElementById("answers")
            option = option.getElementsByTagName("label")
            for(let i = 0; i < 4; i++){
                option[i].innerHTML = answers[i]
            }
            window.sessionStorage.setItem("correct", data[index].correctAnswer)
        }
    )
    questions.then(data => {
        markBtn(index);
    })
    questions.then(
        data => {
            var seconds = 15;
    
            var timeDuration = setInterval(function(){
                
                seconds--;
            
                if (seconds <= 0){
                    let quiz_score = window.sessionStorage.getItem("quiz_score");
                    setScore(quiz_score);
                    clearInterval(timeDuration)
                } else if (seconds > 9) {
                    document.getElementById("duration").innerHTML = `Time remaining: ${seconds} seconds`;
                } else {
                    document.getElementById("duration").innerHTML = `Time remaining: 0${seconds} seconds`;
                }
            }, 1000);
        }
    )
}


//this question shuffles the list of answers
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

 //This function marks and saves the correct answer score
 function CorrectAnswer(index, time){
    questions.then(data => {
        let answer = document.querySelectorAll('input[name="fav_language"]');
        let selectedAnswer = document.getElementsByTagName("label")
        for (var a = 0; a < answer.length; a++) {
            if (answer[a].checked == true) {
                if (selectedAnswer[a].innerHTML === data[index].correctAnswer) {
                    window.sessionStorage.setItem("quiz_score", time);
                    break;
                } else {
                    window.sessionStorage.setItem("quiz_score", 0);
                }
            }
        }
    })
}


//This function listens to the clicked answer
function markBtn(no) {
    let time = 1500;
    document.getElementById("answer-01").onclick = function() {
        console.log(time)
        CorrectAnswer(no, time)
    }
    document.getElementById("answer-02").onclick = function() {
        console.log(time)
        CorrectAnswer(no, time)
    }
    
    document.getElementById("answer-03").onclick = function() {
        console.log(time)
        CorrectAnswer(no, time)
    }
    
    document.getElementById("answer-04").onclick = function() {
        console.log(time)
        CorrectAnswer(no, time)
    }
    setInterval(function() {
        time--
    }, 10)
}

//this sends the score to the database
async function setScore(user_score) {
    let quiz_id = window.sessionStorage.getItem("quiz_id");
    let name = window.sessionStorage.getItem("name")

    let response = await fetch('https://web-01.awonuga.tech/ExamPrepPro_api/quiz_set_score/', {
        method: "POST",
        body: JSON.stringify({
            "quiz_id": quiz_id,
            'name': name,
            'score': parseInt(user_score)
        })
    })
    let data = await response.json();
}

//Score board
async function scoreBoard() {
    let response = await fetch(`https://web-01.awonuga.tech/ExamPrepPro_api/quiz_set_score/?quiz_id=${quiz_id}`)
    let data = await response.json()
    let score_list = data.data;

    document.getElementsByTagName('main')[0].style.display = 'none';
    document.getElementsByTagName('aside')[0].style.display = 'block';
    
    let set_score = document.getElementById('scores');
    set_score.innerHTML = "";
    
    for (let a = 0; a < score_list.length; a++) {
        
        let user_score = `<div class="radio-btnn" style="display: flex; justify-content: space-between;">
                <h3 style="lineHeight: 0">${score_list[a][0]}</h3>
                <h3 style="lineHeight: 0">${score_list[a][1]}</h3>
            </div>`
        console.log(`${score_list[a][0]} | ${score_list[a][1]}`)
        set_score.innerHTML = set_score.innerHTML + user_score;
        
        let ans = window.sessionStorage.getItem("correct");
        document.getElementById("correct").innerHTML = `Correct Answer: ${ans}`

    }
}

function nextPage() {
    
    document.getElementsByTagName('main')[0].style.display = 'block';
    document.getElementsByTagName('aside')[0].style.display = 'none';
    window.sessionStorage.setItem("quiz_score", 0);
    document.getElementById("duration").innerHTML = '';

}

function questionLoop(questionNo) {
    //questionAction(questionNo)
    questionAction(questionNo)
    setTimeout(function() {
        if (questionNo < 9) {
            scoreBoard();
        } else {
            window.location.replace("./leaderboard.html")
        }
    }, 17000)
    setTimeout(function(){
        nextPage();
    }, 22000)
}

questionLoop(0);

let questionNo = 1;

setInterval(function() {
    questionLoop(questionNo);
    questionNo++;
}, 22000)