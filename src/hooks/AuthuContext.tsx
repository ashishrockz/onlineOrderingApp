import { createContext } from "react";
import { LoginTokenContextType } from "../types/type";
 
export const loginToken = createContext<LoginTokenContextType>({
  token: false,
  setToken: () => {},
});
 