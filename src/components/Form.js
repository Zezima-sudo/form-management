import React, {useState} from 'react'
import * as yup from 'yup'
import axios from 'axios'

const formSchema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    email: yup.string().email('must be a valid email').required("Must include email address"),
    password: yup.string().required('Please set a password!'),
    tos: yup.boolean().oneOf([true], 'You cannot continue unless you agree')
    
})

const Form = () => {
    //forms need 3 things: state, submit handler, input handler
    //state for our form submits!
    const [formState, setFormState] = useState({
        name: '', email: '', password: '', tos: false
    })

    // handling errors in state 
    const [errorState, setErrorState] = useState({
        name: '', email: '', password: '', tos: ''
    })
    
    const validate = (e) => {
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrorState({
                ...errorState,
                [e.target.name]: ''
            })

        })
        .catch(err => {
           
               console.log(err.errors)
            setErrorState({
                ...errorState,[e.target.name]: err.errors[0]
            })
        })
    }



    // formSubmit function (what happens when user submits form!)

    const formSubmit = (e) => {
        //prevents page from reloading on submit
        e.preventDefault()
        
        console.log('form submitted!')

        axios.post('https://reqres.in/api/users', formState)
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }
    

    
        const inputChange = (e) => {
            e.persist();
            validate(e)
           

            let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            console.log('input changed', e.target.value, e.target.checked)
            setFormState({...formState, [e.target.name]: value})
        }

        return (
            //label wraps input, name and id are basically the same things.
            <form onSubmit={formSubmit}>
              <label htmlFor='name'>
                <b>Name: </b>
                <input type="text" 
                name='name' 
                id='name' 
                placeholder='Please type your name'
                value={formState.name}
                onChange={inputChange}
                />   
              </label>

              <label htmlFor="email">
                  <b>Email</b>
                  <input type="email"
                  name="email"
                  id="email"
                  placeholder="Enter a valid email address"
                  value={formState.email}
                  onChange={inputChange}
                  />
                  {errorState.email.length > 0 ? <p className="error">{errorState.email}</p> : null}
              </label>
              <label htmlFor="password">
                  <b>Password</b>
                  <input type='text'
                  name="password"
                  placeholder="Must be at least 8 characters"
                  value={formState.password}
                  onChange={inputChange}
                  />
              </label>
              <label htmlFor="tos">
                  <b>I agree to the Terms of Service</b>
                  <input type='checkbox'
                  name='tos'
                  id='tos'
                  checked={formState.value}
                  onChange={inputChange}
                  
                  />
              </label>
              <button>Submit!</button>
            </form>
        )
    
    }

   

export default Form