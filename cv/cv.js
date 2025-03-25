function changeColor() {
    barre.style.backgroundColor = "#363432";
    setTimeout(() => {
        barre.style.backgroundColor = "#d8ad00";
        setTimeout(changeColor, 1000);
    }, 1000);
}

changeColor();