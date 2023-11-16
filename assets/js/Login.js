// Your code here

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBm3UC_TCpO0Y_yUFnG3nQNjdZeir3wqX4",
    authDomain: "clone-of-x.firebaseapp.com",
    databaseURL: "https://clone-of-x-default-rtdb.firebaseio.com",
    projectId: "clone-of-x",
    storageBucket: "clone-of-x.appspot.com",
    messagingSenderId: "309786442519",
    appId: "1:309786442519:web:bcd80e8ac6be220b64d552"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);



var UserNameGloabal;
var NameGloabal;
var LoginEmail = document.getElementById('LoginEmail');
var LoginPass = document.getElementById('LoginPass');

const myObject = {
    Name: '',
    ID: '',
};

var userData = 'data';

const SignInUser = (evt) => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, LoginEmail.value, LoginPass.value)
        .then((credentials) => {
            let uid = credentials.user.uid;
            const userRef = ref(db, 'UserAuthList/' + uid);
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        userData = snapshot.val();
                        UserNameGloabal = userData.Name;
                        NameGloabal = '@' + userData.Username;
                        myObject.Name = UserNameGloabal;
                        myObject.ID = NameGloabal;
                        window.location.href = 'Home.html';
                    } else {
                        alert('User data does not exist');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        });
};

document.addEventListener('DOMContentLoaded', function () {
    var LoginForm = document.getElementById('LoginForm');
    LoginForm.addEventListener('submit', SignInUser); // Change this line
});

export { myObject };

// var ExploreSearchBtn = document.getElementById('ExploreSearchBtn');
// ExploreSearchBtn.addEventListener('click', function () {
//     var ExploreSearch = document.getElementById('ExploreSearch');
//     var searchValue = ExploreSearch.value;
//     console.log(searchValue);
// });


var sharedValue = "Hello from File1!";
window.sharedValue = sharedValue;
