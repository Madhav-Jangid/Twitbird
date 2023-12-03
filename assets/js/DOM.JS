import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, get, update, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// import { createHash } from 'crypto';
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

document.addEventListener('DOMContentLoaded', function () {
    const userData1 = myObject; // Call the function with an event object if needed
    const CurrentUserId = userData1.UID;
    var CurrentUserName = 'myObjectID';
    if (CurrentUserId) {
        const userRef = ref(db, 'UserAuthList/' + CurrentUserId);
        var userData;
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    userData = snapshot.val();
                    CurrentUserName = userData.Username;
                    ProceedDomChanging(userData);
                } else {
                    console.error('User data does not exist');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }
    else {
        alert('myObject.UID is undefined');
        window.location.href = 'index.html';
    }

    // Set up a listener for database changes
    function ProceedDomChanging(userData) {
        const dbRef = ref(db);
        onValue(dbRef, load);
        console.log('Dom is working');
        const currentDate = new Date().toLocaleDateString();

        // async function hashString(inputString) {
        //     const encoder = new TextEncoder();
        //     const data = encoder.encode(inputString);
        //     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        //     const hashArray = Array.from(new Uint8Array(hashBuffer));
        //     const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        //     return hashHex;
        //   }

        //   // Example usage
        //   const inputString = 'Madhav';
        //   hashString(inputString)
        //     .then(hash => console.log(hash))
        //     .catch(error => console.error(error));

        const verifiedTick = `<svg width="24" height="24" viewBox="0 0 24 24" fill="rgb(0, 157, 255)" xmlns="http://www.w3.org/2000/svg"><path d="M18.9905 19H19M18.9905 19C18.3678 19.6175 17.2393 19.4637 16.4479 19.4637C15.4765 19.4637 15.0087 19.6537 14.3154 20.347C13.7251 20.9374 12.9337 22 12 22C11.0663 22 10.2749 20.9374 9.68457 20.347C8.99128 19.6537 8.52349 19.4637 7.55206 19.4637C6.76068 19.4637 5.63218 19.6175 5.00949 19C4.38181 18.3776 4.53628 17.2444 4.53628 16.4479C4.53628 15.4414 4.31616 14.9786 3.59938 14.2618C2.53314 13.1956 2.00002 12.6624 2 12C2.00001 11.3375 2.53312 10.8044 3.59935 9.73817C4.2392 9.09832 4.53628 8.46428 4.53628 7.55206C4.53628 6.76065 4.38249 5.63214 5 5.00944C5.62243 4.38178 6.7556 4.53626 7.55208 4.53626C8.46427 4.53626 9.09832 4.2392 9.73815 3.59937C10.8044 2.53312 11.3375 2 12 2C12.6625 2 13.1956 2.53312 14.2618 3.59937C14.9015 4.23907 15.5355 4.53626 16.4479 4.53626C17.2393 4.53626 18.3679 4.38247 18.9906 5C19.6182 5.62243 19.4637 6.75559 19.4637 7.55206C19.4637 8.55858 19.6839 9.02137 20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19Z" stroke="rgb(0, 157, 255)" stroke-width="1.5"/>
          <path d="M9 12.8929C9 12.8929 10.2 13.5447 10.8 14.5C10.8 14.5 12.6 10.75 15 9.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;

        const Following = document.querySelector('Following');
        const Followers = document.querySelector('Followers');
        Following.innerHTML = userData.Following;
        Followers.innerHTML = userData.Followers;
        var Reach = document.querySelectorAll('.ReachListsProfile');
        Reach.forEach(element => {
            element.addEventListener('click', function () {
                createReachList(CurrentUserId);
            })
        });


        const NameOfuser = userData.Name;
        const IdofUser = '@' + userData.Username;
        const userName = document.querySelectorAll('.ProfileTopNavName');
        const userID = document.querySelectorAll('.useridhome');

        userName.forEach(element => {
            element.innerHTML = `${NameOfuser} ${verifiedTick}`;
        });

        userID.forEach(element => {
            element.innerHTML = IdofUser;
        });

        const ExploreSearchIcon = document.getElementById('ExploreSearchBtn');
        const searchInput = document.getElementById('ExploreSearch');
        ExploreSearchIcon.addEventListener('click', function () {
            const username = searchInput.value.trim().toLowerCase();
            searchUser(username, false);
        });
        searchInput.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                const username = searchInput.value.trim().toLowerCase();
                searchUser(username, false);
            }
        });

        function searchUser(TempName, FromMessageBlock) {
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
                                if (uid != CurrentUserId) {
                                    if (userData.FollowersList) {
                                        if (userData.FollowersList.includes(CurrentUserId)) {
                                            CreateUserDiv(userData.Name, userData.Username, uid, true, FromMessageBlock);
                                        } else {
                                            CreateUserDiv(userData.Name, userData.Username, uid, false, FromMessageBlock);
                                        }
                                    } else {
                                        CreateUserDiv(userData.Name, userData.Username, uid, false, FromMessageBlock);
                                    }
                                } else {
                                    alert("Don't Search You self")
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


        function CreateUserDiv(Name, Username, uid, cond, FromMessageBlock) {
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
            if (FromMessageBlock) {
                followButton.textContent = 'Start Chat';
                followButton.style.backgroundColor = 'var(--blue)';
                followButton.addEventListener('click', function () {
                    DispalyMessagesInChat(Username);
                    LoadMessages(uid);
                });
            } else {
                if (cond) {
                    followButton.textContent = 'Unfollow';
                    followButton.style.backgroundColor = 'var(--bluehover)';
                    followButton.addEventListener('click', function () {
                        updateFollowers(followButton);
                    });
                }
                else {
                    followButton.textContent = 'Follow';
                    followButton.style.backgroundColor = 'var(--blue)';
                    followButton.addEventListener('click', function () {
                        updateFollowers(followButton);
                    });
                }
            }
            usernamesDiv.appendChild(nameHeading);
            usernamesDiv.appendChild(usernameHeading);
            searchedUserDiv.appendChild(usernamesDiv);
            searchedUserDiv.appendChild(followButton);
            let SearchedusersMessages = document.getElementById('SearchedusersMessages');
            if (FromMessageBlock) {
                SearchedusersMessages.appendChild(searchedUserDiv);
            } else {
                searchedUsersContainer.appendChild(searchedUserDiv);
            }
            usernamesDiv.addEventListener('click', function () {
                DisplayUserInfo(searchedUserDiv.id);
            });
            return searchedUserDiv;
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

                        var ReachLists = document.querySelectorAll('.ReachLists');
                        ReachLists.forEach(element => {
                            element.addEventListener('click', function () {
                                createReachList(uid)
                            })
                        });

                        var TopName = document.querySelectorAll('.ReachListNameTop');
                        TopName.forEach(element => {
                            element.innerHTML = `<i onclick="Dispaly('explore')" class='bx bxs-left-arrow-alt'></i> ${'@' + userData.Username}`
                        });
                        Dispaly('Searcheduser');
                    } else {
                        alert("User data not found");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });

        }

        var FlagToVerify = true;
        function updateFollowers(element) {
            if (element.textContent == 'Unfollow') {
                FlagToVerify = false;
            }
            if (FlagToVerify) {
                element.style.backgroundColor = 'var(--bluehover)';
                element.textContent = 'Unfollow';
                GetIDbyUsername(true, element.id, false);
            } else {
                element.style.backgroundColor = 'var(--blue)';
                element.textContent = 'Follow';
                GetIDbyUsername(false, element.id, false);
            }

            FlagToVerify = !FlagToVerify;
        }

        async function GetIDbyUsername(cnd, username, onlyUID) {
            const usersRef = ref(getDatabase(), 'UserAuthList');
            try {
                const snapshot = await get(usersRef);
                const users = snapshot.val();

                if (users) {
                    const matchingUsers = Object.entries(users)
                        .filter(([uid, userData]) => userData.Username.toLowerCase() === username);

                    if (matchingUsers.length > 0) {
                        const [uid, userData] = matchingUsers[0];

                        if (onlyUID) {
                            return uid;
                        } else {
                            updateFollowersInDataBase(cnd, uid);
                            UpdateFollowerList(cnd, uid);
                        }
                    } else {
                        alert('User Not Found');
                    }
                }
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
                            var currentFollowers = snapshot.val().Followers || 0;
                            var newValue
                            if (currentFollowers == 0) {
                                newValue = cnd ? currentFollowers + 1 : currentFollowers = 1;
                            } else if (currentFollowers > 0) {
                                newValue = cnd ? currentFollowers + 1 : currentFollowers - 1;
                            }
                            update(userRef, { [fieldToUpdate]: newValue })
                                .then(() => {
                                    // console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
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

                    // console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
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
                        newValue = [...currentNotifications, `${CurrentUserName} has followed you on ${currentDate}. `];
                    } else {
                        newValue = [...currentNotifications, `${CurrentUserName} has Unfollowed you on ${currentDate}.`];
                    }
                    await update(userRef, { [fieldToUpdate]: newValue });
                    // console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
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
                        for (const Notification in notificationsData) {
                            const element = notificationsData[Notification];
                            var Notificationh4 = document.createElement('h4');
                            Notificationh4.innerHTML = element;
                            var NotificationDiv = document.getElementById('allNotifications')
                            NotificationDiv.append(Notificationh4);
                        }
                    }
                    // else {
                    //     console.log('No data found in Notifications node');
                    // }
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
                                    // console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
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

        async function UpdateFollowingList(cnd, id) {
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

                    // console.log(`${fieldToUpdate} updated successfully for user ${userId}`);
                } else {
                    console.error('User data does not exist');
                }
            } catch (error) {
                console.error('Error updating followers:', error);
            }
        }

        SuggestPeoplesToFollow()
        function SuggestPeoplesToFollow() {
            const mainSuggetionDiv = document.createElement('div');
            mainSuggetionDiv.id = 'mainSuggetionDiv';
            const headingOfDiv = document.createElement('h4');
            headingOfDiv.innerHTML = 'Suggestions';
            headingOfDiv.id = 'headingOfDiv';
            mainSuggetionDiv.appendChild(headingOfDiv)
            const userRef = ref(db, 'UserAuthList/');
            let DataObject;
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        var userKeys = Object.keys(userData);
                        userKeys = userKeys.filter(item => item !== CurrentUserId);
                        if (userKeys.length > 1) {
                            for (var i = 0; i < 3; i++) {
                                var secondUserId = userKeys[i];
                                var secondUserObject = userData[secondUserId];
                                DataObject = { ...secondUserObject };
                                if (DataObject.FollowersList) {
                                    if (DataObject.FollowersList.includes(CurrentUserId)) {
                                        let Person = CreateUserDiv(DataObject.Name, DataObject.Username, secondUserId, true);
                                        mainSuggetionDiv.appendChild(Person)
                                    } else {
                                        let Person = CreateUserDiv(DataObject.Name, DataObject.Username, secondUserId, false);
                                        mainSuggetionDiv.appendChild(Person)
                                    }
                                }
                                else {
                                    if (DataObject.Username != undefined) {
                                        let Person = CreateUserDiv(DataObject.Name, DataObject.Username, secondUserId, false);
                                        mainSuggetionDiv.appendChild(Person)
                                    }
                                }
                            }
                            var ExplreSuggestionDiv = document.getElementById('ExplreSuggestionDiv');
                            ExplreSuggestionDiv.appendChild(mainSuggetionDiv)
                        } else {
                            console.error('Not enough users in UserAuthList');
                        }
                    } else {
                        console.error('User data does not exist');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });

        }

        function createReachList(uid) {
            const FollowingListDiv = document.getElementById('followingsOfUser');
            const FollowersListDiv = document.getElementById('followersOfUser');
            FollowersListDiv.innerHTML = `<h2>Followers</h2>`;
            FollowingListDiv.innerHTML = `<h2>Following</h2>`;
            const userRef = ref(db, `UserAuthList/${uid}`);
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        if (userData.FollowersList && Array.isArray(userData.FollowersList)) {
                            userData.FollowersList.forEach(element => {
                                const userRef = ref(db, 'UserAuthList/' + element);
                                get(userRef)
                                    .then((snapshot) => {
                                        if (snapshot.exists()) {
                                            const userData = snapshot.val();
                                            const searchedUserDiv = CreateUserDiv(userData.Name, userData.Username);

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
                            userData.FollowingList.forEach(element => {
                                const userRef = ref(db, 'UserAuthList/' + element);
                                get(userRef)
                                    .then((snapshot) => {
                                        if (snapshot.exists()) {
                                            const userData = snapshot.val();
                                            const searchedUserDiv = CreateUserDiv(userData.Name, userData.Username);
                                            FollowingListDiv.appendChild(searchedUserDiv); // Corrected variable name
                                        } else {
                                            console.error('User data does not exist');
                                        }
                                    })
                                    .catch((error) => {
                                        console.error('Error fetching user data:', error);
                                    });
                            });
                        }
                        Dispaly('ReachList');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }

        async function createTweetinDatabase(username, tweetMessage) {
            const userId = CurrentUserId;
            const message = tweetMessage;
            const fieldToUpdate = 'Tweet_list';
            const userRef = ref(db, `UserAuthList/${userId}`);
            try {
                const snapshot = await get(userRef);
                const idOFTweet = new Date().toLocaleDateString();
                const TweetsForDatabase = {
                    Tweet: message,
                    Likes: 0,
                    Comments: [],
                    Postedon: idOFTweet
                }
                if (snapshot.exists()) {
                    const allTweets = snapshot.val().Tweet_list || [];
                    let newValue = [...allTweets, TweetsForDatabase];
                    await update(userRef, { [fieldToUpdate]: newValue })
                        .then(() => {
                            tweetInput.value = '';
                            createTweetElement(username, message)
                        })
                        .catch((error) => {
                            alert('Error Psoting while Posting Tweet Please try again.');
                            console.error(error)
                        });
                } else {
                    alert('User data does not exist');
                }
            } catch (error) {
                console.error('Error updating Tweets:', error);
            }
        }

        async function likeOrDislikeTweet(uid, tweetId, like) {
            const userId = uid;
            const fieldToUpdate = `Tweet_list/${tweetId}/Likes`;
            const userRef = ref(db, `UserAuthList/${userId}/Tweet_list/${tweetId}`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const currentLikes = snapshot.val().Likes || 0;
                    const newValue = like ? currentLikes + 1 : currentLikes - 1;
                    await update(userRef, { Likes: newValue });
                    console.log(`Tweet ${tweetId} ${like ? 'liked' : 'disliked'} successfully`);
                } else {
                    console.error(`Tweet ${tweetId} does not exist`);
                }
            } catch (error) {
                console.error(`Error updating likes for tweet ${tweetId}:`, error);
            }
        }

        var PostTweet = document.getElementById('postTweet');
        var tweetInput = document.getElementById('tweetInput');
        var alltweetsbyUserOnly = document.getElementById('alltweetsbyUserOnly');
        var allTweetsbyuseranddb = document.getElementById('allTweetsbyuseranddb');
        const FollowingListTweets = document.getElementById('FollowingListTweets');


        PostTweet.addEventListener('click', function () {
            var TweetMessage = tweetInput.value;
            if (TweetMessage) {
                let tweetDiv = createTweetinDatabase(CurrentUserName, TweetMessage);
                alltweetsbyUserOnly.appendChild(tweetDiv);
            } else {
                alert('Enter Something')
            }
        })

        async function createTweetElement(username, tweetText) {

            const tweetDiv = document.createElement('div');
            tweetDiv.className = 'tweetDiv';

            const usernameElement = document.createElement('h4');
            usernameElement.className = 'username';
            usernameElement.textContent = '@' + username;

            const tweetTextElement = document.createElement('div');
            tweetTextElement.className = 'tweetText';
            tweetTextElement.textContent = tweetText;

            const tweetIntractionDiv = document.createElement('div');
            tweetIntractionDiv.className = 'tweetIntraction';

            const heartIcon = document.createElement('i');
            heartIcon.className = 'bx bx-heart';
            tweetIntractionDiv.appendChild(heartIcon);

            const commentIcon = document.createElement('i');
            commentIcon.className = 'bx bx-comment';
            tweetIntractionDiv.appendChild(commentIcon);

            const shareIcon = document.createElement('i');
            shareIcon.className = 'bx bx-share-alt';
            tweetIntractionDiv.appendChild(shareIcon);

            tweetDiv.appendChild(usernameElement);
            tweetDiv.appendChild(tweetTextElement);
            tweetDiv.appendChild(tweetIntractionDiv);
            const uidToCheck = await GetIDbyUsername(false, username, true);
            const followerUid = CurrentUserId;

            if (allTweetsbyuseranddb && FollowingListTweets) {
                const followingListRef = ref(db, `UserAuthList/${followerUid}/FollowingList`);
                get(followingListRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const followingList = snapshot.val();
                        if (followingList && Object.values(followingList).includes(uidToCheck)) {
                            FollowingListTweets.innerHTML = '';
                            FollowingListTweets.appendChild(tweetDiv);
                        } else {
                            // console.log('User is not in the following list');
                        }
                    } else {
                        console.warn(`The following list for ${followerUid} does not exist.`);
                    }

                    // Regardless of the conditions, always append to allTweetsbyuseranddb
                    allTweetsbyuseranddb.appendChild(tweetDiv);
                }).catch((error) => {
                    console.error("Error checking following list:", error);
                });
            } else {
                console.error('Container element not found: FollowingListTweets or allTweetsbyuseranddb');
            }

            return tweetDiv;
        }

        // async function LoadHomeTweets() {
        //     const tweetListdb = ref(db, `UserAuthList/`);
        //     get(tweetListdb).then((snapshot) => {
        //         if (snapshot.exists()) {
        //             const tweetList = snapshot.val();
        //             for(const user in tweetList){
        //                 console.log(user)
        //             }
        //         } else {
        //             console.error(`The Tweet_list does not exist.`);
        //         }
        //     }).catch((error) => {
        //         console.error("Error checking following list:", error);
        //     });
        // }

        LoadTweetFromDataBase()
        function LoadTweetFromDataBase() {
            const userRef = ref(db, 'UserAuthList/');
            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        var jsObject = snapshot.val();
                        for (const key in jsObject) {
                            if (jsObject.hasOwnProperty(key) && jsObject[key].hasOwnProperty('Tweet_list')) {
                                const tweetList = jsObject[key]['Tweet_list'];
                                for (const key2 in tweetList) {
                                    // console.log(tweetList[key2].Tweet )
                                    // console.log(jsObject[key].Username)
                                    createTweetElement(jsObject[key].Username, tweetList[key2].Tweet)
                                }

                            }
                        }
                    } else {
                        console.error('User data does not exist');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }

        async function createMessageInDatabase(senderUid, receiverUid, messageToSend) {
            const senderFieldToUpdate = `/Messages/${receiverUid}`;
            const receiverFieldToUpdate = `/Messages/${senderUid}`;

            const senderUserRef = ref(db, `UserAuthList/${senderUid}`);
            const receiverUserRef = ref(db, `UserAuthList/${receiverUid}`);

            try {
                const senderSnapshot = await get(senderUserRef);
                const senderMessagesForDatabase = [messageToSend];

                if (senderSnapshot.exists()) {
                    const senderUserData = senderSnapshot.val();
                    const senderMessagesArray = senderUserData.Messages && senderUserData.Messages[receiverUid]
                        ? senderUserData.Messages[receiverUid]
                        : [];
                    const updatedSenderMessages = [...senderMessagesArray, ...senderMessagesForDatabase];
                    await update(senderUserRef, { [senderFieldToUpdate]: updatedSenderMessages });
                } else {
                    console.error('Sender data does not exist');
                    return; // Exit the function if sender data does not exist
                }

                // Update receiver's messages
                const receiverSnapshot = await get(receiverUserRef);
                const receiverMessagesForDatabase = [messageToSend];

                if (receiverSnapshot.exists()) {
                    const receiverUserData = receiverSnapshot.val();
                    const receiverMessagesArray = receiverUserData.Messages && receiverUserData.Messages[senderUid]
                        ? receiverUserData.Messages[senderUid]
                        : [];
                    const updatedReceiverMessages = [...receiverMessagesArray, ...receiverMessagesForDatabase];
                    await update(receiverUserRef, { [receiverFieldToUpdate]: updatedReceiverMessages });
                } else {
                    console.error('Receiver data does not exist');
                }
            } catch (error) {
                console.error('Error updating messages:', error);
            }
        }

        var SearchedusersMessages = document.getElementById('SearchedusersMessages');
        var ExploreSearchMessages = document.getElementById('ExploreSearchMessages');
        var ExploreSearchBtnMessages = document.getElementById('ExploreSearchBtnMessages');

        ExploreSearchBtnMessages.addEventListener('click', function () {
            let InputOfUser = ExploreSearchMessages.value;
            searchUser(InputOfUser, true);
            LoadMessages
        })

        async function DispalyMessagesInChat(InputOfUser) {
            var ChatBlockH1 = document.getElementById('ChatBlockH1');
            ChatBlockH1.textContent = InputOfUser;
            Dispaly('ChatBlock')
            var ChatBlockInput = document.getElementById('ChatBlockInput');
            var ChatBlockSendBlock = document.getElementById('ChatBlockSendBlock');


            ChatBlockInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    var Message = ChatBlockInput.value;
                    if (Message.length != 0) {
                        ChatBlockInput.value = '';
                        createMessageInDatabase(CurrentUserId, UIDofMessenger, Message);
                    }
                }
            });


            var UIDofMessenger = await GetIDbyUsername(false, InputOfUser, true);
            ChatBlockSendBlock.addEventListener('click', function () {
                var Message = ChatBlockInput.value;
                if (Message.length != 0) {
                    ChatBlockInput.value = '';
                    createMessageInDatabase(CurrentUserId, UIDofMessenger, Message);
                }
            })
        }

        var CurrentChatUserChatUid;
        function LoadMessages(userId) {
            CurrentChatUserChatUid = userId;
            var allMessagesFromDatabaseDiv = document.getElementById('allMessagesFromDatabase');
            allMessagesFromDatabaseDiv.innerHTML = ''
            var messageId = CurrentUserId;
            if (userId && messageId) {
                const userRef = ref(db, `UserAuthList/${userId}/Messages/${messageId}`);
                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const message = snapshot.val();
                            var flag = true;
                            message.forEach(element => {
                                const h3 = document.createElement('h3');
                                const msgdivuser = document.createElement('div');
                                const msgdivusersender = document.createElement('div');
                                msgdivuser.classList.add('messageDivDatabaseuser')
                                msgdivusersender.classList.add('messageDivDatabasesender')
                                h3.innerHTML = element;
                                if(flag){
                                    h3.classList.add('user')
                                    msgdivuser.appendChild(h3)
                                    allMessagesFromDatabaseDiv.appendChild(msgdivuser)
                                }else{
                                    h3.classList.add('sender')
                                    msgdivusersender.appendChild(h3)
                                    allMessagesFromDatabaseDiv.appendChild(msgdivusersender)
                                }
                                flag = !flag;
                            });
                        } else {
                            console.error('Message does not exist for user:', userId, 'and messageId:', messageId);
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching message data:', error);
                    });
            } else {
                // console.error('User ID or Message ID is undefined');
            }
        }


        ShowMessegedUsers()
        function ShowMessegedUsers() {
            if (CurrentUserId) {
                const userRef = ref(db, 'UserAuthList/' + CurrentUserId);
                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            let userData = snapshot.val();
                            if (userData.Messages) {
                                for (const user in userData.Messages) {
                                    let userRef = ref(db, 'UserAuthList/' + user);
                                    get(userRef)
                                        .then((snapshot) => {
                                            if (snapshot.exists()) {
                                                let userData = snapshot.val();
                                                var div = CreateUserDiv(userData.Name, userData.Username, user, false, true)
                                                SearchedusersMessages.appendChild(div)
                                            }
                                        })
                                }
                            } else {
                                var div = document.createElement('h5');
                                div.innerHTML = 'No Messages Yet. You can message by searching then.'
                                SearchedusersMessages.appendChild(div)
                            }
                        } else {
                            console.error('User data does not exist');
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                    });
            }
            else {
                alert('CurrentUserId is undefined');
            }
        }


        function load(snapshot) {
            LoadMessages(CurrentChatUserChatUid);
        }


    }
    // Dom Braces
});



// AFwRRMltttSmzNDjuTkKP7dePts2//main user
// ---> MessageList//message list under AFwRRMltttSmzNDjuTkKP7dePts2
// -------> krPIHPWUJTTdAFm5604AoMnDTXv1//uid of seconf=d user who is sending message to AFwRRMltttSmzNDjuTkKP7dePts2
// -----------> 0: "How are you"//send user krPIHPWUJTTdAFm5604AoMnDTXv1
// -----------> 1: "I am fine What about you ?"//send user AFwRRMltttSmzNDjuTkKP7dePts2
// -----------> 2: "I am also Fine Why dont come school today"//send user krPIHPWUJTTdAFm5604AoMnDTXv1
// -----------> 3: "i was sick"//send user AFwRRMltttSmzNDjuTkKP7dePts2