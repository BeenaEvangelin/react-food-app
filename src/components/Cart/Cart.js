import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import OrderMeals from "./OrderMeals";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isOrderingMeals, setIsOrderingMeals] = useState();
  const [isSubmittingOrders, setIsSubmittingOrders] = useState(false);
  const [didSubmitOrders, setDidSubmitOrders] = useState(false);

  const totalAmount = `Rs.${cartCtx.totalQuantity.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const OrderMealsHandler = () => {
    setIsOrderingMeals(true);
  };

  const SubmitOrderHandler = async (userData) => {
    setIsSubmittingOrders(true);
    await fetch(
      "https://foodapp-c5d07-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmittingOrders(false);
    setDidSubmitOrders(true);
    cartCtx.clearItems();
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const ModalActions = () => {
    return (
      <div className={classes.actions}>
        {hasItems && (
          <button className={classes.button} onClick={OrderMealsHandler}>
            Order
          </button>
        )}
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    );
  };

  const cartModalContent = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrderingMeals && (
        <OrderMeals
          onConfirm={SubmitOrderHandler}
          onCancel={props.onHideCart}
        />
      )}
      {!isOrderingMeals && <ModalActions />}
    </React.Fragment>
  );

  const isSubmittingModalContent = (
    <React.Fragment>
      <p>Please Wait!</p>
      <p>Sending your orders...</p>
    </React.Fragment>
  );
  const didsubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent your orders!</p>
      <p>Thank you for ordering with The Taste Of INDIA!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onClose}>
      {!isSubmittingOrders && !didSubmitOrders && cartModalContent}
      {isSubmittingOrders && isSubmittingModalContent}
      {didSubmitOrders && didsubmitModalContent}
    </Modal>
  );
};
export default Cart;
