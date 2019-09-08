import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Style.css';

const api = `http://192.168.99.100:8080/api/collections/get/damskor`;

function Home() {
    const [articles, updateArticles] = useState([]);
    // const [numberPosts, updateNumberposts] = useState(1);

    useEffect(() => {

        axios.get(api)
            .then((response) => {
                console.log(response.data.entries);
                //console.log(response.data.total);
                //updateNumberposts(response.data.total);
                updateArticles(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //console.log(numberPosts);

    return (
        <div className="App-header">
            <Helmet>
                <title>Home page</title>
            </Helmet>
            <h2 style={{ color: 'purple' }}>Sneakers-your damskor!</h2>
            <label>Search <input className='input' placeholder=' Write your shoe ..'></input></label>
            <br></br>

            <label><input type="checkbox"></input> in stock</label>


            <div className='all-page'>
                {articles.map((article) => (
                    <div key={article._id} className='items'>
                        <h3><Link to={'/article/' + article._id}>{article.Name}</Link></h3>
                        <div className='slyle-bild'><img alt='' src={article.Bilder.path} width='150px'></img></div>
                        <p>{article.Pris} SEK</p>
                        <p style={{ color: 'lightgreen' }}>{article.Lagersaldo} in stock</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;