import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
//import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';

//******************* REDUX CONTENT
import {useSelector, useDispatch} from 'react-redux';
const selectProductState = state => state.productState;
const selectCategoryState = state => state.categoryState;
//

function ProductList() {

  //******************* REDUX CONTENT
  const dispatch = useDispatch();
  const {products} = useSelector(selectProductState);
  const {categories, currentCategory} = useSelector(selectCategoryState);
  console.log("Products have been logged: ", products);
  console.log("Categories have been logged: ", categories);
  //

  //const [state, dispatch] = useStoreContext();
  //const {currentCategory} = state;
  const {loading, data} = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    //if there is data to be stored globally
    if(data){
      //store it in the global store
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      //save the products info into indexedDB as well as the global store
      data.products.forEach(product => {
        idbPromise('products', 'put', product);
      });
    }
    //check if loading is undefined which will occur if offline
    else if(!loading){
      //since we are offline, get all the product data from idb
      idbPromise('products', 'get').then((products) => {
        //update the global store using the idb data
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch])

  function filterProducts() {
    if (!currentCategory) {
      //return state.products;
      return products;
    }

    //return state.products.filter(product => product.category._id === currentCategory);
    return products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {/*state.products.length*/ products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
