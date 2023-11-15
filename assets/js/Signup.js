import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

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

let RegisterUser = evt => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, SignUpEmail.value, SignUpPass.value)
        .then((credentials) => {
            set(ref(db, 'UserAuthList/' + credentials.user.uid), {
                Name: SignUpName.value,
                Username: SignUpusername.value,
                Email: SignUpEmail.value,
                Password: SignUpPass.value
            })
            alert('Account Created Successfully. Now go to the login page');
        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        })
}
document.getElementById('SignUpForm').addEventListener('submit', RegisterUser);
