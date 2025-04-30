import React, { createContext, useEffect, useState, ReactNode } from "react";


// Define the shape of your user type
type CurrentUserType = {
   userId?: number;
  username?:string;
  email?: string;
  password?: string;

};

// Create the context with a default value of null
 const AuthContext = createContext<{
  currentUser: CurrentUserType|null;
  updateUser: (data: CurrentUserType) => void;
}|null >(null);

// Define the Props type for the provider
type Props = {
  children: ReactNode;
};

// Create the provider component
 const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const updateUser = (data: CurrentUserType) => {
    setCurrentUser(data);
  };

  return (
    <AuthContext.Provider value={{currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthContextProvider}