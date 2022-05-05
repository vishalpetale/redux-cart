import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import { uiActions } from "./store/ui-slice";
let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    const sendCart = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data...",
        })
      );

      const response = await fetch(
        "https://react-with-redux-9d9fa-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart successfully.",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCart().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to sent cart data.",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
