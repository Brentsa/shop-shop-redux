import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
//import {useStoreContext} from '../../utils/GlobalState';
import {UPDATE_CURRENT_CATEGORY, UPDATE_CATEGORIES} from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

//******************* REDUX CONTENT
import {useSelector, useDispatch} from 'react-redux';
const selectCategoryState = state => state.categoryState;

function CategoryMenu() {
 
  //******************* REDUX CONTENT
  const dispatch = useDispatch();
  const {categories} = useSelector(selectCategoryState);
  //console.log("Categories have been logged: ", categories);

  //call and receive the current state from the global context
  //const [state, dispatch] = useStoreContext();
  //const {categories} = state;
  const {data: categoryData, loading} = useQuery(QUERY_CATEGORIES);

  //runs the first argument callback function when the categoryData and dispatch load from useQuery
  useEffect(() => {
    //if there is category data that has been returned by useQuery then run dispatch
    if(categoryData){
      //execute the dispatch function to use the update categories action and provide the new category data to the state
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });

      //place each category into idb
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    }
    else if(!loading){
      //load all the categories from idb and once complete, update the global state
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        })
      })
    }
  }, [categoryData, loading, dispatch]);

  const clickHandler = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    })
  }

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            clickHandler(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
