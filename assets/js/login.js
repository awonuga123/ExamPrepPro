async function loginIn() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let response = await fetch("https://web-01.awonuga.tech/ExamPrepPro_api/login/", {
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    console.log(response)
    let data = await response.json();
    console.log(data)
    if (response.status === 400) {
        console.log(data.error);
        document.getElementById("response").innerHTML = data.error;
        console.log(data)
    } else if (response.status === 200) {
        console.log(data)
        window.localStorage.setItem("access-token", data.access)
        window.localStorage.setItem("refresh-token", data.refresh)
        let username = window.sessionStorage.setItem("user", data.username)
        window.location = "../../index.html"
    } else {
        document.getElementById("response").innerHTML = data.error;
        console.log(data)
    }
}

document.getElementById("login_in").onclick = function() {
    loginIn();
}