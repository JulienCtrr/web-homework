let i=0;
let col = ["#d8ad00", '#363432']
setInterval(() => {
        barre.style.backgroundColor = col[i]
        i = 1-i;
    }, 1000);