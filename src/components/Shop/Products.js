import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCTS = [
  {
    id: "I1",
    title: "Test",
    price: 20,
    description: "This is a first product - amazing!",
  },
  {
    id: "I2",
    title: "Test2",
    price: 40,
    description: "This is a second product - amazing!",
  },
  {
    id: "I3",
    title: "Test3",
    price: 60,
    description: "This is a third product - amazing!",
  },
];

const Products = (props) => {
  const productitems = PRODUCTS.map((product) => {
    return (
      <ProductItem
        key={product.id}
        id={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
      />
    );
  });

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productitems}</ul>
    </section>
  );
};

export default Products;
