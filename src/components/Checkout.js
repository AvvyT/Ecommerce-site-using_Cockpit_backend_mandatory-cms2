import React from 'react';
import { Helmet } from 'react-helmet';

function Checkout() {
    return (
        <div className="App-header">
            <Helmet>
                <title>Checkout page</title>
            </Helmet>
            <h2 style={{ color: 'purple' }}>Please Checkout your order!</h2>
        </div>
    );
}

export default Checkout;