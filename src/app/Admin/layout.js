import React from "react";
import { SidebarProvider } from "../Context/SidebarContext";
import Header from "../(Components)/Header/Header";

export default function Admin({ children }) {
  return (
    <>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
      {children}
    </>
  );
}
