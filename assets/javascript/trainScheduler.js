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
firebase.analytics();

let database = firebase.database();

// 2. Button for adding new train
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Storing User input values into variables
    let trainName = $("#train-name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let firstTrainT = $("#first-train-input").val().trim();
    let freq = $("#frequency-input").val().trim()

    // Initializing variables that will be dynamically generated    
    let nxtArrival = "";
    let minAway = "";

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

    // Prettify the employee start
    let empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    let empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    let empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    let newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empRole),
        $("<td>").text(empStartPretty),
        $("<td>").text(empMonths),
        $("<td>").text(empRate),
        $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
