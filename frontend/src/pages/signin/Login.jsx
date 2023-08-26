import React from "react";
import "./Login.css";

import { useState } from "react";
// import "./Signup.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../hooks/authContext";
import { useAuthContext } from "../../hooks/authContext";




const Login = () => {
const [error, setError] = useState(false)
const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email= e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("API Response:", res);

   
    const responseData = await res.json()
      console.log("JSON Data:", responseData)

      
    
    if (!responseData.ok) {
        setIsLoading(false)
       setError(responseData.error)
       console.log(responseData.error)
        }

      if (responseData) {
            localStorage.setItem('user', JSON.stringify(responseData))
            dispatch({type: 'LOGIN', payload: responseData})
            console.log("signin successfuly");
               setIsLoading(false) 
      }
      console.log("Stored User Data:", localStorage.getItem('user'));
      navigate("/")
      e.target.reset();

    } catch (error) {
      
      setError(error, "Something went wrong")
    }
  };

  return (
    <div className="formContainer">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit} className="input-form">
        <input type="text" className="input" placeholder="Email" />

        <input type="password" className="input" placeholder="Password" />

        <button className="btnAdd" type="submit">
         Login 
        </button>
      </form>

      <Link className="loginLink" to="/signup">
        Are you new here? Sign Up..
      </Link>
      {error && <div>
        {error}
        </div>}
    </div>
  );
};

export default Login;
