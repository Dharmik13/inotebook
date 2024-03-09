import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [credential, setcredential] = useState({ email: "", password: "" });
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the authtoken into the local storage and redirect to the home page using useHistory hook

            localStorage.setItem('token', json.authtoken);   // for  save the authtoken into the local storage
            props.showAlert("Logged In SuccessFully", "success");
            history("/");  // for redirect to the home page using useHistory hook
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='login my-3'>
            <h2>Login to Continue the inotebook App</h2>
            <form className='my-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
