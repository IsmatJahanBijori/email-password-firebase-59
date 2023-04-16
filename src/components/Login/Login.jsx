import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef()
    const [showPassword, setShowPassword] = useState(false)

    const auth = getAuth()
    const handleLogin = event => {
        event.preventDefault();
        // console.log(event.target.value)
        const email = event.target.email.value
        const password = event.target.password.value
        // console.log(email, password)

        // validation
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

        // login with earlier id
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in 
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('Login successfully')
                setError('')
                // ...
            })
            .catch((error) => {
                console.log(error.message)
                setError(error.message)
                setSuccess('')
            });
        event.target.reset()
    }

    // emailRef ekhane use kora hoiche
    const handleResetPassword = () => {
        const email = emailRef.current.value
        if (!email) {
            alert('provide your mail address')
            return
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('check your mail')
            })
            .catch((error) => {
                console.log(error.message);

            });
    }

    return (
        <div className='w-25 mx-auto'>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='email' ref={emailRef} className="form-control" id="email" placeholder="Enter email" required />

                </div>

                {/**eye button toggle */}

                {
                    showPassword ?
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="text" name='password' className="form-control" id="password" placeholder="Password" required />
                        </div>
                        :
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' className="form-control" id="password" placeholder="Password" required />
                        </div>
                }
                {/**eye button toggle */}

                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <p><button onClick={() => setShowPassword(!showPassword)} className="btn btn-link">Show Password</button></p>
                <p><small>Forget Password? Please <button onClick={handleResetPassword} className="btn btn-link">Reset your Password</button></small></p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>New to this site? Plz <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

{/**
<p><small>Forget Password? Please <button className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to this website? Please <Link to="/register">Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p> */}
export default Login;