import  { useState } from "react";
// import "./Signup.css";
import "./signup.css"
import {Link} from "react-router-dom"

// const [eror, setError] = useState(false)
// const [error, setError] = useState(null)

const SignUp = () => {

const handleSubmit = async(e) =>{
    e.preventDefault()

    const firstName = e.target[0].value 
    const lastName = e.target[1].value 
    const email = e.target[2].value 
    const password = e.target[3].value 


try {
    
    const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        }),
      });

      const json = JSON.stringify(res)
console.log(json)
      if (!json) {
        console.log("signup failled");
        return;
      }

      if (json.ok) {
        console.log("singup successfuly");
       
      }
      e.target.reset();
   

} catch (error) {
    console.log({ message: error.message });
    // setError(true)
}

} 

  return (
    <div className="formContainer">
     
        <h1>Sign Up Here</h1>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            className="input"
            
            placeholder="First Name"
          />
          <input
            type="text"
            className="input"
           
            placeholder="Last Name"
          />
          <input
            type="text"
            className="input"
           
            placeholder="Email"
          />
          <input
            type="text"
            className="input"
           
            placeholder="Password"
          />

          <button className="btnAdd" type="submit">Sign Up</button>
        </form>
      
        <Link className="loginLink" to="/signin">Click here to sign in</Link>
    </div>
  );
};

export default SignUp;

