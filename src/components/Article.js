import React from 'react';
import { Helmet } from 'react-helmet';

function Article() {
    return (
        <div className="App-header">
            <Helmet>
                <title>Article page</title>
            </Helmet>
            <p>yuor article page....</p>
        </div>
    );
}

export default Article;