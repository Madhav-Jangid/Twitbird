import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

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

// Get elements
const searchBtn = document.getElementById('srchbtn');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');

// Search user function
async function searchUser() {
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
                searchResult.innerHTML = `<p>User Found:</p><p>Name: ${userData.Name}</p><p>Username: ${userData.Username}</p> <p>${userData.Email}</p> <p>${userData.Password}</p>`;
            } else {
                searchResult.innerHTML = "<p>User not found.</p>";
            }
        }
    } catch (error) {
        console.error('Error searching username:', error);
    }
}

// Event listener for search button
searchBtn.addEventListener('click', searchUser);
