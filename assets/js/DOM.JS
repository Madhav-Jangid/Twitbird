import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBm3UC_TCpO0Y_yUFnG3nQNjdZeir3wqX4",
    authDomain: "clone-of-x.firebaseapp.com",
    databaseURL: "https://clone-of-x-default-rtdb.firebaseio.com",
    projectId: "clone-of-x",
    storageBucket: "clone-of-x.appspot.com",
    messagingSenderId: "309786442519",
    appId: "1:309786442519:web:bcd80e8ac6be220b64d552"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);


import { myObject } from "./Login.js";
document.addEventListener('DOMContentLoaded', async function () {
    const CurrentUserId = myObject.UID;
    const CurrentUserName = myObject.ID;
    if (CurrentUserId) {
        console.log(CurrentUserId);
    } else {
        console.log('myObject.UID is undefined');
    }

    const userRef = ref(db, 'UserAuthList/' + CurrentUserId);
    var userData;
    get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                userData = snapshot.val();
                ProceedDomChanging(userData);
            } else {
                console.error('User data does not exist');
            }
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });


    function ProceedDomChanging(userData) {
        console.log('Dom.js is working. 👍', userData);

        const Following = document.querySelector('Following'); // Assuming these are classes, use a dot (.) for class selector
        const Followers = document.querySelector('Followers');

        Following.innerHTML = userData.Following;
        Followers.innerHTML = userData.Followers;

        const NameOfuser = userData.Name;
        const IdofUser = '@' + userData.Username;
        const userName = document.querySelectorAll('.ProfileTopNavName');
        const userID = document.querySelectorAll('.useridhome');

        userName.forEach(element => {
            element.innerHTML = NameOfuser;
        });

        userID.forEach(element => {
            element.innerHTML = IdofUser;
        });

        const ExploreSearchIcon = document.getElementById('ExploreSearchBtn');
        const searchInput = document.getElementById('ExploreSearch');
        ExploreSearchIcon.addEventListener('click', function () {
            const username = searchInput.value.trim().toLowerCase();
            searchUser(username);
        });

        function searchUser(TempName) {
            console.log('User Searched', TempName);
            if (TempName === "") {
                alert("Please enter a username");
                return;
            }
            const usersRef = ref(getDatabase(), 'UserAuthList');
            try {
                get(usersRef)
                    .then((snapshot) => {
                        const users = snapshot.val();
                        if (users) {
                            const matchingUsers = Object.entries(users)
                                .filter(([uid, userData]) => userData.Username.toLowerCase() === TempName);
                            if (matchingUsers.length > 0) {
                                const [uid, userData] = matchingUsers[0];
                                if(userData.FollowersList){
                                    if(userData.FollowersList.includes(CurrentUserId)){
                                        CreateUserDiv(userData.Name, userData.Username, uid ,true);
                                    }else{
                                        CreateUserDiv(userData.Name, userData.Username, uid, false);
                                    }
                                }else{
                                    CreateUserDiv(userData.Name, userData.Username, uid, false);
                                }
                                return uid;
                            } else {
                                alert('User Not Found');
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error searching username:', error);
                    });
            } catch (error) {
                console.error('Error searching username:', error);
            }
        }

        function CreateUserDiv(Name, Username, uid ,cond) {
            const searchedUsersContainer = document.getElementById('Searchedusers');
            const searchedUserDiv = document.createElement('div');
            searchedUserDiv.classList.add('Searcheduser');
            const usernamesDiv = document.createElement('div');
            usernamesDiv.classList.add('Usernames');
            searchedUserDiv.id = uid;
            const nameHeading = document.createElement('h3');
            nameHeading.textContent = Name;
            const usernameHeading = document.createElement('h5');
            usernameHeading.textContent = '@' + Username;
            const followButton = document.createElement('button');
            followButton.classList.add('FollowUser');
            followButton.id = Username;
            if(cond){
                followButton.textContent = 'Followed';
                followButton.style.backgroundColor = 'var(--bluehover)';
                followButton.addEventListener('click', function () {
                    updateFollowers(followButton);
                });
            }
            else{
                followButton.textContent = 'Follow';
                followButton.style.backgroundColor = 'var(--blue)';
                followButton.addEventListener('click', function () {
                    updateFollowers(followButton);
                });
            }
            usernamesDiv.appendChild(nameHeading);
            usernamesDiv.appendChild(usernameHeading);
            searchedUserDiv.appendChild(usernamesDiv);
            searchedUserDiv.appendChild(followButton);
            searchedUsersContainer.appendChild(searchedUserDiv);

            usernamesDiv.addEventListener('click', function () {
                DisplayUserInfo(searchedUserDiv.id);
            });
        }
        

        function DisplayUserInfo(uid) {
            const userRef = ref(db, `UserAuthList/${uid}`);
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        const searchedFollowing = document.querySelector('searchedFollowing');
                        const searchedFollowers = document.querySelector('searchedFollowers');
                        searchedFollowing.innerHTML = userData.Following || 0;
                        searchedFollowers.innerHTML = userData.Followers || 0;
                        const NameOfuser = userData.Name;
                        const IdofUser = '@' + userData.Username;
                        const userName = document.querySelectorAll('.searchName');
                        const userID = document.querySelectorAll('.SearchUsername');
                        userName.forEach(element => {
                            element.innerHTML = NameOfuser;
                        });
                        userID.forEach(element => {
                            element.innerHTML = IdofUser;
                        });

                        const FollowingListDiv = document.getElementById('followingsOfUser');
                        const FollowersListDiv = document.getElementById('followersOfUser');

                        if (userData.FollowersList && Array.isArray(userData.FollowersList)) {
                            userData.FollowersList.forEach(element => {
                                const userRef = ref(db, 'UserAuthList/' + element);
                                get(userRef)
                                    .then((snapshot) => {
                                        if (snapshot.exists()) {
                                            const userData = snapshot.val();
                                            const searchedUserDiv = createUserDiv2(userData.Name, '@' + userData.Username);
                                            FollowersListDiv.appendChild(searchedUserDiv);
                                        } else {
                                            console.error('User data does not exist');
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error fetching user data:', error);
                                    });

                            });
                        }

                        if (userData.FollowingList && Array.isArray(userData.FollowingList)) {
                            userData.FollowersList.forEach(element => {
                                const userRef = ref(db, 'UserAuthList/' + element);
                                get(userRef)
                                    .then((snapshot) => {
                                        if (snapshot.exists()) {
                                            const userData = snapshot.val();
                                            const searchedUserDiv = createUserDiv2(userData.Name, '@' + userData.Username);
                                            FollowersListDiv.appendChild(searchedUserDiv);
                                        } else {
                                            console.error('User data does not exist');
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error fetching user data:', error);
                                    });

                            });
                        }

                        Dispaly('Searcheduser');
                    } else {
                        console.log("User data not found");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }

        // Function to create a user div
        function createUserDiv2(NameOfuser, username) {
            const searchedUserDiv = document.createElement('div');
            searchedUserDiv.classList.add('Searcheduser');
            searchedUserDiv.id = username;
            const usernamesDiv = document.createElement('div');
            usernamesDiv.classList.add('Usernames');
            const nameHeading = document.createElement('h3');
            nameHeading.textContent = NameOfuser;
            const usernameHeading = document.createElement('h5');
            usernameHeading.textContent = username;
            usernamesDiv.appendChild(nameHeading);
            usernamesDiv.appendChild(usernameHeading);
            searchedUserDiv.appendChild(usernamesDiv);
            return searchedUserDiv;
        }


        // Example usage:
        // Attach the event listeners in your main script
        // For example:
        // CreateUserDiv("John Doe", "john_doe", "uid1");
        // CreateUserDiv("Jane Doe", "jane_doe", "uid2");
        // ...

        // Make sure to replace "uid1", "uid2", etc., with actual UIDs.
        var FlagToVerify = true;
        function updateFollowers(element) {
            if(element.textContent == 'Followed'){
                FlagToVerify = false;
            }
            if (FlagToVerify) {
                element.style.backgroundColor = 'var(--bluehover)';
                element.textContent = 'Followed';
                GetIDbyUsername(true, element.id);
            } else {
                element.style.backgroundColor = 'var(--blue)';
                element.textContent = 'Follow';
                GetIDbyUsername(false, element.id);
            }

            FlagToVerify = !FlagToVerify;
        }

        function GetIDbyUsername(cnd, username) {
            const usersRef = ref(getDatabase(), 'UserAuthList');
            try {
                get(usersRef)
                    .then((snapshot) => {
                        const users = snapshot.val();
                        if (users) {
                            const matchingUsers = Object.entries(users)
                                .filter(([uid, userData]) => userData.Username.toLowerCase() === username);
                            if (matchingUsers.length > 0) {
                                const [uid, userData] = matchingUsers[0];
                                updateFollowersInDataBase(cnd, uid);
                                UpdateFollowerList(cnd, uid)
                            } else {
                                alert('User Not Found');
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Error searching username:', error);
                    });
            } catch (error) {
                console.error('Error searching username:', error);
            }
        }

        function updateFollowersInDataBase(cnd, id) {
            const userId = id;
            const fieldToUpdate = 'Followers';
            const userRef = ref(db, `UserAuthList/${userId}`);

            try {
                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const currentFollowers = snapshot.val().Followers || 0;
                            var newValue
                            if(currentFollowers == 0){
                                newValue = cnd ? currentFollowers + 1 : currentFollowers = 1;
                            }else if(currentFollowers > 0){
                                newValue = cnd ? currentFollowers + 1 : currentFollowers - 1;
                            }
                            update(userRef, { [fieldToUpdate]: newValue })
                                .then(() => {
                                    console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
                                })
                                .catch((error) => {
                                    console.error(`Error updating ${fieldToUpdate} for user ${userId}:`, error);
                                });
                        } else {
                            console.error('User data does not exist');
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                    });
            } catch (error) {
                console.error('Error updating followers:', error);
            }
        }

        async function UpdateFollowerList(cnd, id) {
            const userId = id;
            const fieldToUpdate = 'FollowersList';
            const userRef = ref(db, `UserAuthList/${userId}`);

            try {
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const currentFollowersList = snapshot.val().FollowersList || [];

                    let newValue;

                    if (cnd) {
                        newValue = [...currentFollowersList, CurrentUserId];
                        createNotifications(true, id);
                        UpdateFollowing(true);
                        UpdateFollowingList(true, id);
                    } else {
                        newValue = currentFollowersList.filter((followerId) => followerId !== CurrentUserId);
                        createNotifications(false, id);
                        UpdateFollowing(false);
                        UpdateFollowingList(false, id);
                    }

                    await update(userRef, { [fieldToUpdate]: newValue });

                    console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
                } else {
                    console.error('User data does not exist');
                }
            } catch (error) {
                console.error('Error updating followers:', error);
            }
        }

        async function createNotifications(cnd, id) {
            const userId = id;
            const fieldToUpdate = 'Notifications';
            const userRef = ref(db, `UserAuthList/${userId}`);

            try {
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const currentNotifications = snapshot.val().Notifications || [];

                    let newValue;

                    if (cnd) {
                        newValue = [...currentNotifications, `${CurrentUserName} has followed you.`];
                    } else {
                        newValue = [...currentNotifications, `${CurrentUserName} has Unfollowed you.`];
                    }
                    await update(userRef, { [fieldToUpdate]: newValue });
                    console.log(`${fieldToUpdate} updated successfully for user ${userId}`);


                } else {
                    console.error('User data does not exist');
                }
            } catch (error) {
                console.error('Error updating followers:', error);
            }

        }

        showNotificationOnPage()
        function showNotificationOnPage() {
            const userUID = CurrentUserId;
            const notificationsRef = ref(db, `UserAuthList/${userUID}/Notifications`);
            get(notificationsRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const notificationsData = snapshot.val();
                        console.log('Notifications Data:', notificationsData);
                        for (const Notification in notificationsData) {
                            const element = notificationsData[Notification];
                            var Notificationh4 = document.createElement('h4');
                            Notificationh4.innerHTML = element;
                            var NotificationDiv = document.getElementById('allNotifications')
                            NotificationDiv.append(Notificationh4);
                        }
                    } else {
                        console.log('No data found in Notifications node');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching Notifications data:', error);
                });
        }

        function UpdateFollowing(cnd) {
            const userId = CurrentUserId;
            const fieldToUpdate = 'Following';
            const userRef = ref(db, `UserAuthList/${userId}`);
            try {
                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const currentFollowers = snapshot.val().Following || 0;
                            const newValue = cnd ? currentFollowers + 1 : currentFollowers - 1;
                            update(userRef, { [fieldToUpdate]: newValue })
                                .then(() => {
                                    console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
                                })
                                .catch((error) => {
                                    console.error(`Error updating ${fieldToUpdate} for user ${userId}:`, error);
                                });
                        } else {
                            console.error('User data does not exist');
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                    });
            } catch (error) {
                console.error('Error updating Following:', error);
            }
        }

        async function UpdateFollowingList(cnd, id){
            const userId = CurrentUserId;
            const fieldToUpdate = 'FollowingList';
            const userRef = ref(db, `UserAuthList/${userId}`);

            try {
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    const currentFollowingList = snapshot.val().FollowingList || [];

                    let newValue;

                    if (cnd) {
                        newValue = [...currentFollowingList, id];
                    } else {
                        newValue = currentFollowingList.filter((followerId) => followerId !== id);
                    }

                    await update(userRef, { [fieldToUpdate]: newValue });

                    console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
                } else {
                    console.error('User data does not exist');
                }
            } catch (error) {
                console.error('Error updating followers:', error);
            }
        }

    }
});
