import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const ShowCartHandler = (props) => {
    setCartIsShown(true);
  };

  const HideCartHandler = (props) => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={HideCartHandler} />}
      <Header onShowCart={ShowCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
