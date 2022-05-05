import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const items = useSelector((state) => state.cart.items);

  let cartContent = "";
  if (items.length === 0) {
    cartContent = <p>Add items to cart</p>;
  }
  if (items.length > 0) {
    cartContent = items.map((item) => {
      return (
        <CartItem
          key={item.id}
          item={{
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.totalPrice,
          }}
        />
      );
    });
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartContent}</ul>
    </Card>
  );
};

export default Cart;
