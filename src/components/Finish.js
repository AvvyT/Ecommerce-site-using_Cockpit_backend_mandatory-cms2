import React from 'react';
import { Helmet } from 'react-helmet';

function Finish() {
    return (
        <div className="App-header">
            <Helmet>
                <title>Finish page</title>
            </Helmet>
            <h3>Congratulations!</h3>
            <p style={{ color: 'lightgreen' }}>Your order has been placed!</p>
        </div>
    );
}

export default Finish;