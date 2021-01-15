import React, { useState, useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import { UserContext } from '../App';

const Login = () => {

    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e =>  {
        e.preventDefault();

        const result = await (await fetch('http://localhost:4000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })).json();

        if(result.accessToken){
            setUser({
                accessToken: result.accessToken
            });
            navigate('/');
        } else {
            console.log(result.error);
        }
    }

    const handleChange = e => {
        if(e.currentTarget.name==='email'){
            setEmail(e.currentTarget.value);
        } else {
            setPassword(e.currentTarget.value);
        }
    }

    useEffect(() => {
        console.log(user);
    }, [user]);
    return(
        <div>
            <form>
                <h2>Login</h2>
                <input 
                    name='email'
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={handleChange}
                />
                <input 
                    name='password'
                    type='text'
                    value={password}
                    placeholder='Password'
                    onChange={handleChange}
                />
                <button type='submit' onClick={handleSubmit}>Log in</button>
            </form>
        </div>
    )


}

export default Login;