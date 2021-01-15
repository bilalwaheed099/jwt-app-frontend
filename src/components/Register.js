import React, { useState} from 'react';
import { navigate } from '@reach/router';


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const result = await (await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })).json();

        if(!result.error){
            console.log(result.message);
            navigate('/');
        } else {
            console.log(result.error);
        }
    }

    const handleChange = e => {
        const target = e.target.name;
        if(target==='email'){
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }
    return(
        <div>
            <form>
                <h2>Register</h2>
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
                <button type='submit' onClick={handleSubmit}>Register</button>
            </form>
        </div>
    )


}

export default Register;