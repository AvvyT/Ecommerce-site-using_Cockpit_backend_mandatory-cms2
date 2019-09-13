import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './Style.css';

const api = `http://192.168.99.100:8080/api/collections/get/damskor`;

function Home() {
    const [articles, updateArticles] = useState([]);
    const [checked, updateChecked] = useState(false);
    const [numberPosts, updateNumberposts] = useState(1);
    const [currentPage, updateCurrentPage] = useState(1);

    const limit = 3;
    // då börjar page från 0, annars hopper över 3
    let skip = (currentPage - 1) * limit;

    let chekPage = `/Case?token=mytoken&sort[Lagersaldo]=-1&limit=${limit}&skip=${skip}`;
    let chekChecked = `?${checked ? "&filter[Lagersaldo]=true" : ""}`;

    useEffect(() => {

        axios.get(`${api}${chekPage}${chekChecked}`)
            .then((response) => {
                console.log(response.data.entries);
                //console.log(response.data.total);
                updateNumberposts(response.data.total);
                updateArticles(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });
    }, [chekPage, chekChecked, checked]);

    const pageFun = () => {
        // Logic for show page numbers
        // Math.ceil => Round a number upward to its nearest integer
        let pageNumbers = Math.ceil(numberPosts / limit);
        //console.log(pageNumbers); // => 2

        let allPages = [];
        for (let index = 1; index <= pageNumbers; index++) {
            allPages.push(index);
        }
        //console.log(allPages);

        return <>
            {allPages.map(number => (
                <li
                    key={number}
                    onClick={() => {
                        updateCurrentPage(number);
                        //console.log(currentPage);
                    }}
                >{number}
                </li>
            ))}
        </>
    }

    return (
        <div className="App-header">
            <Helmet>
                <title>Home page</title>
            </Helmet>
            <h2 style={{ color: 'purple' }}>Sneakers-your damskor!</h2>
            <br></br>
            <label>Search <input className='input' placeholder=' Write your shoe ..'></input></label>
            <br></br>

            <label><input type="checkbox"
                onChange={e => updateChecked(e.target.checked)}
                checked={checked}
            ></input> in stock</label>


            <div className='all-page'>
                {articles.map((article) => (
                    <div key={article._id} className='items'>
                        <h3><Link to={'/article/' + article._id}>{article.Name[0].display}</Link></h3>
                        <div><img alt={article.name} src={`http://192.168.99.100:8080/${article.Bilder[0].path}`} width='200px'></img></div>
                        <p>{article.Pris} SEK</p>
                        <p style={{ color: 'lightgreen' }}>{article.Lagersaldo} in stock</p>
                    </div>
                ))}
            </div>
            <ul className="page-numbers">
                {pageFun()}
            </ul>
        </div>
    );
}

export default Home;