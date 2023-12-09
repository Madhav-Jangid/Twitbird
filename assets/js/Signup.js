import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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

var SignUpName = document.getElementById('SignUpName');
var SignUpUsername = document.getElementById('SignUpUsername');
var SignUpEmail = document.getElementById('SignUpEmail');
var SignUpPass = document.getElementById('SignUpPass');

let userData = {}; // Initialize an empty object to store user data

function registerUser(evt) {
    evt.preventDefault();

    const emailDefault = SignUpEmail.value.toLowerCase();
    const usernameDefault = SignUpUsername.value.toLowerCase();

    createUserWithEmailAndPassword(auth, emailDefault, SignUpPass.value)
        .then((credentials) => {
            const userRef = ref(db, `UserAuthList/${credentials.user.uid}`);

            // Set user data in the Realtime Database
            const defaultFollowers = 0;
            const defaultFollowing = 0;
            set(userRef, {
                Name: SignUpName.value,
                Username: usernameDefault,
                Email: emailDefault,
                Password: SignUpPass.value,
                Followers: defaultFollowers,
                Following: defaultFollowing,
                FollowersList: [],
                FollowingList: [],
                Notifications: []
            });

            // Retrieve user data from the Realtime Database
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        userData = snapshot.val();
                        console.log(userData); // Log the user data
                    } else {
                        createPopUpFromLeft('User data does not exist after registration');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    createPopUpFromLeft('Error fetching user data after registration');
                });

                createPopUpFromLeft('Account Created Successfully. Now go to the login page');
            displaySection('LoginSeciton');
        })
        .catch((err) => {
            createPopUpFromLeft(`Error!`);
            console.error(err.code);
            console.error(err.message);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('SignUpForm').addEventListener('submit', registerUser);
});

function displaySection(sect) {
    const section = document.getElementById(sect);
    const sectionClass = document.querySelectorAll('.loginDiv');

    sectionClass.forEach((item) => {
        item.style.display = 'none';
    });
    section.style.display = 'flex';
}

export { userData };
