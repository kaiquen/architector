"use client";

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

type PropsType = {
    children: ReactNode;
}

export const Providers:React.FC<PropsType> = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}