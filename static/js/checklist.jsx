

function ChecklistComponent(){
    const initialData = JSON.parse(document.querySelector('#data').innerHTML.trim());
    const itinerary_id = initialData.itinerary_id;
        const [item, setItem] = React.useState("")

        const [createdItems, setCreatedItems] = React.useState(initialData.items)

        //solve the problem of not displaying user input
        function onChange(event) {
            setItem(event.target.value);
        }


        function handleSubmit(event){
            event.preventDefault()

            // const valueToSubmit = item;

            // uncontrolled component version

            const formInput={
                item_name: document.querySelector('#checklistItem').value
            }
            
            // ajax create new item on server
            
            fetch(`/itineraries/${itinerary_id}/checklist`, {
                method: 'POST',
                body:JSON.stringify(formInput),
                headers: {
                    'Content-Type': 'application/json',
                  },
              })
                .then((res) => res.json())
                .then((resJson) => {
                 setCreatedItems((existingItems) => [...existingItems, resJson]);  
                })
   
        }

        return(
            <main>
            <form action="/itineraries/{{itinerary_id}}/checklist" onSubmit={handleSubmit}>
                <input 
                    type = "text"
                    placeholder="My checklist item"
                    name="item"
                    className="listItem"
                    id="checklistItem"
                    value={item}
                    onChange={onChange}
                />
             


                <button type="submit">+</button>
            </form>

            <ul>{createdItems.map((i) => <li>{i.item_name}</li>)}</ul>
            </main>


        )


}
ReactDOM.render(<ChecklistComponent />, document.getElementById("checklist"));


