import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
// import products from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import ProductList from '../components/UI/ProductList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from "react-toastify";

import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState('desc');
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const { data: products } = useGetData('products');

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, 'products', id); // Define docRef inside the effect
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log('No product found');
      }
    };

    if (id) { // Check if id is available
      getProduct();
    }
  }, [id]); // Include id in the dependency array

  const { imgUrl, productName, price, description, shortDesc, category } = product;

  const relatedProduct = products.filter(item => item.category === category);

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating
    };
    console.log(reviewObj);
    toast.success('Review Submitted');
  };

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price
    }));
    toast.success('Product added successfully');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt='' />
            </Col>
            <Col lg='6'>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center custom__gap mb-3 rating__group">
                  <div>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-half-s-fill"></i></span>
                  </div>
                  <p>
                    {/* (<span>{avgRating }</span> ratings) */}
                  </p>
                </div>
                <div className='d-flex align-items-center custom__gap'>
                  <span className='product__price'>${price}</span>
                  <span>Category: {category ? category.toUpperCase() : null}</span>
                </div>
                <p className='mt-3'>{shortDesc}</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn" onClick={addToCart}>Add to Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex align-items-center">
                <h6 className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab('rev')}>
                  {/* Reviews ({reviews.length}) */}
                </h6>
              </div>

              {
                tab === 'desc' ? (
                  <div className="tab__content mt-5">
                    <p>{description}</p>
                  </div>
                ) : (
                  <div className='product__review mt-5'>
                    <div className="review__wrapper">
                      {/* <ul>
                        {
                          reviews?.map(function(item, index) {
                            return (
                              <li key={index} className='mb-4'>
                                <h6>John Doe</h6>
                                <span>{item.rating} (rating)</span>
                                <p>{item.text}</p>
                              </li>
                            );
                          })
                        }
                      </ul> */}
                      <div className="review__form">
                        <h4>Leave Your Experience</h4>
                        <form action="" onSubmit={submitHandler}>
                          <div className="form__group">
                            <input type="text" placeholder='Enter Name' ref={reviewUser} required />
                          </div>

                          <div className="form__group d-flex text-align-items-center custom__gap">
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                          </div>
                          <div className="form__group">
                            <textarea ref={reviewMsg} rows={4} placeholder='Review Message...' required />
                          </div>
                          <motion.button whileTap={{ scale: 1.2 }} type='submit' className="buy__btn">Submit</motion.button>
                        </form>
                      </div>

                    </div>
                  </div>
                )
              }

            </Col>
            <Col lg='12' className='mt-5'>
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductList data={relatedProduct} />

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
