"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import user from "../../../public/user.png";
import axios from "axios";
import Header from "../(Components)/Header/Header";
import { SidebarProvider } from "../Context/SidebarContext";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  const [User, setUser] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [moderatorInfo, setModeratorInfo] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
      handleDetails(session.user.role);
    }
  }, [session?.user]);

  const handleDetails = async (role) => {
    try {
      if (role === "student") {
        const response = await axios.get("/api/database/student");
        setStudentInfo(response.data);
        console.log("Fetched Student Info:", response.data);
      } else if (role === "admin") {
        const response = await axios.get("/api/database/admin");
        setAdminInfo(response.data);
        console.log("Fetched Admin Info:", response.data);
      } else if (role === "faculty") {
        const response = await axios.get("/api/database/faculty");
        setModeratorInfo(response.data);
        console.log("Fetched Moderator Info:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const getUserRoleData = () => {
    if (!User || !User.email) {
      console.log("User or User.email is undefined");
      return undefined;
    }

    if (session?.user?.role == "student") {
      return studentInfo?.find(
        (student) => student.student_email == User.email
      );
    } else if (session?.user?.role === "admin") {
      return adminInfo?.find((admin) => admin.admin_email === User.email);
    } else if (session?.user?.role === "faculty") {
      return moderatorInfo?.find(
        (moderator) => moderator.faculty_email === User.email
      );
    }
  };

  const userRoleData = getUserRoleData();
  console.log("User Role Data:", userRoleData);

  return (
    <>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
      <div className="min-h-[83vh] h-fit w-[100vw] flex justify-center items-center">
        <div className="h-fit md:py-0 md:scale-110 scale-100 md:h-[50vh] w-[90vw] rounded-2xl md:w-[70vw] lg:w-[50vw] bg-gradient-to-r from-[#FE886A] to-[#FF4B77] shadow-AbhiShad md:flex grid place-items-center">
          <h1 className="h-fit w-full bg-black text-white text-lg mt-3 font-bold py-2 text-center md:hidden">
            Time Table Manager Profile
          </h1>
          <div className="h-full w-full md:w-[35%] grid place-items-center py-3 px-5">
            <div className="w-1/2 md:w-full aspect-square rounded-full shadow-AbhiShad grid place-items-center">
              <Image width={300} height={300} src={user} alt="image" />
            </div>
          </div>
          <div className="h-full w-full md:w-[65%] rounded-2xl px-3 bg-[rgba(255,255,255,0.1)]">
            <div className="h-fit w-full text-lg md:text-xl lg:text-2xl md:block hidden font-bold text-center mb-2 py-3">
              Time Table Manager Profile
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="w-1/4 px-6 py-3">
                  <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                    Name:
                  </p>
                </div>
                <div className="w-fit pl-8 md:pl-5 py-3">
                  <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                    {userRoleData ? userRoleData.student_name : "Loading..."}
                  </p>
                </div>
              </div>
              {session?.user?.role == "student" && userRoleData && (
                <>
                  <div className="flex flex-row">
                    <div className="w-1/4 px-6 py-3">
                      <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                        Email:
                      </p>
                    </div>
                    <div className="w-fit pl-8 md:pl-5 py-3">
                      <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                        {userRoleData.student_email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/4 px-6 py-3">
                      <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                        Enrollment:
                      </p>
                    </div>
                    <div className="w-fit pl-8 md:pl-5 py-3">
                      <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                        {userRoleData.student_enrollment}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/4 px-6 py-3">
                      <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                        Branch:
                      </p>
                    </div>
                    <div className="w-fit pl-8 md:pl-5 py-3">
                      <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                        {userRoleData.student_branch}
                      </p>
                    </div>
                  </div>
                </>
              )}
              {session?.user?.role === "admin" && userRoleData && (
                <>
                  <div className="flex flex-row">
                    <div className="w-1/4 px-6 py-3">
                      <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                        Email:
                      </p>
                    </div>
                    <div className="w-fit pl-8 md:pl-5 py-3">
                      <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                        {userRoleData.admin_email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/4 px-6 py-3">
                      <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                        Department:
                      </p>
                    </div>
                    <div className="w-fit pl-8 md:pl-5 py-3">
                      <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                        {userRoleData.admin_department}
                      </p>
                    </div>
                  </div>
                </>
              )}
              {session?.user?.role === "faculty" && userRoleData && (
                <>
                  <div className="flex flex-row">
                    <div className="w-1/4 px-6 py-3">
                      <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                        Email:
                      </p>
                    </div>
                    <div className="w-fit pl-8 md:pl-5 py-3">
                      <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                        {userRoleData.faculty_email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/4 px-6 py-3">
                      <p className="text-gray-500 text-md md:text-lg lg:text-xl font-semibold">
                        Branch:
                      </p>
                    </div>
                    <div className="w-fit pl-8 md:pl-5 py-3">
                      <p className="text-md md:text-lg lg:text-xl font-semibold text-white">
                        {userRoleData.department_id}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
