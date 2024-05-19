"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import "./SIdebar.css";
import Link from "next/link";
import { useSidebarContext } from "../../Context/SidebarContext";

export default function Sidebar() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "#",
    },
    {
      name: "Login",
      href: "/auth/login",
    },
    {
      name: "Signup",
      href: "/auth/signup",
    },
    {
      name: "Dashboard",
      href: "/auth/dashboard",
    },
  ];

  const facultyList = [
    {
      name: "Home",
      href: "/student/dashboard",
    },
    {
      name: "Profile",
      href: "/profile",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "#",
    },
    {
      name: "Login",
      href: "/auth/login",
    },
    {
      name: "Feedback",
      href: "/feedback",
    },
  ];

  const StudentMenuItems = [
    {
      name: "Home",
      href: "/student/dashboard",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "#",
    },
    {
      name: "Login",
      href: "/auth/login",
    },
    {
      name: "Feedback",
      href: "/feedback",
    },
  ];

  useEffect(() => {
    if (session?.user?.role == "student") {
      setList(...StudentMenuItems);
    } else if (session?.user?.role == "admin") {
      setList(...menuItems);
    }
  }, []);

  return (
    <>
      <div
        onClick={handleSidebar}
        className={`h-16 w-32 rounded-l-2xl ${
          isSidebarOpen
            ? "iconactive lg:right-96 md:right-[40%]"
            : "icon lg:right-[24%] md:right-[37%]"
        } hidden md:flex justify-evenly items-center cursor-pointer bg-gradient-to-r from-[#FF4B77] to-[#FE886A] absolute top-0`}
      >
        <div className="h-9 w-9 grid place-items-center text-white text-2xl font-bold cursor-pointer hover:invert hover:scale-105 hover:shadow-myShad transition-all ease-in-out delay-75">
          {isSidebarOpen ? (
            <h1 className="h-9 w-9 grid place-items-center rounded-full border border-yellow">
              x
            </h1>
          ) : (
            <Image
              width={40}
              height={40}
              src="/326511_apps_grid_icon.png"
              alt="image"
            />
          )}
        </div>
        <div className="text-white text-xl font-bold">
          {isSidebarOpen ? "CLOSE" : ""}
        </div>
      </div>
      <div
        className={`h-screen w-full md:w-96 py-2 px-3 ${
          isSidebarOpen ? "menuactive" : "menu"
        } bg-gradient-to-b from-[#FF4B77]  to-[#FE886A] fixed top-0 right-0 z-30 md:overflow-auto overflow-y-scroll`}
      >
        {/* exit button */}

        <div
          onClick={() => {
            setIsSidebarOpen((prev) => !prev);
          }}
          className="h-12 w-[60%] mx-auto md:hidden shadow-myShad2 hover:shadow-myShad2 cursor-pointer hover:scale-125 md:hover:-translate-x-10 transition-all ease-in-out delay-100 rounded-md bg-gradient-to-t from-[#ff4b78ce]  to-[#FE886A] mt-1 mb-3 grid place-items-center text-2xl font-semibold text-white"
        >
          Exit
        </div>

        {/* exit ends here */}

        {/* head starts */}

        <div className="h-20 w-full shadow-AbhiShad rounded-md bg-gradient-to-b from-[#FF4B77]  to-[#FE886A] flex">
          <div className="h-full w-[25%] grid place-items-center">
            <div className="h-[73px] w-[73px] md:h-[90%] md:w-[84%] rounded-full bg-red-300"></div>
          </div>
          <div className="h-full w-[75%]">
            {session?.user ? (
              <>
                <h3 className="h-[50%] w-full grid justify-start place-items-center text-2xl font-semibold mt-2 pl-2 text-white">
                  {session?.user?.email}
                </h3>
                <h4 className="h-[30%] w-full flex justify-start place-items-center text-2xl pl-2 font-bold text-white">
                  ROLE : &nbsp;
                  <p className="text-green-300">
                    {" "}
                    {(session?.user?.role).toUpperCase()}
                  </p>
                </h4>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* head ends hereree */}

        {/* other items startssss */}
        {session?.user?.role == "student" &&
          StudentMenuItems.map((item) => {
            return (
              <Link
                href={item.href}
                className="h-16 w-full shadow-myShad3 hover:shadow-myShad2 cursor-pointer transition-all ease-in-out delay-100 rounded-md bg-gradient-to-b from-[#FF4B77]  to-[#FE886A] mt-6 grid place-items-center hover:text-3xl hover:font-bold text-clip text-2xl font-semibold text-white"
              >
                {item.name.toUpperCase()}
              </Link>
            );
          })}

        {session?.user?.role == "admin" &&
          menuItems.map((item) => {
            return (
              <Link
                href={item.href}
                className="h-16 w-full shadow-myShad3 hover:shadow-myShad2 cursor-pointer transition-all ease-in-out delay-100 rounded-md bg-gradient-to-b from-[#FF4B77]  to-[#FE886A] mt-6 grid place-items-center hover:text-3xl hover:font-bold text-clip text-2xl font-semibold text-white"
              >
                {item.name.toUpperCase()}
              </Link>
            );
          })}

        {session?.user?.role == "faculty" &&
          facultyList.map((item) => {
            return (
              <Link
                href={item.href}
                className="h-16 w-full shadow-myShad3 hover:shadow-myShad2 cursor-pointer transition-all ease-in-out delay-100 rounded-md bg-gradient-to-b from-[#FF4B77]  to-[#FE886A] mt-6 grid place-items-center hover:text-3xl hover:font-bold text-clip text-2xl font-semibold text-white"
              >
                {item.name.toUpperCase()}
              </Link>
            );
          })}

        {session?.user ? (
          <>
            <div
              onClick={() => signOut()}
              className="h-16 w-full shadow-myShad3 hover:shadow-myShad2 cursor-pointer transition-all ease-in-out delay-100 rounded-md bg-gradient-to-b from-[#FF4B77]  to-[#FE886A] mt-6 grid place-items-center hover:text-3xl hover:font-bold text-2xl font-semibold text-white"
            >
              LOG OUT
            </div>
          </>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="h-16 w-full shadow-myShad3 hover:shadow-myShad2 cursor-pointer transition-all ease-in-out delay-100 rounded-md bg-gradient-to-b from-[#FF4B77]  to-[#FE886A] mt-6 grid place-items-center hover:text-3xl hover:font-bold text-2xl font-semibold text-white"
            >
              SIGN IN
            </Link>
          </>
        )}

        {/* other items end here */}
      </div>
    </>
  );
}
