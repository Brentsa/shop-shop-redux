import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import Cart from '../components/Cart';
import { idbPromise } from '../utils/helpers';

//******************* REDUX CONTENT
//import the selector and dispatch functions from redux and specify the portions of the store we need
import {useSelector, useDispatch} from 'react-redux';
import { UPDATE_PRODUCTS } from '../redux/features/productsSlice';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY} from '../redux/features/cartSlice';

function Detail() {

  //******************* REDUX CONTENT
  //define the dispatch and destructure the products and carts properties off of the global store
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.productState);
  const {cart} = useSelector(state => state.cartState);

  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  function addToCart(){
    const cartItem = cart.find(item => item._id === id);
    
    if(cartItem){
      // dispatch({
      //   type: UPDATE_CART_QUANTITY,
      //   _id: id,
      //   purchaseQuantity: parseInt(cartItem.purchaseQuantity) + 1
      // });
      dispatch(UPDATE_CART_QUANTITY({_id: id, purchaseQuantity: parseInt(cartItem.purchaseQuantity) + 1}));
      
      //if we are updating an item already in the cart, then update the cart item with the new quantity
      idbPromise('cart', 'put', {
        ...cartItem,
        purchaseQuantity: parseInt(cartItem.purchaseQuantity) + 1
      });
    }
    else{
      // dispatch({
      //   type: ADD_TO_CART,
      //   product: {...currentProduct, purchaseQuantity: 1}
      // });
      dispatch(ADD_TO_CART({product: {...currentProduct, purchaseQuantity: 1}}));

      //if the item isnt in the cart then we update the idb cart with a qty of 1
      idbPromise('cart', 'put', {
        ...currentProduct,
        purchaseQuantity: 1
      });
    }
  }

  function removeFromCart(){
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: currentProduct._id
    // })
    dispatch(REMOVE_FROM_CART({_id: currentProduct._id}));

    //delete the item from idb cart object store
    idbPromise('cart', 'delete', {...currentProduct});
  }

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    else if (data){
      // dispatch({
      //   type: UPDATE_PRODUCTS,
      //   products: data.products
      // });
      dispatch(UPDATE_PRODUCTS({products: data.products}));

      data.products.forEach(product => {
        idbPromise('products', 'put', product);
      });
    }
    else if (!loading){
      idbPromise('products', 'get').then(products => {
        // dispatch({
        //   type: UPDATE_PRODUCTS,
        //   products: products
        // });
        dispatch(UPDATE_PRODUCTS({products: products}));
      });
    }
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button disabled={!cart.find(item => item._id === currentProduct._id)} onClick={removeFromCart}>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart/>
    </>
  );
}

export default Detail;
