import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const auth = getAuth(app);

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')



    const handleSubmit = (event) => {
        // 1. prevent page refresh
        event.preventDefault();

        // 2. collect form data
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        console.log(name, email, password)
        setError('')
        setSuccess('')

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('two upper case must')
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('special char must')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setError('digit must')
            return;
        }
        else if (password.length < 6) {
            setError('must be 8 char')
            return;
        }

        // 3. create user in fb
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setError('')
                setSuccess('User has been created successfully')
                event.target.reset();
                sendVerifiedEmail(result.user)
                updateUserDate(result.user, name)
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message);
                setSuccess('');
            })
    }

    // verified email
    const sendVerifiedEmail = (user) => {
        sendEmailVerification(user).then(result => {
            alert('plz verify your email')
        })
    }


    // update profile
const updateUserDate=(user, name)=>{
    updateProfile(user, {
        displayName: name
    }).then(result=>{
        alert('user name updated')
    })
    .catch(error=>{
        setError(error.message)
    })
}

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='w-50 mx-auto'>
            <h4>Please Register</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" placeholder='Your Name' required />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input className='w-50 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Your Password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already hav an account? Plz <Link to='/login'>Login</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

{/**
 <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" placeholder='Your Name' required />
                <br />


<p><small>Already have an account? Please <Link to="/login">Login</Link> </small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p> */}
export default Register;