// Your web app's Firebase configuration
// Used to Grab onto Firebase -> Connection
var firebaseConfig = {
  apiKey: "AIzaSyA3xPNFL29iuvCo13xA9r1XGDYuMPm_zoY",
  authDomain: "wrm-firebase.firebaseapp.com",
  databaseURL: "https://wrm-firebase.firebaseio.com",
  projectId: "wrm-firebase",
  storageBucket: "wrm-firebase.appspot.com",
  messagingSenderId: "639060080667",
  appId: "1:639060080667:web:fc9f6f71f74441cf5120be",
  measurementId: "G-WDWGX4RBMP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

// Start grabbing our DOM Element
const submitBtn = document.querySelector("#submit");

let userName = document.querySelector("#userFullName");
let userEmail = document.querySelector("#userEmail");
let userMessage = document.querySelector("#userMessage");

const db = firestore.collection("contactData");

submitBtn.addEventListener('click', function() {
    let userNameInput = userName.value;
    let userEmailInput = userEmail.value;
    let userMessageInput = userMessage.value;

    // Access the Database Collection
    db.doc().set({
        name: userNameInput,
        email: userEmailInput,
        message: userMessageInput
    })
    .then(function() {
        console.log("Data Saved");
        location.href = "thankyou.html";
    })

    .catch(function(error) {
        console.log(error);
    });

});

// document.getElementById('submit').onclick = function() {
//     document.getElementById('submit').innerHTML = document.getElementById("userFullName").value;
//
// };
