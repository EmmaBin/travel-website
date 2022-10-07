

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
            types: ['tourist_attraction','amusement_park','cafe','zoo']
        };

        service.search(request, (results) => {

            for (let i = 0; i<results.length; i++){
                const li=document.createElement("li");
                    // document.querySelector('#landmarks').insertAdjacentHTML("beforeend",`<li> ${results[i].name}</li>`);

                    /**
                     *        <ol id="landmarks">
                                {% for landmark in landmarks %}
                                <li id="carousel__slide2" tabindex="0" class="carousel__slide">
                                <div class="carousel__snapper"></div>

                                <a href="#carousel__slide1" class="carousel__prev">Go to previous slide</a>
                                <a href="#carousel__slide3" class="carousel__next">Go to next slide</a>
                                
                                </li>
                                {% endfor %}
                            </ol>
                     * 
                     */

            // //Create list item with div inside
            //         const li = document.createElement('li');
            //         li.setAttribute("id", "carousel__slide" + i);
            //         li.className = "carousel__slide";
            //         const carouselDiv = document.createElement("div");
            //         carouselDiv.className = "carousel__snapper";
            //         li.appendChild(carouselDiv);

            // //Forward and back links to next and previous slides
            //         let backSlide = i - 1;
            //         if (i == 0) {
            //             backSlide = results.length - 1;
            //         }
            //         const back = document.createElement('a');
            //         back.setAttribute("href", "carousel__slide" + backSlide);
            //         back.className = "carousel__next";
            //         back.className = "carousel__prev";

            //         let forwardSlide = i + 1;
            //         if (i == results.length - 1) {
            //             backSlide = 0;
            //         }
            //         const forward = document.createElement('a');
            //         forward.setAttribute("href", "carousel__slide" + forwardSlide);
            //         forward.className = "carousel__next";

            //         carouselDiv.appendChild(back);
            //         carouselDiv.appendChild(forward);

            //Create anchor content (text, image)
                    const link = document.createElement('a');
                    link.innerText = results[i].name;
                    
                    // if (!results[i].photos[0])
                    //         {
                    
                    const img = document.createElement("img");
                    img.src=results[i].photos[0].getUrl({maxHeight: 300});

                    //Append the image tag (photo) to the anchor tag
                    link.appendChild(img)

                    link.addEventListener('click', (e)=>{
                        e.preventDefault();
                        new google.maps.Marker({position: results[i].geometry.location,
                            title: results[i].name,
                            
                            // photos: results[i]["photos"][0]["photo_reference"],
                            map: map})
                    });

            //Append the anchor tag to the carousel div
                    // carouselDiv.appendChild(link);
                    li.appendChild(link)

                    document.querySelector('#landmarks').appendChild(li)
        
                }   

        });

    })
}

//make it clickable to show the marks on the map 