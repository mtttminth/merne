import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')
  const handleClick = (category) => setSelectedCategory(category)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <div className='text-center my-4'>
            <ButtonGroup>
              {allCategories.map((category) => (
                <Button
                  onClick={() => handleClick(category)}
                  key={category}
                  variant='light'
                  style={{ margin: '5px' }}
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          {products
            .filter(
              (product) =>
                selectedCategory === 'All' ||
                product.category === selectedCategory
            )
            .map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}
{
}
// {products.map((product) => (
export default HomeScreen

//NOTE https://stackoverflow.com/questions/67862657/filtering-by-categories-react-and-bootstrap
