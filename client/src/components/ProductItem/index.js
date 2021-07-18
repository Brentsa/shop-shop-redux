import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions'; 
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const { image, name, _id, price, quantity } = item;

  //define the current state and a function to update the global state
  const [ state, dispatch ] = useStoreContext();

  //function to add an item to the global cart state that uses the dispatch function
  function addToCart(){

    //check to see if the item is already in the cart
    const cartItem = state.cart.find(item => item._id === _id);

    //if it is in the cart then increase the qty by 1
    if(cartItem){
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(cartItem.purchaseQuantity) + 1
      });

      idbPromise('cart', 'put', {
        ...cartItem,
        purchaseQuantity: parseInt(cartItem.purchaseQuantity) + 1 
      })
    }
    //if it isnt in the cart then add it to cart with a qty of 1
    else{
      dispatch({
        type: ADD_TO_CART,
        product: {...item, purchaseQuantity: 1}
      });

      idbPromise('cart', 'put', {
        ...item,
        purchaseQuantity: 1
      })
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
