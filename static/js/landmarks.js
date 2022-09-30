// document.querySelector("#itinerary").addEventListener("submit", (e)=>{
//     e.preventDefault()
//     const formInputs =   {
//     destination : document.querySelector('#destination').value,
//     travel_date: document.querySelector('#travel_date').value,
   
//     }
//     fetch('/saveitinerary',{
//         method: 'POST',
//         body: JSON.stringify(formInputs),
//         headers: {
//             'Content-Type': 'application/json',
//           },
//     })
//     .then((response)=> response.json())
//     .then((responseJson)=>{


        
//         // document.querySelector('.itinerary').insertAdjacentText=("beforeend",itinerary.user_destination)
//         // document.querySelector('.itinerary').insertAdjacentText=("beforeend",itinerary.travel_date)


//     });
// });


// get the user input destination and date display inside saveitinerary html div 
// user can only access own database, so the endpoint is based on itinerary_id 


document.querySelector("#itinerary").addEventListener("click", (e)=>{
    e.preventDefault()
    const formInputs =   {
        landmark: document.querySelector('#landmark').value,
    
    }
    const action = document.querySelector('#search').action
    fetch(action,{
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json',
          },
    })
    .then((response)=> response.json())
    .then((responseJson)=>{

        const li= document.createElement('li');
        const trash=document.createElement('button')
        //after create the button element add a class to the button called delete_landmark 
        trash.classList.add("delete_landmark")
        trash.innerHTML ="🗑️"
        trash.addEventListener('click',()=>{
           
            fetch(`/landmarks/${responseJson.landmark_id}`,{
                method: 'DELETE',
            })
            .then((res)=> res.json)
            .then(()=>li.remove()) 
            
        })
        li.innerText=responseJson.landmark_name;
        li.appendChild(trash)
        document.querySelector('.landmark').appendChild(li);


        // document.querySelector('.landmark').insertAdjacentText("beforeend",responseJson.landmark_name)
        //???????only delete from html not from database sqlalchemy
       


    });
});

