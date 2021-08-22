// Custom React Hook to access the context

import { useContext } from "react";
import UserContext from "../context/UserContext";

export const useAuth = (): any => {
  return useContext(UserContext);
};
