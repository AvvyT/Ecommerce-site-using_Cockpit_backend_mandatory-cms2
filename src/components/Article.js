import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { item$, updateItem } from './store';
import MDReactComponent from 'markdown-react-js';
import axios from 'axios';


function Article(props) {
    const [article, updateArticle] = useState(null);
    const [reviews, updateReviews] = useState([]);
    const [sum, updateSum] = useState(1);
    const [user, updateUser] = useState(item$.value);

    //console.log(user);
    let id = props.match.params.id;
    //console.log(id);
    const api = `http://192.168.99.100:8080/api/collections/get/damskor/Case?token=mytoken&filter[_id]=${id}`;

    //** Get article **/
    useEffect(() => {

        axios.get(api)
            .then((response) => {
                console.log(response.data.entries[0]);
                updateArticle(response.data.entries[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [api, id]);

    //** Get article-review **/
    useEffect(() => {
        let subscription = item$.subscribe(bag => {
            updateUser(bag);
        });

        axios.get(`http://192.168.99.100:8080/api/collections/get/Recensioner/Case?token=mytoken&filter[sko._id]=${id}`)
            .then((response) => {
                console.log(response.data.entries);
                updateReviews(response.data.entries);
            })
            .catch(error => {
                console.log(error);
            });

        return () => subscription.unsubscribe();
    }, [id]);

    const buy = () => {

        let newUser = [...user]; // en kopia 
        console.log(user);
        let index = newUser.findIndex(x => x.article._id === article._id); // om vi har lika

        if (index !== -1) { // om det redan finns
            newUser[index].sum = parseInt(newUser[index].sum) + parseInt(sum); // lägger till
        } else {
            newUser.push({
                article,
                sum: parseInt(sum),
            });
        }
        updateItem(newUser);
    }

    //console.log(article);
    return (
        <>
            {!article ? (
                <p style={{ color: 'red' }}>Loading ...</p>
            ) : (
                    <div className="App-header all-page" key={article._id}>
                        <Helmet>
                            <title>Article page</title>
                        </Helmet>
                        <div className='one'>
                            <button className='my-bag'><Link to={'/bag/' + article._id + sum.length}>Bag {sum.length}</Link></button>

                            <h3 style={{ color: 'purple' }}>{article.Name[0].display}</h3>
                            <br></br>

                            {article.Bilder.map((bild, id) => (
                                <img key={id} src={`http://192.168.99.100:8080/${bild.path}`} alt={article.Name} className='slyle-bild' />
                            ))}

                            <MDReactComponent text={`${article.Beskrivning}`} />
                            <br></br>
                            <p style={{ color: 'lightgreen' }}>{article.Pris} SEK, In stock {article.Lagersaldo}</p>
                        </div>

                        {reviews.map((review) => (
                            <div key={review._id} className='one'>
                                <h1>Reviews</h1>
                                <h3 style={{ color: 'purple' }}>{review.titel}</h3>
                                <p>Betyg: {review.betyg}</p>
                                <p style={{ color: 'lightgreen' }}>{review.body}</p>
                            </div>
                        ))}

                        <label>ADD <input className='input-add' type='number'
                            min={1}
                            max={article.Lagersaldo}
                            onChange={(e) => {
                                updateSum(e.target.value);
                            }}>
                        </input>
                            <button className='buy' value={user} onClick={buy}>Buy</button></label>
                    </div>
                )}
        </>
    );
}

export default Article;