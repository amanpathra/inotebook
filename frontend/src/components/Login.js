import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [creds, setCreds] = useState({email:"", password:""});

    let navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({email: creds.email, password: creds.password})
        })
        const json = await res.json();
        if(json.success){
            props.showAlert('Logged in successfully.', 'success')
            // Save the auth token
            localStorage.setItem('token', json.authToken)
            // Redirect
            navigate("/");
        }else{
            props.showAlert('Invalid Credentials. Please Enter valid login credentials.', 'danger')
        }
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    return (
        <div className='my-3' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 className='mb-4'>Login to iNotebook</h2>
            <form onSubmit={login} style={{width: '40%'}}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={creds.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={creds.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
