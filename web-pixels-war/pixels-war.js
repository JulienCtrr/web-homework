// pour l'instant on ne peut pas y toucher depuis l'interface
// il faut recharger la page pour changer de carte
const PIXEL_URL = "https://pixels-war.oie-lab.net"

// c'est sans doute habile de commencer avec la carte de test
// const MAP_ID = "0000"
const MAP_ID = "TEST"

document.addEventListener("DOMContentLoaded", () => {

    const PREFIX = `${PIXEL_URL}/api/v1/${MAP_ID}`

    // pour savoir à quel serveur / carte on s'adresse
    // on les affiche en dur
    // pour l'instant on ne peut pas y toucher depuis l'interface
    // il faut recharger la page pour changer de carte
    document.getElementById("baseurl").value = PIXEL_URL
    document.getElementById("mapid").value = MAP_ID
    document.getElementById("baseurl").readOnly = true
    document.getElementById("mapid").readOnly = true

    fetch(`${PREFIX}/preinit`, {credentials: "include"})
        .then((response) => response.json())
        .then((json) => {
            //console.log(json)
            let key = json.key
            fetch(PREFIX+'/init?key='+key, {credentials: "include"})
                .then((response) => response.json())
                .then((json) => {
                    let id = json.id;
                    let nx = json.nx;
                    let ny = json.ny;
                    let data = json.data;
                    //console.log(data);
                    document.getElementById("grid").style.gridTemplateColumns = `repeat(${nx}, 20px)`;
                    document.getElementById("grid").style.gridTemplateRows = `repeat(${ny}, 20px)`;
                    for (let i = 0; i < nx; i++) {
                        for (let j = 0; j < ny; j++) {
                            element = document.createElement("div");
                            element.id = `${i}-${j}`;
                            element.addEventListener("click", (e) => changemementColor(id,e,i,j));
                            element.style.backgroundColor = `rgb(${data[i][j][0]}, ${data[i][j][1]}, ${data[i][j][2]})`;
                            document.getElementById("grid").appendChild(element);}}
                    document.getElementById("refresh").addEventListener("click", () => {refresh(id);});
                    setInterval(refresh(id), 3000)
    
                })

            // cosmétique / commodité / bonus:

            // TODO: pour être efficace, il serait utile d'afficher quelque part
            // les coordonnées du pixel survolé par la souris

            //TODO: pour les rapides: afficher quelque part combien de temps
            // il faut attendre avant de pouvoir poster à nouveau

            //TODO: pour les avancés: ça pourrait être utile de pouvoir
            // choisir la couleur à partir d'un pixel ?

        })

    //TODO: pour les élèves avancés, comment transformer les "then" ci-dessus en "async / await" ?
    //TODO: pour les élèves avancés, faire en sorte qu'on puisse changer de carte
    //      voir le bouton Connect dans le HTML
    
    function changemementColor (user_id,e,x,y){
        const [r, g, b] = getPickedColorInRGB()
        //console.log(x,y,r,g,b);
        fetch(PREFIX+'/set/'+user_id.toString()+'/'+x+'/'+y+'/'+r.toString()+'/'+g.toString()+'/'+b.toString(), {credentials: "include"})
                .then((response) => response.json())
                //.then((json) => {refresh(user_id);})
    }

    function refresh(user_id) {
        fetch(`${PREFIX}/deltas?id=${user_id}`, {credentials: "include"})
            .then((response) => response.json())
            .then((json) => {
                let deltas = json.deltas;
                //console.log(deltas);
                for (const pixcol of deltas) {
                    const pixel = document.getElementById(pixcol[0].toString()+"-"+pixcol[1].toString());
                    pixel.style.backgroundColor = `rgb(${pixcol[2]}, ${pixcol[3]}, ${pixcol[4]})`;
                }
        

            })
    }

    // Petite fonction facilitatrice pour récupérer la couleur cliquée en RGB
    function getPickedColorInRGB() {
        const colorHexa = document.getElementById("colorpicker").value

        const r = parseInt(colorHexa.substring(1, 3), 16)
        const g = parseInt(colorHexa.substring(3, 5), 16)
        const b = parseInt(colorHexa.substring(5, 7), 16)

        return [r, g, b]
    }

    // dans l'autre sens, pour mettre la couleur d'un pixel dans le color picker
    // (le color picker insiste pour avoir une couleur en hexadécimal...)
    function pickColorFrom(div) {
        // plutôt que de prendre div.style.backgroundColor
        // dont on ne connait pas forcément le format
        // on utilise ceci qui retourne un 'rbg(r, g, b)'
        const bg = window.getComputedStyle(div).backgroundColor
        // on garde les 3 nombres dans un tableau de chaines
        const [r, g, b] = bg.match(/\d+/g)
        // on les convertit en hexadécimal
        const rh = parseInt(r).toString(16).padStart(2, '0')
        const gh = parseInt(g).toString(16).padStart(2, '0')
        const bh = parseInt(b).toString(16).padStart(2, '0')
        const hex = `#${rh}${gh}${bh}`
        // on met la couleur dans le color picker
        document.getElementById("colorpicker").value = hex
    }

})
