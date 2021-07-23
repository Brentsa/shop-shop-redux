import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

//******************* REDUX CONTENT
//import the selector and dispatch functions from redux
import {useSelector, useDispatch} from 'react-redux';
import {UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} from '../../redux/features/categoriesSlice'

function CategoryMenu() {
 
  //******************* REDUX CONTENT
  //define the dispatch and destructure the categories property off of the global store
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.categoryState);

  const {data: categoryData, loading} = useQuery(QUERY_CATEGORIES);

  //runs the first argument callback function when the categoryData and dispatch load from useQuery
  useEffect(() => {
    //if there is category data that has been returned by useQuery then run dispatch
    if(categoryData){
      //Use dispatch to alter redux store state using an imported action as an argument
      dispatch(UPDATE_CATEGORIES({categories: categoryData.categories}));

      //place each category into idb
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    }
    else if(!loading){
      //load all the categories from idb and once complete, update the global state
      idbPromise('categories', 'get').then(categories => {
        //Use dispatch to alter redux store state using an imported action as an argument
        dispatch(UPDATE_CATEGORIES({categories: categories}));
      })
    }
  }, [categoryData, loading, dispatch]);

  const clickHandler = id => {
    //Use dispatch to alter redux store state using an imported action as an argument
    dispatch(UPDATE_CURRENT_CATEGORY({currentCategory: id}));
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
