import React, {useState} from 'react'


const Form = () => {
    //forms need 3 things: state, submit handler, input handler




    //state for our form submits!
    const [formState, setFormState] = useState({
        name: ''
    })
    // onSubmit function (what happens when user submits form!)

    const formSubmit = (e) => {
        //prevents page from reloading on submit
        e.preventDefault()
        console.log('form submitted!')
    }

        const inputChange = (e) => {
            console.log('input changed')
            setFormState({name: e.target.value})
        }

        return (
            //label wraps input, name and id are basically the same things.
            <form onSubmit={formSubmit}>
              <label htmlFor='name'>
                <b>Name: </b>
                <input type="text" name='name' id='name' placeholder='Please type your name'/>
              </label>
              <button>Submit!</button>
            </form>
        )
    
    }

   

export default Form