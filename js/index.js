//hämtar vår knapp
const button = document.querySelector("#get-button");

//gör en fetch och loggar datan
async function getMenu() {
  const res = await fetch("https://awesome-todo-api.herokuapp.com/tasks");
  const data = await res.json();

  console.log(data);
}

//klick-listener på knappen så att fetchen aktiveras
button.addEventListener("click", () => {
  getMenu();
});


//vi behöver registrera vår SW
function registerServiceWorker(){
  //check om SW finns i vår webbläsare
  if('serviceWorker' in navigator){
    //vi registrerar vår SW. var den ligger
    navigator.serviceWorker.register('../service-worker.js')
    //promisebaserad
    //om lyckad
    .then(() => { console.log('Registered service worker') })
    //misslyckad. error
    .catch(() => { console.log('Could not register service worker') })
  }
}

//vi kallar på vår registreringsfunktion
registerServiceWorker();