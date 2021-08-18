import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import { verify } from "jsonwebtoken";

const JWT_SECRET = `${process.env.NEXT_PUBLIC_JWT_SECRET}`;

export const AuthContext = createContext<any>(null);
export const CartContext = createContext<any>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCartContext] = useState<Object[]>([]);
  const [auth, setAuthContext] = useState<Object>();

  const addItemToCart = (item: any) => {
    setCartContext([...cart, item]);
  };

  // logging Auth
  console.log("_app Auth : ", auth);

  function checkAuth() {
    const token: any = localStorage.getItem("token");
    if (token) {
      // verify user
      const user = verify(token, JWT_SECRET);
      // set Auth
      setAuthContext(user);
    }
  }

  useEffect(() => {
    // checkAuth();

    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle")
      : null;
  }, []);
  return (
    <AuthContext.Provider value={auth}>
      <CartContext.Provider value={cart}>
        <Head>
          <title>MM E-Commerce</title>
        </Head>
        <Component
          {...pageProps}
          addItemToCart={addItemToCart}
          setCartContext={setCartContext}
          setAuthContext={setAuthContext}
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
export default MyApp;
