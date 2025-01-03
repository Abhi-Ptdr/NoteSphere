import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})

  //use navigate hook to redirect
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //name, email, pass, cpass ko bahar nikalo credential se using destructuring syntax
    const {name, email, password} = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Account Created Successfully", "success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => { 
    //using spread operator(...) which keep note as is and add or ovwrwrite the value in targeted input field 
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Create an account to use NoteSphere</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required/>
          {/* as we are using onSubmit we can use required */}
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
