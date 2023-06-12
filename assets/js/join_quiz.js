async function joinQuiz() {
    let quiz_id = document.getElementById("quiz_id").value;
    let quiz_name = document.getElementById("username").value;

    window.sessionStorage.setItem("quiz_id", quiz_id);
    window.sessionStorage.setItem('name', quiz_name);

    let response = await fetch('https://web-01.awonuga.tech/ExamPrepPro_api/join_quiz/', {
        method: "POST",
        body: JSON.stringify({
            "quiz_id": quiz_id,
            "name": quiz_name
        })
    })
    let data = await response.json();
    console.log(data)
    if (response.status === 200) {
        console.log(data.success)
        window.location = "./joint.html"
    } else {
        console.log(data )
        document.getElementById("error").innerHTML = data.error || 'This field is required';
    }
}

document.getElementById("quiz-btn").onclick = function() {
    if (window.navigator.connection.effectiveType === "4g") {
        joinQuiz();
    } else if (window.navigator.connection.rtt <= 400 ) {
        joinQuiz();
    } else {
        document.getElementById("error").innerHTML = `Unable to join quiz due to poor or unstable network, please try again`;
    }
}