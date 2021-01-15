import React from 'react';
import { Link } from '@reach/router';

const Navigation = ( { logoutCallback } ) => {
    return(
        <div>
            <Link to='/login'>Login</Link>
            <Link to='/protected'>Protected</Link>
            <Link to='/register'>Register</Link>

            <button onClick={logoutCallback}>Logout</button>
        </div>
    )
}

export default Navigation;