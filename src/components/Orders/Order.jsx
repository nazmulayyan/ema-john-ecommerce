import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons'

const Order = () => {
    const savedCart = useLoaderData();
    const [cart, setCart ] = useState(savedCart)
    
    const handleRemoveFormCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        // const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
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
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
                >
                    <Link to='/checkout'>
                        <button className='btn-checkout'>
                            <span>Proceed Checkout</span>
                            <FontAwesomeIcon className='clear-cart' icon={faMoneyCheck} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Order;