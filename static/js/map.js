

function initMap() {
    const location = {
        lat: 37.601773,
        lng: -122.20287
    };

    const options = {
        center: location,
        zoom: 9,
        gestureHandling: "cooperative",
    };

    const map = new google.maps.Map(document.getElementById('map'), options);

    const autocomplete = new google.maps.places.Autocomplete(document.getElementById("landmark"),
        {
            componentRestrictions: { 'country': ['us'] },
            fields: ['geometry', 'name'],
            types: ['establishment']

        }
    );

    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map
        })
    });




    // window.initMap = initMap;



    //lat/lgn is the required parameter to be used in Google Places API to search nearby place, in the optional
    // parameter, in Tabel 2, landmarks can be defined. Nearby research output is json 

    const service = new google.maps.places.PlacesService(map);


    document.querySelector('#search').addEventListener('submit', (evt) => {
        evt.preventDefault();

        const request = {
            location: new google.maps.LatLng(
                autocomplete.getPlace().geometry.location.lat(),
                autocomplete.getPlace().geometry.location.lng()),
            radius: 5000,
            types: ['tourist_attraction','amusement_park','cafe','zoo']
        };

        service.search(request, (results) => {

            for (let i = 0; i<results.length; i++){
                    // document.querySelector('#landmarks').insertAdjacentHTML("beforeend",`<li> ${results[i].name}</li>`);
                    const li = document.createElement('li');
                    const link = document.createElement('a');
                    
                    link.innerText = results[i].name;
                    
                   
                    // if (!results[i].photos[0])
                    //         {
                    
                            const img = document.createElement("img");

                            img.src=results[i].photos[0].getUrl({maxHeight: 300});

                            link.appendChild(img)

                    link.addEventListener('click', (e)=>{
                        e.preventDefault();
                        new google.maps.Marker({position: results[i].geometry.location,
                            title: results[i].name,
                            
                            // photos: results[i]["photos"][0]["photo_reference"],
                            map: map})
                    });
                    li.appendChild(link);
                    document.querySelector('#landmarks').appendChild(li)
        
                }   

        });

    })
}

//make it clickable to show the marks on the map 