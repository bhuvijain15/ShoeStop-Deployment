
import api from '../../api';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';

const Product = () => {

    const [products, setProducts] = useState([]);
    const { token } = useContext(productContext);

    // Fetch all products
    const fetchData = async () => {
        try {
            const res = await api.get('/api/getproducts');
            setProducts(res.data);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Add product to favourites
    const getProduct = async (image, title, company, price) => {

        if (!token) {
            alert('Please login first');
            return;
        }

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await api.post('/api/addfav', {
                image, title, company, price
            }, { headers });

            if (response.status === 202) {
                alert('Already in favourite list');
            } else {
                alert('Item added to favourites');
            }

        } catch (error) {
            console.log('Favourite error:', error);
            alert('Unable to add favourite');
        }
    };

    // Add product to cart
    const addtoCart = async (image, title, company, price) => {

        if (!token) {
            alert('Please login first');
            return;
        }

        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await api.post('/api/addcart', {
                image, title, company, price
            }, { headers });

            if (response.status === 202) {
                alert('Already in cart');
            } else {
                alert('Item added to cart');
            }

        } catch (error) {
            console.log('Cart error:', error);
            alert('Unable to add item to cart');
        }
    };

    return (
        <div className='product' id="products">

            <h3 className='text-center p-4'>Products</h3>

            <div className="pro-layout">

                {products && products.length > 0 ?

                    products.map(li => (
                        <div className='cardz' key={li._id}>

                            <img src={li.image} className='image' alt="" />

                            <p className="title">{li.title}</p>

                            <div className="comrice">
                                <p className="company">{li.company}</p>
                                <p className="price text-dark">
                                    Rs:{li.price}
                                </p>
                            </div>

                            <div className="btns">

                                <Button
                                    variant='success'
                                    onClick={() => addtoCart(
                                        li.image, li.title,
                                        li.company, li.price
                                    )}
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    variant='danger'
                                    onClick={() => getProduct(
                                        li.image, li.title,
                                        li.company, li.price
                                    )}
                                >
                                    Add to Favourite
                                </Button>

                            </div>

                        </div>
                    ))

                    : <div>
                        <p>No products found</p>
                    </div>
                }

            </div>
        </div>
    );
};

export default Product;
