import {useParams, useNavigate } from "react-router-dom"
import {useState, useEffect} from "react"

function Show(props) {
  // grab navigate function
  const navigate = useNavigate()
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id
  // grab cheese from props
  const cheese = props.cheese

  // initialize state for form 
  const [editForm, setEditForm] = useState({})

  // useEffect to set state when data is available
  useEffect(() => {
    if (props.cheese) {
      const targetCheese = cheese.find((c) => c._id === id)
      setEditForm(targetCheese)
    }
  }, [props.cheese])

  if (props.cheese) {
    // grab the target cheese from the cheese array 
    const targetCheese = cheese.find((c) => c._id === id)

    // handleChange function for form 
    const handleChange = (event) => {
      // copy state 
      const newState = {...editForm}
      // update newState
      newState[event.target.name] = event.target.value
      // update the state 
      setEditForm(newState)
    } 

    // handleSubmit function for form 
    const handleSubmit = (event) => {
      // prevent the form from refreshing
      event.preventDefault()
      // pass the form data to updateCheese
      props.updateCheese(editForm, targetCheese._id)
      // redirect back to index
      navigate("/")
    }

    // remove cheese function 
    const removeCheese = () => {
      props.deleteCheese(targetCheese._id)
      navigate("/")
    }

  // form JSX
  const form = (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
        />
        <input
            type="text"
            value={editForm.countryOfOrigin}
            name="countryOfOrigin"
            placeholder="Country of origin"
            onChange={handleChange}
        />
        <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="Image link"
            onChange={handleChange}
        />
        <input type="submit" value="Update Cheese"/>
    </form>
    )

    return (
      <div className="cheese">
        <h1>{targetCheese.name}</h1>
        <h2>{targetCheese.countryOfOrigin}</h2>
        <img src={targetCheese.image} alt={targetCheese.name}/>
        {form}
        <button onClick={removeCheese}>Delete Cheese</button>
      </div>
    )

  }
  else {
    return <h1>No Cheese</h1>;
  }

}
  
  export default Show;