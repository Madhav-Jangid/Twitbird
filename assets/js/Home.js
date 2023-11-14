import { getUserData } from './Authentication.js';

var UserNameTopNav = document.querySelectorAll('.ProfileTopNavName');
var UserIdHome = document.querySelectorAll('.useridhome');

function updateUI(userData) {
    UserNameTopNav.forEach(element => {
        element.innerHTML = userData.Name;
        console.log(element);
    });

    UserIdHome.forEach(element => {
        element.innerHTML = userData.Username;
        console.log(element);
    });
}

getUserData()
    .then(userData => {
        updateUI(userData);
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
