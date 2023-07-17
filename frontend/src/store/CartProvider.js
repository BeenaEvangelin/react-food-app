import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    const updatedTotalQuantity =
      state.totalQuantity + action.item.price * action.item.quantity;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedCartItems;

    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems = state.items.concat(action.item);
    }

    return {
      items: updatedCartItems,
      totalQuantity: updatedTotalQuantity,
    };
  }
  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalQuantity = state.totalQuantity - existingCartItem.price;
    let updatedCartItems;
    if (existingCartItem.quantity === 1) {
      updatedCartItems = state.item.filter((item) => item.id !== action.id);
    } else {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    }
    return {
      items: updatedCartItems,
      totalQuantity: updatedTotalQuantity,
    };
  }

  if (action.type === "CLEAR_CART") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const AddItemToCartHandler = (item) => {
    return dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };
  const RemoveItemFromCartHandler = (id) => {
    return dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };
  const ClearCartHandler = () => {
    return dispatchCartAction({ type: "CLEAR_CART" });
  };
  const cartContext = {
    items: cartState.items,
    totalQuantity: cartState.totalQuantity,
    addItem: AddItemToCartHandler,
    removeItem: RemoveItemFromCartHandler,
    clearItems: ClearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
