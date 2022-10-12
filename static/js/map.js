

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
            types: ['tourist_attraction', 'amusement_park', 'cafe', 'zoo']
        };



        service.search(request, (results) => {

            //Get landmarks section and remove children
            const landmarks = document.querySelector('#landmarks');
            
            //Remove old items if any
            landmarks.innerHTML = "";

            for (let i = 0; i < results.length; i++) {
 
                //Create list item
                const li = document.createElement("li");

                //Set list item attributes
                li.setAttribute("id", "carousel__slide" + (i + 1));
                li.setAttribute("tabindex", "0");

                //Set list item class
                li.className = "carousel__slide";

                //Create the inner div
                const carouselDiv = document.createElement("div");

                //Set in the inner div's class
                carouselDiv.className = "carousel__snapper";
                li.appendChild(carouselDiv);
                
                //Create the anchor tags
                let backSlide = i;
                if (i == 0) {
                    backSlide = results.length;
                }

                const back = document.createElement('a');
                back.setAttribute("href", "#carousel__slide" + backSlide);
                back.className = "carousel__next";
                back.className = "carousel__prev";

                let forwardSlide = i + 2;
                if (i == results.length - 1) {
                    forwardSlide = 1;
                }

                const forward = document.createElement('a');
                forward.setAttribute("href", "#carousel__slide" + forwardSlide);
                forward.className = "carousel__next";

                carouselDiv.appendChild(back);
                carouselDiv.appendChild(forward);

                // Create anchor content (text, image)
                const link = document.createElement('a');
                link.innerText = results[i].name;

                carouselDiv.appendChild(link);


                if (results[i].photos && results[i].photos.length > 0) {
                    const img = document.createElement("img");
                    img.src=results[i].photos[0].getUrl({maxHeight: 500});

                    carouselDiv.appendChild(img);

                //Append the image tag (photo) to the anchor tag
                    link.appendChild(img)
                }

                landmarks.appendChild(li);
            }

        });

    })
}





