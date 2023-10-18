function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Dispaly(sect){
    const section = document.getElementById(sect);
    const sectionclass = document.querySelectorAll('.section');
    
    sectionclass.forEach((item) =>{
        item.style.display = 'none';
    }) 
    section.style.display = 'block';
    
    document.title = capitalize(sect)+' / X';
}