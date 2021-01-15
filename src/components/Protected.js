import React, { useEffect, useState, useContext} from 'react';
import { UserContext } from '../App';

const Protected = () => {

    const [user] = useContext(UserContext);
    const [content, setContent] = useState('You need to log in!');

    useEffect( () => {
        async function fetchProtected() {
            const result = await (await fetch('http://localhost:4000/protected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${user.accessToken}`
                }
            })).json();
        if(result.message){
            // console.log(result)
            setContent(result.message)
            }
        }
        fetchProtected();

    }, [user]);
    

    return (
        <div>{content}</div>
    )
}

export default Protected;