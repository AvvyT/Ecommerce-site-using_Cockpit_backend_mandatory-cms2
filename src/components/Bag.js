import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { item$, getTotalPrice, deleteProduct } from './store';
import './Bag.css';

function Bag() {
    const [bagarticles, updateBagarticles] = useState(item$.value);
    //console.log(bagarticles);

    useEffect(() => {
        // hålla updaterat alla bag artiklar
        let sub = item$.subscribe(items => updateBagarticles(items));

        return () => {
            sub.unsubscribe();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Bag page</title>
            </Helmet>
            {bagarticles.length === 0 ? (
                <h2 style={{ color: 'red' }}>Your bag is empty!</h2>
            ) : (
                    <div className="App-header">
                        <h2 style={{ color: 'purple' }}>Complete your order!</h2>
                        <br></br>

                        <table className='table'>
                            <thead>
                                <tr style={{ color: 'lightblue' }}>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bagarticles.map((bagarticle) => (
                                    <tr key={bagarticle.article._id}>
                                        <td style={{ color: 'rgb(240, 190, 240)' }}><h3>{bagarticle.article.Name[0].display}</h3>
                                            <div><img alt={bagarticle.article.name} src={`http://192.168.99.100:8080/${bagarticle.article.Bilder[0].path}`} width='100px'></img></div></td>
                                        <td style={{ color: 'lightgreen' }}>{bagarticle.sum}</td>
                                        <td>{bagarticle.article.Pris} SEK, </td>
                                        <td style={{ color: 'orange' }}>{bagarticle.sum * bagarticle.article.Pris} SEK</td>
                                        <td><button className='delete' onClick={() => deleteProduct(bagarticle.article)}>delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Total: <i style={{ color: 'red' }}> {getTotalPrice()}</i> sek</h3>

                        <button style={{ width: '95px' }} className='buy'><Link to={'/checkout'}>Buy</Link></button>
                    </div>
                )}
        </>
    );
}

export default Bag;