//installera och aktivera
self.addEventListener('install', (event) => {
  self.skipWaiting();
  //triggas när den installerats
  console.log('Service worker installed!')
})

self.addEventListener('activatoe', (event) => {
  //triggas när den aktiverats
  console.log('Service worker activated!')
})

self.addEventListener("fetch", (event) => {
  // Skriv ut url:en på varje närverksförfrågan
  console.log(event.request.url); 
  //kontrollera om du är online/offline
  if(navigator.onLine){
    console.log('Du är online')
  } else {
    console.log('Du är offline')
    //om vi är offline kan vi skicka ett svar tillbaka
    event.respondWith(new Response('<h1>I find your lack of internet disturbing </h1>', 
                    {'headers': {'Content-Type': 'text/html'}}
    ))
  }
});