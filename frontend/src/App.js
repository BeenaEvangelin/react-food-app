import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Error from "./components/pages/Error";
import RootLayout from "./components/pages/RootLayout";
import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Login from "./components/pages/Login";
import AuthenticationPage, {
  action as authAction,
} from "./components/pages/Authentication";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "auth", element: <AuthenticationPage />, action: authAction },
      ],
    },
  ]);

  const [cartIsShown, setCartIsShown] = useState(false);

  const ShowCartHandler = (props) => {
    setCartIsShown(true);
  };

  const HideCartHandler = (props) => {
    setCartIsShown(false);
  };
  return (
    <>
      <RouterProvider router={router} />
      <CartProvider>
        {cartIsShown && <Cart onHideCart={HideCartHandler} />}
        <Header onShowCart={ShowCartHandler} />
        <Meals />
      </CartProvider>
    </>
  );
}

export default App;
