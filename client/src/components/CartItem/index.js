import React from "react";
//import {useStoreContext} from '../../utils/GlobalState';
import {REMOVE_FROM_CART, UPDATE_CART_QUANTITY} from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

//******************* REDUX CONTENT
import {useDispatch} from 'react-redux';

function CartItem({item}){
    
    //******************* REDUX CONTENT
    const dispatch = useDispatch();

    //const[, dispatch] = useStoreContext();

    function removeFromCart(){
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });

        idbPromise('cart', 'delete', {...item});
    }

    function onChange(event){
        const value = event.target.value;

        if(value === '0' || !value){
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });

            idbPromise('cart', 'delete', {...item});
        }
        else{
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });

            idbPromise('cart', 'put', {
                ...item,
                purchaseQuantity: parseInt(value)
            });
        }
    }

    return (
        <div className="flex-row">
            <div>
                <img src={`/images/${item.image}`} alt =""/>
            </div>
            <div>
                <div>{item.name}, ${item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input type="number" placeholder="1" value={item.purchaseQuantity} onChange={onChange}></input>
                    <span role="img" aria-label="trash" onClick={removeFromCart}>🗑️</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem;