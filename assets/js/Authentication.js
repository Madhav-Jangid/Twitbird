import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, set, ref , get} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmkKvDRKuBDx0hrxBc0Jcjrq5QFouatnY",
    authDomain: "clone-app-of-x.firebaseapp.com",
    databaseURL: "https://clone-app-of-x-default-rtdb.firebaseio.com",
    projectId: "clone-app-of-x",
    storageBucket: "clone-app-of-x.appspot.com",
    messagingSenderId: "978895274015",
    appId: "1:978895274015:web:85d75d76d9e6a092e5152a"
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
            console.log(credentials)
            set(ref(db, 'UserAuthList/' + credentials.user.uid), {
                Name: SignUpName.value,
                Username: SignUpusername.value,
                Email: SignUpEmail.value,
                Password: SignUpPass.value
            })
            alert('Account Sucsesfully Created');
            fetchAndPrintUserData(credentials.user.uid);

        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        })
}


var LoginEmail = document.getElementById('LoginEmail');
var LoginPass = document.getElementById('LoginPass');
let SignInUser = evt => {
    evt.preventDefault();
    signInWithEmailAndPassword(auth, LoginEmail.value, LoginPass.value)
        .then((credentials) => {
            console.log(credentials)
            fetchAndPrintUserData(credentials.user.uid);
        })
        .catch((err) => {
            alert(err.message);
            console.error(err.code);
            console.error(err.message);
        })
}

var UserNameTopNav = document.querySelectorAll('.UserNameMain');
var UserIdHome = document.querySelectorAll('.useridhome');
function fetchAndPrintUserData(uid) {
    const userRef = ref(db, 'UserAuthList/' + uid);
    get(userRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log('User Data:', userData.Username);
            UserNameTopNav.forEach(element => {
                element.innerHTML = userData.Name;
            });
            UserIdHome.forEach(element => {
                element.innerHTML = userData.Username;
            });     
            setTimeout(() => {
                window.location.href = 'Home.html';
            }, 1000);       
            console.log(UserIdHome,UserNameTopNav)
        } else {
                console.log('User data does not exist');
            }
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
}


if (document.title == 'Login / X') {
    document.getElementById('LoginForm').addEventListener('submit', SignInUser);
} else {
    document.getElementById('SignUpForm').addEventListener('submit', RegisterUser);
}