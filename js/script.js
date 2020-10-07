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

// Manipulate the main launch heading info
function editMain(name, location, locationShort, date, mainPatch) {
    if (document.querySelector(".countdown")) {
        // main launch hero heading
        const missionInfo = document.querySelector(".mission-info");
        const missionPatch = document.querySelector(".mission-patch");
        const missionDate = convertDate(date);
        if (window.screen.availWidth <768) { // display a shorthand if small screen size
            location = locationShort;
        } else {
            location = location;
        }
        missionInfo.innerHTML = ` <h3>UPCOMING LAUNCH</h3>
                                <h2>${name}</h2>
                                <h3>${location}</h3>
                                <h3>${missionDate}</h3>`;
        if (mainPatch) {
            missionPatch.src = `${mainPatch}`;
        } else {
            missionPatch.src = "https://via.placeholder.com/150";
        }
    }
}


// Manipulate the countdown timer
function countdown(days, hrs, mins, sec) {
    const countTimer = document.querySelector(".timer");
    if (sec > 0) {
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
    } else {
        countTimer.innerHTML = `
                                <div class="timer-col">
                                    <h2>TBA, previous launch not updated</h2>
                                </div>
                               `;
    }
}

// Manipulate details boxes

function futHisLaunch (array, oneMission) {
    let htmlFut = "";
    let listIndex = 0;
    for (i = 0; i < array.length; i++) {
        listIndex += 1;
        let flightNumber = array[i].flight_number;
        let missionName = array[i].mission_name;
        let unixDates = array[i].launch_date_unix;
        let displayDate = convertDate(unixDates);
        let rocketName = array[i].rocket.rocket_name;
        let crew = array[i].crew;
        if (!crew || crew.length == 0) {
            crew = "No crew onboard";
        }
        let rocketType = array[i].rocket.rocket_type;
        let launchSite = array[i].launch_site.site_name_long;
        if (window.screen.availWidth < 768) { // display a shorthand if small screen size
            launchSite = array[i].launch_site.site_name;
        } else {
            launchSite = launchSite;
        }
        let missionPatch = array[i].links.mission_patch;
        if (!missionPatch) {
            missionPatch = "https://via.placeholder.com/150";
        } 
        let payloadType = array[i].rocket.second_stage.payloads[0].payload_type;
        let payloadId = array[i].rocket.second_stage.payloads[0].payload_id;
        let payloadNation = array[i].rocket.second_stage.payloads[0].nationality;
        let payload = payloadType + " (" + payloadId + " origin: " + payloadNation + ")";
        let details = array[i].details;
        if (!details) {
            details = "To be announced";
        }
        htmlFut = `
            <div class="launch launch-col">
                <div class="wrapper">
                    <h3>Launch information</h3>
                    <h3>${missionName}</h3>
                    <img src="${missionPatch}" class="mission-patch" alt="an image of the mission logo">
                    <div class="launch-date col-2 ">
                        <h3>${rocketName}</h3>
                        <h3>${displayDate}</h3>
                    </div>
                    <h4><u>Rocket information</u></h4>
                    <div class="data-wrapper">
                        <section class="data">
                            <p>Flight Number:</p>
                            <p>${flightNumber}</p>
                        </section>
                        <section class="data">
                            <p>Launch Date</p>
                            <p>${displayDate}</p>
                        </section>
                        <section class="data">
                            <p>Rocket Name</p>
                            <p>${rocketName}</p>
                        </section>
                        <section class="data">
                            <p>Mission Name:</p>
                            <p>${missionName}</p>
                        </section>
                        <section class="data">
                            <p>Location:</p>
                            <p>${launchSite}</p>
                        </section>
                        <section class="data">
                            <p>Crew:</p>
                            <p>${crew}</p>
                        </section>
                        <section class="data">
                            <p>Rocket type:</p>
                            <p>${rocketType}</p>
                        </section>
                        <section class="data">
                            <p>Payload</p>
                            <p>${payload}</p>
                        </section>
                    </div>
                    <h4><u>Details</u></h4>
                    <div class="data-wrapper">
                        <p>${details}</p>
                    </div>
                </div>
            </div>
                  `;
        if (oneMission === true) {
            let launchList = document.querySelector(".launch-list");
            launchList.innerHTML = htmlFut;
            break
        } else {
            let launchList = document.querySelector(".launch-list");
            launchList.innerHTML += htmlFut;
        }
    } 
}

function convertDate(unix) {
        let convertUnix = new Date(unix * 1000)
        let month = convertUnix.getMonth();
        let conDate = convertUnix.getDate()
        return conDate + "/" + month + " - " + convertUnix.getFullYear();
}

function data(futLaunch, hisLaunch){
    let upcomingLaunch = futLaunch[0];
    // display Upcoming Launch
    let upcomingName = upcomingLaunch.rocket.rocket_name;
    let launchDate = upcomingLaunch.launch_date_utc;    
    let upcomingLocation = upcomingLaunch.launch_site.site_name_long;
    let upcomingLocationShort = upcomingLaunch.launch_site.site_name;
    let upcomingPatch = upcomingLaunch.links.mission_patch;
    editMain(upcomingName, upcomingLocation, upcomingLocationShort, upcomingLaunch.launch_date_unix, upcomingPatch);

    // Upcoming Launch information
    let oneMission = false;
    if (document.querySelector(".future")) {
        futHisLaunch(futLaunch, oneMission)
        
    } else if (document.querySelector(".historic")) {
        hisLaunch.reverse();
        futHisLaunch(hisLaunch, oneMission)
    } else if (document.querySelector(".contact") || document.querySelector(".about")) {
        
    } else {
        oneMission = true;
        futHisLaunch(futLaunch, oneMission)
    }


    // Create Countdown Timer
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

// API FUNCTION

async function callApi() {
    try {
        const response = await fetch("https://api.spacexdata.com/v3/launches/");
        const json = await response.json();
        findNextLaunch(json)
    }
    catch (error) {
        console.log(error);
    }
}
callApi();

let hisLaunch = [];
let futLaunch = [];

function findNextLaunch(json) {
    for (i=0;i<json.length;i++) {
        if (json[i].upcoming === true) {
            futLaunch.push(json[i]);
        } else {
            hisLaunch.push(json[i]);
        }
    }
    data(futLaunch, hisLaunch);
}


