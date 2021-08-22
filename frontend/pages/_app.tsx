import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import UserContext from "../context/UserContext";
import axios from "axios";
import Cookies, { remove } from "js-cookie";
import Router from "next/router";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../services/env-variables";

export const CartContext = createContext<any>(null);

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCartContext] = useState<Object[]>([]);

  const addItemToCart = (item: any) => {
    setCartContext([...cart, item]);
  };

  // Store user data is state
  const [user, setUser] = useState<any>(0);

  // Login
  const login = async (email: string, password: string) => {
    const formData = {
      email,
      password,
    };

    try {
      const res = await axios.post("/api/login", formData);

      console.log("useAuth login res : ", res.data);

      const { status, message, data } = res.data;

      // if any error return with error message
      if (status === "error") {
        return { status, message };
      }

      // Set token Cookies
      Cookies.set("token", data.token, { expires: 1 / 24 });

      // set User
      setUser(data.user);

      return { status, message };
    } catch (error) {
      console.log("Catch Error : ", error);
    }
  };

  //Check User Logged In
  const checkUserLoggedIn = async () => {
    const token: any = Cookies.get("token");

    if (token) {
      try {
        const res = await axios.get(`/api/user`, {
          params: {
            token,
          },
        });

        if (res.data.status === "error") {
          // Router.push("/login");
          console.log(res.data.message);
          Cookies.remove("token");
          return;
        }
        // Set Auth User
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Logout
  const logout = () => {
    Cookies.remove("token");
    setUser(0);
    Router.push("/");
    alert("User Logout, 🔥");
  };

  // Component mount
  useEffect(() => {
    checkUserLoggedIn();
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap.bundle")
      : null;
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
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
    </UserContext.Provider>
  );
}
export default MyApp;
