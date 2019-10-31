// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve newly added trains from train database.
// 4. Create a way to calculate the next arrival time + determine minutes away.
// 5. Use moment.js formatting to maintain time.


// My web app's Firebase configuration
console.log(moment().format('HH:mm'))

let firebaseConfig = {
    apiKey: "AIzaSyBqQ1PAEfgwL5tBz2bS_5hW_Fx7P3eQYWo",
    authDomain: "trainscheduler-2019.firebaseapp.com",
    databaseURL: "https://trainscheduler-2019.firebaseio.com",
    projectId: "trainscheduler-2019",
    storageBucket: "trainscheduler-2019.appspot.com",
    messagingSenderId: "498460772240",
    appId: "1:498460772240:web:3b6b2051c54635a2a85515",
    measurementId: "G-BD99CYWR64"
};

//1. Initializing Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

// 2. Button for adding new train
$("#add-flight-btn").on("click", function (event) {
    event.preventDefault();

    // Storing User input values into variables
    let flightName = $("#flight-name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let firstFlightT = $("#first-flight-input").val().trim();
    let freq = $("#frequency-input").val().trim();

    console.log(flightName)

    // Initializing variables that will be dynamically generated    
    // let nxtArrival = "";
    // let minAway = "";

    // Creating local "temporary" object to hold new train data
    let newFlight = {
        name: flightName,
        destin: destination,
        firstTime: firstFlightT,
        newFreq: freq
    };

    // Pushing new train data to the database
    database.ref().push(newFlight);

    // Logs everything to console
    console.log(newFlight.name);
    console.log(newFlight.destin);
    console.log(newFlight.firstTime);
    console.log(newFlight.newFreq);

    alert("New flight successfully added");

    // Clears all of the text-boxes upon submission
    $("#flight-name-input").val("");
    $("#destination-input").val("");
    $("#first-flight-input").val("");
    $("#frequency-input").val("");

});

// 3. Create Firebase event for adding trains to database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a letiable.
    let flightName = childSnapshot.val().name;
    let destination = childSnapshot.val().destin;
    let firstFlightT = childSnapshot.val().firstTime;
    let freq = childSnapshot.val().newFreq;

    // Train Info
    console.log(flightName);
    console.log(destination);
    console.log(firstFlightT);
    console.log(freq);



    //Calculation below uses Moment.JS and refers to WEEK 7 ACTIVITY #21


    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(firstFlightT, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time...Formatted to display time only, but still displays entire date time group :(
    let currentTime = moment().format('HH:mm');
    console.log("CURRENT TIME: " + currentTime);

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    let minAway = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var nxtArrival = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nxtArrival).format("HH:mm"));


    // Creating new row that will be populated with User input + time calculations based on this input

    let newRow = $("<tr>").append(
        $("<td>").text(flightName),
        $("<td>").text(destination),
        $("<td>").text(freq),
        $("<td>").text(nxtArrival),
        $("<td>").text(minAway)

    );

    // Appending new row to the table
    $("#flights-table > tbody").append(newRow);


    //Added addtional real-time clock for aesthetics

    function displayTime() {
        var time = moment().format('HH:mm:ss');
        $('#clock').html(time);
        setTimeout(displayTime, 1000);
    }

    $(document).ready(function () {
        displayTime();
    });

});

