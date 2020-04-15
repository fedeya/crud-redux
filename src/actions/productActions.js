import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR
} from '../types';

import axios from '../config/axios';

import Swal from 'sweetalert2';

// create new product
export const addProductAction = product => async dispatch => {
  dispatch({
    type: ADD_PRODUCT
  });

  try {
    await axios.post('products', product);
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: product
    });

    Swal.fire(
      'Success', 
      'the product was successfully added', 
      'success'
    );
  } catch(err) {
    dispatch({
      type: ADD_PRODUCT_ERROR
    });

    Swal.fire({
      icon: 'error',
      title: 'There was an error',
      text: 'there was an error, try again'
    });
  }

}

// get products in the db
export const getProductsAction = async dispatch => {
  dispatch({
    type: GET_PRODUCTS
  });

  try {
    const res = await axios.get('products');
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: GET_PRODUCTS_ERROR
    });
  }

}