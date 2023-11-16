function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Dispaly(sect){
    const section = document.getElementById(sect);
    const sectionclass = document.querySelectorAll('.section');
    
    sectionclass.forEach((item) =>{
        item.style.display = 'none';
    }) 
    section.style.display = 'flex';
    
    document.title = capitalize(sect)+' / X';
}

var flag = false
function ViewLeftNav(){
    var navMenu = document.querySelector('#navMenu');   
    var leftNav = document.querySelector('.left-nav');   
    if(flag){
        navMenu.classList.remove('fa-regular','fa-circle-xmark');
        navMenu.classList.add('bx','bx-menu');
        leftNav.style.left = '-70px';
    }else{
        navMenu.classList.remove('bx','bx-menu');
        navMenu.classList.add('fa-regular','fa-circle-xmark');
        leftNav.style.left = '0';
    }
    flag = !flag;
}


var Following = document.querySelector('Following');
var Followers = document.querySelector('Followers');

Following.innerHTML = '0';
Followers.innerHTML = '0';

var NameOfuser = 'Username'
var IdofUser = '@'+'UserID'
var userName = document.querySelectorAll('.ProfileTopNavName');
var userID = document.querySelectorAll('.useridhome');

userName.forEach(element => {
    element.innerHTML = NameOfuser;
});

userID.forEach(element => {
    element.innerHTML = IdofUser;
});