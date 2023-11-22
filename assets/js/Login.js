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

const myObject = {
    UID: '',
    Name: '',
    ID: '',
};

document.addEventListener('DOMContentLoaded', function () {
    const SignInUser = async (evt) => {
        evt.preventDefault();
        try {
            const credentials = await signInWithEmailAndPassword(auth, LoginEmail.value, LoginPass.value);
            const uid = credentials.user.uid;
            const userRef = ref(db, 'UserAuthList/' + uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                myObject.UID = uid;
                myObject.Name = userData.Name;
                myObject.ID = '@' + userData.Username;
                window.location.href = 'Home.html';
            } else {
                alert('User data does not exist');
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
            console.error(err.code);
            console.error(err.message);
        }
    };

    var LoginForm = document.getElementById('LoginForm');
    LoginForm.addEventListener('submit', SignInUser);
});
export { myObject }
