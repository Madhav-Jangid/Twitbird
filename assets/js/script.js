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
    changeRoute(sect)
}
function changeRoute(sect) {
    document.title = capitalize(sect) + ' / X';
    // window.location.hash = sect.toLowerCase();
}

var flag = false
function ViewLeftNav() {
    console.log('Left Nav')
    var leftNav = document.querySelector('#shortScreenNav');
    if (flag) {
        leftNav.style.display = 'none';
    } else {
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
        Following.style.boxShadow = '5px 5px 9px var(--insetmorphDark),-5px -5px 9px var(--morphLight)';
        ForYou.style.boxShadow = 'inset 5px 5px 9px var(--insetmorphDark),inset -5px -5px 9px var(--morphLight)';
        Following.style.textUnderlineOffset = '10px';
        ForYou.style.textDecoration = 'none';
        Following.style.color = 'var(--black)';
        ForYou.style.color = 'var(--black)';
    } else {
        ForYou.style.textDecoration = '5px underline var(--blue)';
        ForYou.style.boxShadow = '5px 5px 9px var(--insetmorphDark),-5px -5px 9px var(--morphLight)';
        ForYou.style.textUnderlineOffset = '10px';
        Following.style.boxShadow = 'inset 5px 5px 9px var(--insetmorphDark),inset -5px -5px 9px var(--morphLight)';
        Following.style.textDecoration = 'none';
        Following.style.color = 'var(--black)';
        ForYou.style.color = 'var(--black)';
    }
    section.style.display = 'flex';
}


const changeThemeButton = document.getElementById('changeThemeButton');

var changeThemeButtonFlag = true;
const root = document.documentElement;
if (changeThemeButton) {
    changeThemeButton.addEventListener('click', function () {
        console.log('Button Clicked!');
        if (changeThemeButtonFlag) {
            root.style.setProperty('--white', '#111');
            root.style.setProperty('--black', '#fff');
            root.style.setProperty('--outsideMorphDark', '#000000');
            root.style.setProperty('--morphLight', '#65656566');
            root.style.setProperty('--insetmorphDark', '#000000');
            root.style.setProperty('--textColorLightMod', '#e5e5e5db');
            root.style.setProperty('--textColorDarkMod', '#000000db');
        } else {
            root.style.setProperty('--white', '#e0e0e0');
            root.style.setProperty('--black', '#000');
            root.style.setProperty('--outsideMorphDark', '#8b8b8b');
            root.style.setProperty('--morphLight', '#ffffff');
            root.style.setProperty('--insetmorphDark', '#838383');
            root.style.setProperty('--textColorLightMod', '#000000db');
            root.style.setProperty('--textColorDarkMod', '#e5e5e5db');
        }
        changeThemeButtonFlag = !changeThemeButtonFlag;
    })
}

const scrollableDiv = document.getElementById('allMessagesFromDatabase');
if (scrollableDiv) {
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}



function createPopUpFromLeft(content, Color) {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'popUpDiv';
    if (Color) {
        mainDiv.style.backgroundColor = 'rgb(19, 243, 120)';
    } else {
        mainDiv.style.backgroundColor = 'rgb(255, 52, 52)';
    }
    const text = document.createElement('h3');
    text.innerHTML = content;

    mainDiv.appendChild(text);

    document.body.appendChild(mainDiv);

    mainDiv.style.animation = 'PopUp 3.5s ease-in-out 1';

    setTimeout(() => {
        document.body.removeChild(mainDiv);
    }, 3500);
}


const post_btn = document.getElementById('post-btn');
const tweetInput = document.getElementById('tweetInput');
const homeew = document.getElementById('home');

if (post_btn) {
    post_btn.addEventListener('click', function () {
        Dispaly('home')
        tweetInput.focus();
    })
}


const TweetFormPostTweetDiv = document.getElementById('TweetForm');

function showHomePage(ctx) {
    Dispaly('home');
}

function showExplorePage(ctx) {
    Dispaly('explore');
}

function showNotificationsPage(ctx) {
    Dispaly('notifications');
}

function showMessagesPage(ctx) {
    Dispaly('messages');
}

function showPremiumPage(ctx) {
    Dispaly('premium');
}

function showprofilePage(ctx) {
    Dispaly('profile');
}

function showPostPage(ctx) {
    Dispaly('post');
}

function showMorePage(ctx) {
    Dispaly('more');
}


page('/Home', showHomePage);
page('/Explore', showExplorePage);
page('/Notifications', showNotificationsPage);
page('/Messages', showMessagesPage);
page('/Premium', showPremiumPage);
page('/Profile', showprofilePage);
page('/More', showMorePage);
page('/Post', showPostPage); 

// Handle route changes
page({ hashbang: true });

