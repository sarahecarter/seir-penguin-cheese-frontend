import {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    // initialize state to hold cheese data
    const [cheese, setCheese] = useState(null)

    // API url
    const URL = "https://sc-penguin-cheese-backend.herokuapp.com/cheese/"

    // function to get cheese and set it as state
    const getCheese = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setCheese(data)
    }

    // function to create new cheese
    const createCheese = async (newCheese) => {
        // make post request to create new cheese
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCheese)
        })

        // update list of cheeses
        getCheese();
    }

    // function to update a cheese
    const updateCheese = async (cheese, id) => {
        // make the put request
        await fetch (URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cheese)
        })

        // update the list of cheese
        getCheese()
    }

    // create function to delete a cheese 
    const deleteCheese = async (id) => {
        // make the delete request
        await fetch (URL + id, {
            method: "delete"
        })
        // update the list of cheese
        getCheese()
    }

    useEffect(() => getCheese(), [])

    return (
        <main>
            <Routes>
                <Route path="/" element={<Index cheese={cheese} createCheese={createCheese}/>} />
                <Route path="/cheese/:id" element={<Show cheese={cheese} updateCheese={updateCheese} deleteCheese={deleteCheese}/>} />
            </Routes>
        </main>
    );
  }
  
  export default Main;