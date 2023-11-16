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
var SignUpusername = document.getElementById('SignUpUsername');
var SignUpEmail = document.getElementById('SignUpEmail');
var SignUpPass = document.getElementById('SignUpPass');

let userData = {}; // Initialize an empty object to store user data

let RegisterUser = evt => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, SignUpEmail.value, SignUpPass.value)
        .then((credentials) => {
            const userRef = ref(db, 'UserAuthList/' + credentials.user.uid);
            
            // Set user data in the Realtime Database
            set(userRef, {
                Name: SignUpName.value,
                Username: SignUpusername.value,
                Email: SignUpEmail.value,
                Password: SignUpPass.value
            });

            // Retrieve user data from the Realtime Database
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        userData = snapshot.val();
                        console.log(userData); // Log the user data
                    } else {
                        alert('User data does not exist');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });

            alert('Account Created Successfully. Now go to the login page');
            DisplaySection('LoginSeciton');
        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('SignUpForm').addEventListener('submit', RegisterUser);
})

function DisplaySection(sect) {
    const section = document.getElementById(sect);
    const sectionclass = document.querySelectorAll('.loginDiv');

    sectionclass.forEach((item) => {
        item.style.display = 'none';
    })
    section.style.display = 'flex';
}

export { userData };
