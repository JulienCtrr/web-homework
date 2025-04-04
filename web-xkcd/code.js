const XKCD = "https://xkcd.now.sh/?comic="

function fetchIssue(n){
    fetch(XKCD+n)
    .then(response => response.json())
    .then(data => stat.innerText=data.num)
    .catch(error => console.error("Erreur :", error));
  }

reset.addEventListener('click',()=>{stat.innerText="5";})