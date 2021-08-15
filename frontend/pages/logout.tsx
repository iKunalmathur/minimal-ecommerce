/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";

interface LogoutProps {
  setAuthContext: Function;
}

export default function logout({ setAuthContext }: LogoutProps) {
  useEffect(() => {
    localStorage.removeItem("token");
    setAuthContext(null);
    return () => {
      console.log("Nice Try");
    };
  }, []);

  return (
    <div className="container mt-5 pt-5">
      User Logout, But You can still explore items <a href="/">Go to home</a>{" "}
    </div>
  );
}
