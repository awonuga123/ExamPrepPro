function buttonClick(btn_id) {
    let rate = document.querySelector('input[name="fav_language"]:checked').value;
    window.localStorage.setItem("rate", rate.toLowerCase());
    window.localStorage.setItem("title", btn_id.id.toLowerCase())
}

async function getDataa() {
    document.getElementById("response").innerHTML = "please wait..."; 
    let year = document.getElementById("year").value;
    let subject = document.getElementById("subject").value;
    let index = subject.indexOf("/")
    window.sessionStorage.setItem("subject", subject.substring(index + 1, subject.length))

    let response = await fetch(`https://questions.aloc.com.ng/api/v2/q/40?subject=${subject.substring(0, index)}&year=${year}&type=utme`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'AccessToken': 'ALOC-e0ad6ccb9775c443b248'
        }
    });
    let data = await response.json()
    window.sessionStorage.setItem("questions", JSON.stringify(data.data))
    let questions = JSON.parse(window.sessionStorage.questions)
    console.log(questions)
    window.location = "./assets/html/jamb_test.html"
}

document.getElementById('jamb_test').onclick = function() {
    window.sessionStorage.setItem("quiz_type", "jamb")
    getDataa();
}

let year = document.getElementById("year");
for (let a = 1980; a <= 2023; a++) {
    year.innerHTML = year.innerHTML + `<option value="${a}">${a}</option>`
}