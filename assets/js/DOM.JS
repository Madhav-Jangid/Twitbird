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

});
