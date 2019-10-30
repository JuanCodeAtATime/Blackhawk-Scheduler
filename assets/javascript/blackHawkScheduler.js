// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve newly added trains from train database.
// 4. Create a way to calculate the next arrival time + determine minutes away.
// 5. Use moment.js formatting to maintain time.


// My web app's Firebase configuration

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
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Storing User input values into variables
    let trainName = $("#train-name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let firstTrainT = $("#first-train-input").val().trim();
    let freq = $("#frequency-input").val().trim();

    console.log(trainName)

    // Initializing variables that will be dynamically generated    
    // let nxtArrival = "";
    // let minAway = "";

    // Creating local "temporary" object to hold new train data
    let newTrain = {
        name: trainName,
        destin: destination,
        firstTime: firstTrainT,
        newFreq: freq
    };

    // Pushing new train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destin);
    console.log(newTrain.firstTime);
    console.log(newTrain.newFreq);

    alert("New train successfully added");

    // Clears all of the text-boxes upon submission
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val()("");

});

// 3. Create Firebase event for adding trains to database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a letiable.
    let trainName = childSnapshot.val().name;
    let destination = childSnapshot.val().destin;
    let firstTrainT = childSnapshot.val().firstTime;
    let freq = childSnapshot.val().newFreq;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainT);
    console.log(freq);



    //Calculation below uses Moment.JS and refered to WEEK 7 ACTIVITY #21 to complete


    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(firstTrainT, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

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
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(freq),
        $("<td>").text(nxtArrival),
        $("<td>").text(minAway)

    );

    // Appending new row to the table
    $("#train-table > tbody").append(newRow);
});

