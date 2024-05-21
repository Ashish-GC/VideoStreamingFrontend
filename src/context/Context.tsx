import { getCurrentUserQuery } from "@/lib/react-query/queriesAndMutation";
import { UserContextType, userType } from "@/types";
import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const initialUser = {
  _id: "",
  username: "",
  email: "",
  fullName: "",
  avatar: "",
  coverImage: "",
  watchHistory: [""],
  createdAt: "",
  updatedAt: "",
  description:"",
  __v: 0,
};

const initialState = {
  user: initialUser,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export const userContext = createContext<UserContextType>(initialState);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    mutateAsync: getCurrentUser,
  } = getCurrentUserQuery();

  const authenticateUser= async()=>{
    if (localStorage.getItem("accessToken") != "") {
    const data= await getCurrentUser();
      
      if(data){
       setUser(data);
       setIsAuthenticated(true);
      }
  } }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default ContextProvider;
