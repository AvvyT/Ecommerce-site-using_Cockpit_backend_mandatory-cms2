import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from "react-router-dom";
import { updateItem } from './store';

function Checkout() {
    const [user, updateUser] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        updateItem([]);
        updateUser(true);
    }

    if (user) {
        console.log('if-satsen');
        return <Redirect to="/finish" />
    }

    return (
        <>
            <div className="App-header">
                <Helmet>
                    <title>Checkout page</title>
                </Helmet>
                <h2 style={{ color: 'purple' }}>Please Checkout your order!</h2>

                <form className='form-style' onSubmit={handleSubmit}>
                    <label style={{ color: 'lightgreen' }}>Name <input
                        type="text"
                        placeholder=" Write your name .."
                        className="myInput"
                        required />
                    </label>
                    <label style={{ color: 'lightgreen' }}>  Address <input
                        type="text"
                        placeholder=" Write your address .."
                        className="myInput"
                        required />
                    </label>
                    <br></br>
                    <input type="submit"
                        className="page"
                        value="Order" />
                </form>
            </div>
        </>
    );
}

export default Checkout;