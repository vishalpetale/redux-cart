import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// Custom acion creator
export function sentCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data...",
      })
    );

    const sendData = async () => {
      const response = await fetch(
        "https://react-with-redux-9d9fa-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart failed");
      }
    };

    try {
      await sendData();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart successfully.",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to sent cart data.",
        })
      );
    }
  };
}

export function fetchCartData() {
  return async (dispatch) => {
    const getCartData = async () => {
      const response = await fetch(
        "https://react-with-redux-9d9fa-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error();
      }

      const cartData = response.json();
      return cartData;
    };

    try {
      const cartData = await getCartData();
      dispatch(
        cartActions.updateInitialCartData({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Unable to get cart data.",
        })
      );
    }
  };
}
