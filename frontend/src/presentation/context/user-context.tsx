"use client"

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type IUserContext = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    login: string;
    token?: string;
  } | null,

  loading: boolean;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

type IUserProvider = {
  children: React.ReactNode;
}
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider:React.FC<IUserProvider> = ({children}) => {
  const {data: session, status} = useSession();

  const [user, setUser] = useState<IUserContext["user"] | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        token: session.accessToken,
        login: session.login
      });
    } else {
      setUser(null);
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{user,  loading: status === "loading"}}>
      {children}
    </UserContext.Provider>
  );
}