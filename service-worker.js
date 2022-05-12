//INSTALLERA OCH AKTIVERA SERVICE WORKER

//installera
self.addEventListener('install', (event) => {
  //gör att webbläsaren själv uppdaterar SW vid ändringar
  self.skipWaiting();
  //triggas när den installerats
  console.log('Service worker installed!')
})

//aktivera
self.addEventListener('activate', (event) => {
  //triggas när den aktiverats
  console.log('Service worker activated!')
})

self.addEventListener("fetch", (event) => {
  // Skriv ut url:en på varje närverksförfrågan
  console.log(event.request.url); 
  //kontrollera om du är online/offline
  //om du är online
  if(navigator.onLine){
    console.log('Du är online')
  //annars = offline
  } else {
    console.log('Du är offline')
    //om vi är offline kan vi skicka ett svar tillbaka
    //här kan man också länka in ett specialanpassat html-dokument
    event.respondWith(new Response('<h1>I find your lack of internet disturbing </h1>', 
                    {'headers': {'Content-Type': 'text/html'}}
    ))
  }
});