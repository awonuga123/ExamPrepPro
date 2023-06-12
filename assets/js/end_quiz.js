let score = window.localStorage.getItem("score");

let quiz_type = window.sessionStorage.quiz_type

if (quiz_type === "jamb") {
    document.getElementById("score").innerHTML = `${score}/40`;
    document.getElementById("wrongAnswer").innerHTML = `Wrong Answers: ${40 - score}`;
    document.getElementsByClassName("button")[0].getElementsByTagName("a")[0].href = "./jamb_test.html"
} else {
    document.getElementById("score").innerHTML = `${score / 20 * 100}%`
    document.getElementById("wrongAnswer").innerHTML = `Wrong Answers: ${20 - score}`;
    document.getElementsByClassName("button")[0].getElementsByTagName("a")[0].href = "./take_quiz.html"
}

document.getElementById("correctAnswer").innerHTML = `Correct Answers: ${score}`;

