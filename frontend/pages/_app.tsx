import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import { AuthProvider } from "../services/useAuth";

export const CartContext = createContext<any>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCartContext] = useState<Object[]>([]);

  const addItemToCart = (item: any) => {
    setCartContext([...cart, item]);
  };

  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle")
      : null;
  }, []);
  return (
    <AuthProvider>
      <CartContext.Provider value={cart}>
        <Head>
          <title>MM E-Commerce</title>
        </Head>
        <Component
          {...pageProps}
          addItemToCart={addItemToCart}
          setCartContext={setCartContext}
        />
      </CartContext.Provider>
    </AuthProvider>
  );
}
export default MyApp;
