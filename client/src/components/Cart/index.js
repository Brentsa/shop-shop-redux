import React, {useEffect} from "react";
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './style.css';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from "../../utils/queries";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from "@apollo/client";

//******************* REDUX CONTENT
//import the selector and dispatch functions from redux and specify the portions of the store we need
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../redux/features/cartSlice';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function Cart(){

    //******************* REDUX CONTENT
    //define the dispatch and destructure the cartOpen and carts properties off of the global store
    const dispatch = useDispatch();
    const {cart, cartOpen} = useSelector(state => state.cartState);

    //useLazyQuery is used when needed and can be called after the component is mounted
    //data variable will contain the checkout session after the query is called with getCheckout
    const [getCheckout, {data}] = useLazyQuery(QUERY_CHECKOUT);

    //gets called when cart is rendered
    useEffect(()=>{
        //return whatever is in the idb cart and store it to the global store
        async function getCart(){
            const cart = await idbPromise('cart', 'get');

            //Use dispatch to alter redux store state using an imported action as an argument
            dispatch(ADD_MULTIPLE_TO_CART({products: [...cart]}));
        }

        //if there is nothing in the cart, try getting the cart from idb
        if(!cart.length){
            getCart();
        }
    }, [cart.length, dispatch]);

    //gets called when data is returned from getCheckout
    useEffect(()=>{
        if(data){
            stripePromise.then(res => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            })
        }
    }, [data]);

    function toggleCart(){
        //Use dispatch to alter redux store state using an imported action as an argument
        dispatch(TOGGLE_CART());
    }

    function calculateTotal(){
        return cart.reduce((sum, product) => sum + product.price * product.purchaseQuantity, 0).toFixed(2);
    }

    function submitCheckout(){
        const productIds = [];

        cart.forEach(item => {
            for(let i = 0; i < item.purchaseQuantity; i++){
                productIds.push(item._id);
            }
        })

        getCheckout({variables: {products: productIds}});
    }

    if(!cartOpen){
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span role="img" aria-label="cart">🛒</span>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2>Shopping Cart</h2>
            {cart.length ? (
                <div>
                    {cart.map(item => (
                        <CartItem key={item._id} item={item}/>
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ? <button onClick={submitCheckout}>Checkout</button> : <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ):(
                <h3>
                    <span aria-label="shocked" role="img">😱</span>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    )
}

export default Cart;