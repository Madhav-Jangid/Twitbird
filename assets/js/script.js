function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Dispaly(sect) {
    const section = document.getElementById(sect);
    const sectionclass = document.querySelectorAll('.section');

    sectionclass.forEach((item) => {
        item.style.display = 'none';
    })
    section.style.display = 'flex';
    document.title = capitalize(sect) + ' / X';
}

var flag = false
function ViewLeftNav() {
    var leftNav = document.querySelector('.left-nav');
    if (flag) {
        navMenu.classList.remove('fa-regular', 'fa-circle-xmark');
        navMenu.classList.add('bx', 'bx-menu');
        leftNav.style.display = 'none';
    } else {
        navMenu.classList.remove('bx', 'bx-menu');
        navMenu.classList.add('fa-regular', 'fa-circle-xmark');
        leftNav.style.display = 'flex';
    }
    flag = !flag;
}

function Notification() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var Notificationh4 = document.createElement('h4');
    Notificationh4.innerHTML = `You Loggined on ${year}-${month}-${day} at ${hours}:${minutes}:${seconds}`;
    var NotificationDiv = document.getElementById('allNotifications')
    if (NotificationDiv) {
        NotificationDiv.append(Notificationh4)
    }
}
Notification()

function DisplaySection(sect) {
    const section = document.getElementById(sect);
    const sectionclass = document.querySelectorAll('.loginDiv');

    sectionclass.forEach((item) => {
        item.style.display = 'none';
    })
    section.style.display = 'flex';
}


function HomeSectionDiv(sect) {
    const section = document.getElementById(sect);
    const sectionclass = document.querySelectorAll('.Homediv');
    sectionclass.forEach((item) => {
        item.style.display = 'none';
    })
    var ForYou = document.getElementById('ForYou');
    var Following = document.getElementById('following');
    if (sect == 'FollowingListTweets') {
        Following.style.textDecoration = '5px underline var(--blue)';
        Following.style.textUnderlineOffset = '10px';
        ForYou.style.textDecoration = 'none';
        Following.style.color = '#fff';
        ForYou.style.color = '#666';
    } else {
        ForYou.style.textDecoration = '5px underline var(--blue)';
        ForYou.style.textUnderlineOffset = '10px';
        Following.style.textDecoration = 'none';
        Following.style.color = '#666';
        ForYou.style.color = '#fff';
    }
    section.style.display = 'flex';
}

const scrollableDiv = document.getElementById('allMessagesFromDatabase');
scrollableDiv.scrollTop = scrollableDiv.scrollHeight;