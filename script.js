function buttonClick(btn_id) {
    let rate = document.querySelector('input[name="fav_language"]:checked').value;
    window.localStorage.setItem("rate", rate.toLowerCase());
    window.localStorage.setItem("title", btn_id.id.toLowerCase())
}

async function getDataa() {
    const responseElement = document.getElementById("response");
    responseElement.innerHTML = "please wait..."; 
    
    let year = document.getElementById("year").value;
    let subject = document.getElementById("subject").value;
    let index = subject.indexOf("/");
    window.sessionStorage.setItem("subject", subject.substring(index + 1, subject.length));

    // Extract subject name for API
    const subjectName = subject.substring(0, index);
    
    // Use API service to fetch JAMB questions
    const result = await api.getJAMBQuestions(subjectName, year);
    
    if (result.success && result.data && result.data.data) {
        window.sessionStorage.setItem("questions", JSON.stringify(result.data.data));
        console.log("Questions loaded successfully");
        window.location = "./assets/html/jamb_test.html";
    } else {
        console.error("Error fetching questions:", result.error);
        responseElement.innerHTML = "Error loading questions. Please try again.";
    }
}

// Set up event listener for JAMB test button
if (document.getElementById('jamb_test')) {
    document.getElementById('jamb_test').onclick = function() {
        window.sessionStorage.setItem("quiz_type", "jamb");
        getDataa();
    };
}

// Populate year dropdown
let year = document.getElementById("year");
if (year) {
    for (let a = 1980; a <= 2023; a++) {
        year.innerHTML = year.innerHTML + `<option value="${a}">${a}</option>`;
    }
}