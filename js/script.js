/*
TASKS

all pages:
2. subscription feedback
3. api for future and historic launches

single page:
1. contact form regex

*/

/* Global VARs*/
const emailRegEx = /^.+@.+\..+$/;
const phoneRegEx = /[\d]/;
let valRegEx = false;

/*********************
      MOBILE MENU
*********************/

const mobileBtn = document.querySelector(".mobile-button");
const navMenu = document.querySelector(".nav-menu");
const mobileClose = document.querySelector(".close");

mobileBtn.addEventListener("click", function(){
    navMenu.style.display = "inline-block";
    mobileBtn.style.display = "none";
    mobileClose.style.display = "inline-block";
    mobileClose.addEventListener("click", function(){
        navMenu.style.display = "none";
        mobileBtn.style.display = "inline-block"
        mobileClose.style.display = "none";
    })
})

/*********************
      SUBSCRIPTION
*********************/
function validate() {
    const sub = document.querySelector("input[name='subscription'");
    const subParagraph = document.querySelector(".newsletter p");
    let emailRes = emailRegEx.test(sub.value.trim());
    if (!emailRes) {
        valRegEx = false;
        subParagraph.innerHTML = "Invalid email address"
        subParagraph.style.color = "red";
        sub.style.borderColor = "red";
        subParagraph.style.visibility = "visible";

    } else {
        valRegEx = true;
        subParagraph.style.color = "green";
        sub.style.borderColor = "green";
        subParagraph.innerHTML = "Thank you for your subscription!";
        
        setTimeout(function(){
            subParagraph.style.visibility = "hidden";
        }, 3000)
    }
}

const subSubmit = document.querySelector("input[value='SUBSCRIBE']");
subSubmit.addEventListener('click', function(e){
    e.preventDefault();
    validate();
});

/*********************
      SPACEX API
*********************/

function datePrefix(date) {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

// Manipulate the main launch heading info
function editMain(name, location, locationShort, date, mainPatch) {
    if (document.querySelector(".countdown")) {
        // main launch hero heading
        const missionInfo = document.querySelector(".mission-info");
        const missionPatch = document.querySelector(".mission-patch");
        if (window.screen.availWidth <768) { // display a shorthand if small screen size
            location = locationShort;
        } else {
            location = location;
        }
        missionInfo.innerHTML = ` <h3>UPCOMING LAUNCH</h3>
                                <h2>${name}</h2>
                                <h3>${location}</h3>
                                <h3>${date}</h3>`;
        missionPatch.src = `${mainPatch}`;
    }
}

function editSpec(name, reUse, type, nationality, payloadType, payloadMass, details, id) {
    if (document.querySelector(".launch-main")) {
        const launchData = document.querySelector(".launch-main");
        let newHtml = "";
        if (!reUse) {
            reUse = "0";
        }
        newHTML = `
        <div class="launch">
        <div class="wrapper">
            <h3>Launch information</h3>
            <h4><u>Rocket information</u></h4>
            <div class="data-wrapper">
            <section class="data">
                <p>Flight number:</p>
                <p>${id}</p>
            </section>
            <section class="data">
                <p>Rocket name:</p>
                <p>${name}</p>
            </section>
            <section class="data">
                <p>Re-use:</p>
                <p>${reUse}</p>
            </section>
            <section class="data">
                <p>Rocket type:</p>
                <p>${type}</p>
            </section>
            <section class="data">
                <p>Nationality:</p>
                <p>${nationality}</p>
            </section>
            <section class="data">
                <p>Payload type:</p>
                <p>${payloadType}</p>
            </section>
            <section class="data">
                <p>Payload mass(kg):</p>
                <p>${payloadMass}</p>
            </section>
            </div>
            <h4><u>Details</u></h4>
            <div class="data-wrapper">
            <p>${details}</p>
            </div>
        </div>
        </div>
        `;
        launchData.innerHTML = newHTML;
        id += 1;
    } else {
        console.log("This is not the main site")
    }
}

// Manipulate the countdown timer
function countdown(days, hrs, mins, sec) {
    const countTimer = document.querySelector(".timer");
    countTimer.innerHTML = `<div class="timer-col">
                                <h2>${days}</h2>
                                <p>Days</p>
                            </div>
                            <div class="timer-col">
                                <h2>${hrs}</h2>
                                <p>Hrs</p>
                            </div>
                            <div class="timer-col">
                                <h2>${mins}</h2>
                                <p>Mins</p>
                            </div>
                            <div class="timer-col">
                                <h2>${sec}</h2>
                                <p>Seconds</p>`;
}

function data(mainLaunch, id){   
    // find the upcoming launch based on todays date
    const launchDate = new Date(mainLaunch.launch_date_local);
    const today = new Date();
    if (launchDate >= today) {
        // change date format to display
        let date = today.getDate();
        date = date + datePrefix(date);            
        let month = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"][today.getMonth()];
        let displayDate = date + " " + month + " " + today.getFullYear();
        // set all data to display
        let missionName = mainLaunch.mission_name;
        let location = mainLaunch.launch_site.site_name_long;
        let locationShort = mainLaunch.launch_site.site_name;
        let missionPatch = mainLaunch.links.mission_patch;
        let rocketName = mainLaunch.rocket.rocket_name;
        let rocketType = mainLaunch.rocket.rocket_type;
        let reUse = mainLaunch.rocket.second_stage.payloads[0].reused;
        let nation = mainLaunch.rocket.second_stage.payloads[0].nationality;
        let payloadType = mainLaunch.rocket.second_stage.payloads[0].payload_id;
        let payloadMass = mainLaunch.rocket.second_stage.payloads[0].payload_mass_kg;
        let details = mainLaunch.details;
        if (!details) {
            details = "Sorry, no information";
        }
        editMain(rocketName, location, locationShort, displayDate, missionPatch);
        editSpec(rocketName, reUse, rocketType, nation, payloadType, payloadMass, details, id)
        
        // create Count Down timer
        let countDownDate = new Date(launchDate).getTime();
        let myfunc = setInterval(function () {
            let now = new Date().getTime();
            let timeleft = countDownDate - now;

            let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            if (document.querySelector(".countdown")) { // Check to see if countdown section is present
                countdown(days, hours, minutes, seconds)
            }
        }, 1000)
    }
}

async function callApi() {
    try {
        const response = await fetch("https://api.spacexdata.com/v3/launches/upcoming");
        const json = await response.json();
        findLaunch(json)
    }
    catch (error) {
        console.log(error);
    }
}
callApi();

async function callUpcoming(id) {
    try {
        const response = await fetch("https://api.spacexdata.com/v3/launches/" + id);
        const json = await response.json();
        data(json, id)
    }
    catch (error) {
        console.log(error);
    }
}

function findLaunch(mainLaunch) {
    for (i = 0; i < mainLaunch.length; i++) {
        // find the upcoming launch based on todays date
        const launchDate = new Date(mainLaunch[i].launch_date_local);
        const today = new Date();
        if (launchDate >= today) {
            callUpcoming(mainLaunch[i].flight_number);
            
        }
    }
}


