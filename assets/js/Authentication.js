import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCe4mSeOoXEsQDt16vRcu5WMUhL2oJ0b1A",
    authDomain: "fir-project-6a499.firebaseapp.com",
    projectId: "fir-project-6a499",
    storageBucket: "fir-project-6a499.appspot.com",
    messagingSenderId: "760048625556",
    appId: "1:760048625556:web:2b4bf92c92157203b59181"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

let SignUpEmail = document.getElementById('SignUpEmail');
let SignUpPass = document.getElementById('SignUpPass');
let SignUpName = document.getElementById('SignUpName');
let SignUpNumber = document.getElementById('SignUpNumber');

let RegisterUser = evt => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, SignUpEmail.value, SignUpPass.value)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                Name: SignUpName.value,
                Number: SignUpNumber.value,
                Email: SignUpEmail.value,
                Password: SignUpPass.value
            };

            const userRef = ref(db, `UserAuthList/${user.uid}`);
            set(userRef, userData);

            console.log(user);
            alert('You Sucsessfuly Signed-In');
            window.location.href = 'Login.html';

        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        });
};
let SignInUser = evt => {
    evt.preventDefault();
    const email = LoginEmail.value;
    const password = LoginPass.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        });
};


if (document.title === 'Login / X') {
    document.getElementById('LoginForm').addEventListener('submit', SignInUser);
} else {
    document.getElementById('SignUpForm').addEventListener('submit', RegisterUser);
}