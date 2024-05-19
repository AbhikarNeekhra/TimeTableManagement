"use client";
import { useState, useEffect } from "react";
import Header from "@/app/(Components)/Header/Header";
import { SidebarProvider } from "../../Context/SidebarContext";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [moderatorInfo, setModeratorInfo] = useState(null);

  const fetchModeratorInfo = async () => {
    await axios
      .get("/api/database/faculty")
      .then((response) => {
        setModeratorInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchModeratorInfo();
  }, []);

  const moderator = moderatorInfo?.find(
    (moderator) => moderator.faculty_email === email
  );

  return (
    <>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
      <h1 className="h-fit w-full py-3 px-6 text-center text-xl md:text-3xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FE886A] to-[#FF4B77]">
        <span className="text-black text-lg">Welcome,</span>&nbsp;{" "}
        <Link href="/profile">{moderator?.faculty_name}</Link>
      </h1>
      {session?.user ? (
        <h1> FOUND {JSON.stringify(session?.user)}</h1>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
}
