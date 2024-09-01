import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import '../styles/all-product.css';

const AllProducts = () => {
  const { data: productsData, loading } = useGetData('products');

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Deleted Successfully');
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className='fw-bold text-center'>Loading...</td>
                  </tr>
                ) : (
                  productsData.map(item => (
                    <tr key={item.id}>
                      <td data-label="Image">
                        <img src={item.imgUrl} alt={item.productName} />
                      </td>
                      <td data-label="Title">{item.productName}</td>
                      <td data-label="Category">{item.category}</td>
                      <td data-label="Price">${item.price}</td>
                      <td data-label="Action">
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
