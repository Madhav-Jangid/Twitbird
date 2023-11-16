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

import { myObject } from "./Login.js";
// import { userData } from "./Signup.js";


var retrievedValue = window.sharedValue;
console.log(retrievedValue);

document.addEventListener('DOMContentLoaded', function () {
    console.log('Dom.js is working. 👍');
    var Following = document.querySelector('Following');
    var Followers = document.querySelector('Followers');

    Following.innerHTML = '0';
    Followers.innerHTML = '0';

    var NameOfuser = myObject.Name;
    var IdofUser = '@' + myObject.ID;
    var userName = document.querySelectorAll('.ProfileTopNavName');
    var userID = document.querySelectorAll('.useridhome');

    userName.forEach(element => {
        element.innerHTML = NameOfuser;
        console.log(element)
    });

    userID.forEach(element => {
        element.innerHTML = IdofUser;
        console.log(element)
    });

    var ExploreSearchIcon = document.getElementById('ExploreSearchBtn');
    const searchInput = document.getElementById('ExploreSearch');
    const searchResult = document.getElementById('Searchedusers');
    ExploreSearchIcon.addEventListener('click', searchUser)

    async function searchUser() {
        console.log('Done Explore')
        const username = searchInput.value.trim();
        if (username === "") {
            alert("Please enter a username");
            return;
        }
        const usersRef = ref(getDatabase(), 'UserAuthList');
        try {
            const snapshot = await get(usersRef);
            const users = snapshot.val();
            if (users) {
                const matchingUsers = Object.entries(users)
                    .filter(([uid, userData]) => userData.Username === username);
                if (matchingUsers.length > 0) {
                    const [uid, userData] = matchingUsers[0];
                    CreateUserDiv(userData.Name, userData.Username)
                } else {
                    alert('user Not Found')
                }
            }
        } catch (error) {
            console.error('Error searching username:', error);
        }
    }

    function CreateUserDiv(Name, Username) {
        const searchedUsersContainer = document.getElementById('Searchedusers');
        const searchedUserDiv = document.createElement('div');
        searchedUserDiv.classList.add('Searcheduser');
        const usernamesDiv = document.createElement('div');
        usernamesDiv.classList.add('Usernames');
        const nameHeading = document.createElement('h3');
        nameHeading.textContent = Name;
        const usernameHeading = document.createElement('h5');
        usernameHeading.textContent = '@' + Username;
        const followButton = document.createElement('button');
        followButton.classList.add('FollowUser');
        followButton.id = Username;
        followButton.textContent = 'Follow';
        usernamesDiv.appendChild(nameHeading);
        usernamesDiv.appendChild(usernameHeading);
        searchedUserDiv.appendChild(usernamesDiv);
        searchedUserDiv.appendChild(followButton);
        searchedUsersContainer.appendChild(searchedUserDiv);
    }
    var FollowButtons = document.querySelectorAll('.FollowUser');
    console.log(FollowButtons)
    FollowButtons.forEach(element => {
        element.addEventListener('click', function () {
            console.log("element clicked");
        })
    });

});
