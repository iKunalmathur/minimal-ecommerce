// Create Context

import axios from "axios";
import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";

import { createContext, useContext, useEffect, useState } from "react";
const JWT_SECRET = `${process.env.NEXT_PUBLIC_JWT_SECRET}`;

const authContext: any = createContext(null);

// you can wrap your _app.js with this provider

interface AuthProviderProps {
  children: any;
}

export function AuthProvider({ children }: AuthProviderProps): any {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Custom React Hook to access the context

export const useAuth = (): any => {
  // useAuth Return
  return useContext(authContext);
};

function useProvideAuth() {
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

  //Check Auth
  const checkAuth = () => {
    const token: any = localStorage.getItem("token");
    if (token) {
      const user = verify(token, JWT_SECRET);
      setUser(user);
      return;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(0);
    alert("User logout succefully, 🔥");
  };

  return { user, login, logout, checkAuth } as const;
}
