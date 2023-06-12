document.getElementById("logged_in_user").innerHTML = `WELCOME BACK ${window.sessionStorage.getItem('user').toUpperCase()}`

async function getData() {
    let token = window.localStorage.getItem("access-token")
    let username = window.sessionStorage.getItem("user")
    let response = await fetch("https://web-01.awonuga.tech/ExamPrepPro_api/getdata", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'user': username,
        }
    });
    let data = await response.json()
    quiz_data = data['quiz-details']
    if (response.status === 200 && quiz_data.at(-1)['status'] != true) {
        user = data.user
        console.log(quiz_data.at(-1))
        let quiz_title = quiz_data.at(-1)['quiz_title']
        let quiz_subject = quiz_data.at(-1)['subject']
        let quiz_id = quiz_data.at(-1)['quiz_id']
        let created_at = quiz_data.at(-1)['created_at'] 

        document.getElementById("quiz-head").innerHTML = `Title: ${quiz_title}`
        document.getElementById("quiz-subject").innerHTML = `Subject: ${quiz_subject}`
        document.getElementById("quiz-id").innerHTML = `ID: ${quiz_id}`
        document.getElementById("quiz-date").innerHTML = `Date: ${created_at.substring(0,10)}`
        window.sessionStorage.setItem("quiz_id", quiz_id)
    }
}

async function chechActive () {
    let token = window.localStorage.getItem("access-token")
    let username = window.sessionStorage.getItem("user")
    if (username === null) {
        window.location = "../html/login.html"
    }
    let response = await fetch("https://web-01.awonuga.tech/ExamPrepPro_api/getdata", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'user': username,
        }
    });
    let data = await response.json()
    if (response.status === 200) {
        let list = data['quiz-details']
        var quiz_container = document.getElementsByClassName('quiz-section')[0]
        for (let a = 0; a < list.length; a++) {
            var quiz_list = `<div class="quiz">
            <div class="quiz-details">
                <div class="radio">
                    <div class="radio-btn">
                        <p class="details">Title: ${list[a]['quiz_title']}</p>
                    </div>
                    <div class="radio-btn">
                        <p class="details">ID: ${list[a]['quiz_id']}</p>
                    </div>
                    <div class="radio-btn">
                        <p class="details">Subject: ${list[a]['subject']}</p>
                    </div>
                </div>
            </div>
            </div>`
            if (list[a]['status'] === true) {
                quiz_container.innerHTML = quiz_container.innerHTML + quiz_list;
            }
        }
    } else {
        window.location = "../html/login.html";
    }
}

async function getQuiz() {
    document.getElementById("response").innerHTML = "please wait..."; 
    let title = document.getElementById("quiz-title").value;
    let subject = document.getElementById("subject").value;
    let response = await fetch('https://web-01.awonuga.tech/ExamPrepPro_api/organize_quiz/', {
        method: 'POST',
        user: window.sessionStorage.getItem("user"),
        body: JSON.stringify({
            "quiz_title": title,
            "subject": subject,
            "user": window.sessionStorage.getItem("user"),
        })
    })
    data = await response.json()
    if (response.status === 400) {
        document.getElementById("response").innerHTML = data.error;
    } else {
        document.getElementById("response").innerHTML = data.success;
        location.reload();
    }
}

document.getElementById('quiz-btn').onclick = function() {
    getQuiz();
    getData();
}

async function quizStart(param_1, param_2) {
    console.log(param_1)
    let username = window.sessionStorage.getItem("user")
    let access = window.localStorage.getItem("access-token")
    let response = await fetch('https://web-01.awonuga.tech/ExamPrepPro_api/quiz_status/', {
        method: 'POST',
        body: JSON.stringify({
            "status": param_1,
            "past": param_2,
        }),
        headers: {
            "Authorization": 'Bearer ' + access,
            'user': username,
        }
    })
    let data = await response.json();
    if (response.status === 200) {
        let button = document.getElementById('start-btn')
        button.innerHTML = "Ongoing Quiz";
        button.disabled = true;
    } else {
        console.log("failed to start quiz")
    }
}


document.getElementById("start-btn").onclick = function() {
    let validQuiz = document.getElementById("quiz-head").innerHTML;
    if (validQuiz.length > 10) {
        quizStart(true, false);
        window.location = "../html/joint_quiz.html"
    }
}

async function checkUserActive() {
    let token = window.localStorage.getItem("access-token")
    let username = window.sessionStorage.getItem("user")
    if (username === null) {
        window.location = "../html/login.html"
    }
    let response = await fetch("https://web-01.awonuga.tech/ExamPrepPro_api/getdata", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'user': username,
        }
    });
    let data = await response.json()
    if (response.status === 200) {
        console.log('active')
    } else {
        console.log(response.status)
        window.location = "../html/login.html"
    }
}
window.setInterval(checkUserActive, 10000)