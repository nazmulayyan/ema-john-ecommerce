import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { removeFromDb } from '../../utilities/fakedb';

const Order = () => {
    const savedCart = useLoaderData();
    const [cart, setCart ] = useState(savedCart)
    
    const handleRemoveFormCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        // const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id)
    }
    return (
        <div className='shop-container'>
            <div className='review-container'> 
                {
                    cart.map(product => <ReviewItem 
                    key={product.id}
                    product={product}
                    handleRemoveFormCart={handleRemoveFormCart}
                    ></ReviewItem>)
                }

            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Order;