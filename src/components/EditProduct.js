import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { editProductAction } from '../actions/productActions';

function EditProduct() {
  
  const product = useSelector(state => state.products.product);
  const error = useSelector(state => state.products.error);
  const loading = useSelector(state => state.products.loading);

  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');


  useEffect(() => {
    if(product) {
      setName(product.name);
      setPrice(product.price);
      return;
    }

    history.push('/');
  }, [product, history])

  const editProduct = newProduct => dispatch(editProductAction(newProduct));  
  
  const handleSubmit = e => {
    e.preventDefault();

    if(name.trim() === '' || price <= 0) return;

    editProduct({
      id: product.id,
      name,
      price,
    });

    history.push('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Edit Product
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Product Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Product Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  placeholder="Product Price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Save Changes
              </button>
            </form>
            { loading && <p>Loading...</p> }
            { error &&  <p className="alert alert-danger mt-2 p-2">There was an error</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;