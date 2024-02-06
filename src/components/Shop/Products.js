import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCETS = 
[
  {id: 'p1',
  price: 6,
  title: 'My first Book',
  description: ' The first book I wrote',
},
{id: 'p2',
price: 4,
title: 'My second Book',
description: ' The second book I wrote',
},
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCETS.map(product => (
           <ProductItem
           key={product.id}
           id ={product.id}
           title={product.title}
           price={product.price}
           description={product.description}
         />
        ))}
       
      </ul>
    </section>
  );
};

export default Products;
