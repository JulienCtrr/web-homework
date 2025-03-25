let joueur;
let jeuActif;
const joueurs=["X", "O"];
let plateau;
const gagnants=[        
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];


function debutjeu (){
    jeuActif=true
    plateau=[[],[]];
    joueur=0;
    document.querySelectorAll('.case').forEach(cell => cell.innerText=".");
    document.querySelectorAll('.case').forEach(cell => cell.style.color="#ffffff");
    texteJoueur.innerText="c'est au joueur X de jouer";
    score.innerText=""
}
debutjeu()

function verifGagnant (){
    let fin=false
    for (const config of gagnants){
        if ((config.every(e => plateau[joueur].includes(e)))){
            fin=true
        }
    }
    if (fin) {
        score.innerText="Le Joueur "+[joueurs[joueur]]+" a gagné !";
        jeuActif=false
    }
} 

function caseclik (e){
    const index = parseInt(e.target.id.replace('c', '')) - 1;
    if ((plateau[0].includes(index)) || (plateau[1].includes(index)) || (!jeuActif)) {return;}
    plateau[joueur].push(index);
    e.target.innerText=joueurs[joueur];
    e.target.style.color="#2d343b";
    verifGagnant();
    joueur=1-joueur;
    texteJoueur.innerText="c'est au joueur "+joueurs[joueur]+" de jouer"
}

document.querySelectorAll('.case').forEach(cell => cell.addEventListener("click", caseclik));
btn.addEventListener("click", debutjeu)