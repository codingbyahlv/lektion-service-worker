//INSTALLERA OCH AKTIVERA SERVICE WORKER

//installera
self.addEventListener('install', (event) => {
//vi vill skapa upp en cache och lägga till alla filer vi vill ha dit innan vi går vidare till activate
event.waitUntil(
  //öppna upp en cache som vi ger namnet v1
  caches.open('v1')
  //tillbaka får vi en cache
  .then((cache) => {
    //vi returnerar att vi vill lägga till en array med lite filer
    return cache.addAll(['index.html', 'js/index.js', 'offline.html', 'css/style-offline.css']);
  })
);


  //gör att webbläsaren själv uppdaterar SW vid ändringar så man slipper göra det manuellt
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
    console.log('begärd url: ', event.request)
    //om vi är offline kan vi skicka ett svar tillbaka
    // event.respondWith(new Response('<h1>I find your lack of internet disturbing </h1>', 
    //                 {'headers': {'Content-Type': 'text/html'}}
    // ))
    //

    //här kan man också länka in ett specialanpassat html-dokument
    event.respondWith(
      //vi går igenom våra catch och leter efter något med samma namn (=urlen vi skickade, ex index.html)
      caches.match(event.request)
      //om vi hittar nånting
      .then((response) => {
        console.log('response: ', response)
        //om man får response visa den
        if(response)return response;
        //annars returnera vår offline.html från cache
        else return caches.match(new Request('offline.html'))
      })
    )
  }
});