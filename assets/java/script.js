$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyDI8S6eXpIhTEC9cecqNlXyiXVN9GMrWyw",
        authDomain: "hola-68f5f.firebaseapp.com",
        databaseURL: "https://hola-68f5f.firebaseio.com",
        projectId: "hola-68f5f",
        storageBucket: "hola-68f5f.appspot.com",
        messagingSenderId: "844031021964",
        appId: "1:844031021964:web:1919d5213fcd50d7057ca9",
        measurementId: "G-CGSMN366X2"
      };
    firebase.initializeApp(config);

    var database = firebase.database();
    
    $("#submit").on("click", function(e) {
        e.preventDefault();
        
        var name = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#firstTrainTime").val().trim();
        var frequency = $("#frequency").val().trim();

    database.ref("trains").push({
        TrainName: name,
        Destination: destination,
        FirstTrainTime: firstTrainTime,
        Frequency: frequency
    });

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
    
    
});

var ref = firebase.database().ref("trains");
ref.on("child_added", function(snapshot) {
    var value = snapshot.val();
    
    var trainName = value.TrainName;
    var destination = value.Destination;
    var firstTrainTime = value.FirstTrainTime;
    var frequency = value.Frequency;
    
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);
    var currentTime = moment();
    
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");

    var tRemainder = diffTime % frequency;

    var minutesAway = frequency - tRemainder;

    var nextArrival = moment().add(minutesAway, "minutes").format("h:mm");



    var tableData = $("<tr>")
    tableData.append(`
    <td>${trainName}</td>
    <td>${destination}</td>
    <td>${frequency}</td>
    <td>${nextArrival}</td>
    <td>${minutesAway}</td>
    `)
    $("#trainData").append(tableData);
})





})
