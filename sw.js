
//these are all the files and images that we need to cache in order to render a functioning page offline
const filesToCache = [
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/',
    '/index.html',
    '/restaurant.html'
];

//This event listener will be called once the SW is registered and will open the cache if
//one is not already opened and save all of the files in "filesToCache" into the cache.
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('v1').then(function(cache){
            return cache.addAll(filesToCache);
        })
    );
});

//This event listener is waiting for fetch requests. If the event we are trying to fetch is already in the cache,
//we will return the cached response. Otherwise, we will fetch the response from the browser and save it in the cache.
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response;
            } else {
                return fetch(event.request)
                .then(function(response) {
                    const clonedResponse = response.clone();
                    caches.open('v1').then(function(cache) {
                        cache.put(event.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(error){
                    console.log(error);
                })
            }
        })
    );
});
