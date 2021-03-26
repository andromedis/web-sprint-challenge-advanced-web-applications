// Library imports
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

// Empty form values
const defaultValues = {
  credentials: {
    username: '',
    password: '',
  },
  errorMessage: ''
}

const Login = () => {
  const [credentials, setCredentials] = useState(defaultValues.credentials);
  const [errorMessage, setErrorMessage] = useState(defaultValues.errorMessage);

  const { push } = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  useEffect(() => {
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    
  });

  const loginRequest = evt => {
    evt.preventDefault();

    axios.post(`http://localhost:5000/api/login`, credentials)
      .then(res => {
        console.log(res);
        setErrorMessage(defaultValues.errorMessage);
        localStorage.setItem('token', res.data.payload);
        // push('/bubbles');
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('Username or Password not valid.')
      })
  }

  const handleChange = evt => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
  }

  return (
    <>
      <h1>
        Welcome to the Bubble App!
      </h1>

      <form onSubmit={loginRequest}>

        <label htmlFor='username' >Username</label>
        <input 
          type='text'
          name='username'
          id='username'
          value={credentials.username}
          onChange={handleChange}
        />

        <label htmlFor='password' >Password</label>
        <input 
          type='password'
          name='password'
          id='password'
          value={credentials.password}
          onChange={handleChange}
        />

        <button>Submit</button>
        { errorMessage && <p>{errorMessage}</p> }

      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.