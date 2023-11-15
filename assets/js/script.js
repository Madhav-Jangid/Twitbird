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

var flag = true
function ViewLeftNav(){
    var leftNav = document.querySelector('.left-nav');   
    if(flag){
        leftNav.style.left = '-200px';
    }else{
        leftNav.style.left = '0';
    }
    flag = !flag;
}


