let addUsers = []

async function getJoinedUsers() {
    let quiz_id = window.sessionStorage.getItem("quiz_id")

    let response = await fetch(`https://web-01.awonuga.tech/ExamPrepPro_api/quiz_users/?quiz_id=${quiz_id}`)
    let data = await response.json()
    let names = data['data']

    document.getElementById("quiz_title").innerHTML = `Quiz Title - ${data['quiz_name']}`;
    document.getElementById('quiz_id').innerHTML = `Quiz ID - ${quiz_id}`
    
    for (let a = 0; a < names.length; a++) {
        if (!addUsers.includes(data['data'][a][1])) {
            addUsers.push(data['data'][a][1]);
            let user_container = document.getElementById("profiles");
            let user = `<div class="user">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${a+1}-bg.webp" alt="" srcset="">
            <h3>${data['data'][a][1]}</h3>
            </div>`
            user_container.innerHTML = user_container.innerHTML + user;
        }
    }
    if (data.status) {
        window.location = "./joint_quiz.html";
    }
}

setInterval(function(){
    getJoinedUsers();
}, 500)

getJoinedUsers();
