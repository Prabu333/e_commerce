import React, { useState, useEffect } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Shop.css';
// import products from '../assets/data/products'
import ProductsList from '../components/UI/ProductList';
import useGetData from '../custom-hooks/useGetData';

const Shop = () => {
  const { data: products, loading } = useGetData('products');
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (products) {
      setProductsData(products);
    }
  }, [products]);

  const handleFilter = e => {
    const filterValue = e.target.value;
    
    if (!products) return;

    let filteredProducts = [];

    switch (filterValue) {
      case 'sofa':
        filteredProducts = products.filter(item => item.category === 'sofa');
        break;
      case 'chair':
        filteredProducts = products.filter(item => item.category === 'chair');
        break;
      case 'mobile':
        filteredProducts = products.filter(item => item.category === 'mobile');
        break;
      case 'watch':
        filteredProducts = products.filter(item => item.category === 'watch');
        break;
      case 'wireless':
        filteredProducts = products.filter(item => item.category === 'wireless');
        break;
      default:
        filteredProducts = products;
    }

    setProductsData(filteredProducts);
  };

  const handleSearch = e => {
    const searchItem = e.target.value;
    
    if (!products) return;

    const searchedProducts = products.filter(item =>
      item.productName.toLowerCase().includes(searchItem.toLowerCase())
    );

    setProductsData(searchedProducts);
  };

  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />

      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className="filter">
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input
                  type="text"
                  placeholder='Search.....'
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {loading ? (
        <section className='pt-0'>
          <Container>
            <Row>
              <Col lg='12'>
                <div className="loading__indicator">Loading...</div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className='pt-0'>
          <Container>
            <Row>
              {productsData.length === 0 ? <h1 className="no__data">No products are found!</h1> :
                <ProductsList data={productsData} />
              }
            </Row>
          </Container>
        </section>
      )}
    </Helmet>
  );
};

export default Shop;
