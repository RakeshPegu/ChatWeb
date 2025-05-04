import { createContext, useEffect, useState, ReactNode } from "react";

// Define the shape of your user type
type CurrentUserType = {
  userId: number;
  username: string;
  email: string;
  password: string;
  created_at:string;
};

// Define the shape of the context value
type AuthContextType = {
  currentUser: CurrentUserType |null;
  updateUser: (data: CurrentUserType|null) => void;
};

// Create the context with initial value `null`
const AuthContext = createContext<AuthContextType | null>(null);

// Define the Props type for the provider
type Props = {
  children: ReactNode;
};

// Create the provider component
const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserType|null>(
    JSON.parse(localStorage.getItem("user")||'null')
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const updateUser = (data: CurrentUserType|null) => {
    setCurrentUser(data);
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
