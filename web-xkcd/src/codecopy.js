const XKCD = "https://xkcd.now.sh/?comic="

document.addEventListener('DOMContentLoaded', function() {

const stat = document.getElementById('stat');
const image = document.getElementById('image');
const title = document.getElementById('title');
const reset = document.getElementById('reset');
const prev = document.getElementById('previous');
const next = document.getElementById('next');


function fetchIssue(n){
    fetch(XKCD+n)
    .then(response => response.json())
    .then(data => {stat.innerText=data.num; image.src=data.img; title.innerText=data.safe_title;})
    .catch(error => console.error("Erreur :", error));
  }
fetchIssue("latest");
reset.addEventListener('click',()=>{fetchIssue("latest"); });
prev.addEventListener('click', () => { fetchIssue((parseInt(stat.innerText) - 1).toString()); });
next.addEventListener('click', () => { fetchIssue((parseInt(stat.innerText) + 1).toString()); });

});