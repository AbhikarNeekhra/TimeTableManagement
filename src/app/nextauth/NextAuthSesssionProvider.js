"use client";
import { SessionProvider } from "next-auth/react"


const NextAuthSesssionProvider = ({ children }) => {
    return <SessionProvider> {children}</SessionProvider>
}

export default NextAuthSesssionProvider;