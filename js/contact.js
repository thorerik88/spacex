/*********************
      CONTACT FORM
*********************/

const contactSubmit = document.querySelector("input[name='contact']");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email'");
const msgInput = document.querySelector("textarea");
let response = document.querySelector(".response p");
let validateRegex = false;
let validateName = false;
let validateMsg = false;
let i = "";
let msg = [];

// Validate name

function valName() {
    if (!nameInput.value || nameInput.value === "Enter your name") {
        msg.push("You must enter your name");
        nameInput.style.borderColor = "red";
    } else {
        validateName = true;
        nameInput.style.borderColor = "green";
    }
}

// Validate email
function valReg() {
    let emailRes = emailRegEx.test(emailInput.value.trim())
    if (emailRes) {
        validateRegex = true;
        emailInput.style.borderColor = "green";
    } else {
        msg.push("Incorrect email address");
        emailInput.style.borderColor = "red";
    }
}

// Validate textarea
function valTextarea() {
    if (!msgInput.value || msgInput.value === "Enter your message...") {
        msg.push("You must enter your message");
        msgInput.style.borderColor = "red";
    } else {
        validateMsg = true;
        msgInput.style.borderColor = "green";
    }
}

// Validate text fields and email
contactSubmit.addEventListener("click", function(e){
    response.innerHTML = "";
    e.preventDefault();
    valReg();
    valName();
    valTextarea();
    if (validateRegex && validateName && validateMsg) {
        response.style.color = "green";
        msg = ["Thank you, the form has been sent."]
        msgOutput(msg)
    } else {
        msgOutput(msg);
        msg = [];
    }
})

// Output feedback message
function msgOutput(array){
    for (i=0; i<array.length; i++) {
        response.innerHTML += array[i] + "<br>";
    }
}
