"use client";
import React from "react";
import "./forgot.css";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Forg() {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [newPassword, setNewPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const minPasswordLength = 8;

  const handleChange = (e) => {
    setNewPassword(e.target.value);
    // Check if passwords match after each change
    setPasswordMatch(
      e.target.value === CPassword && e.target.value.length >= minPasswordLength
    );
  };

  const handleMatch = (e) => {
    setCPassword(e.target.value);
    // Check if passwords match after each change
    setPasswordMatch(
      e.target.value === newPassword &&
        e.target.value.length >= minPasswordLength
    );
  };

  const changePassword = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      setLoading(true);
      const response = await axios.put("/api/change-password", {
        email,
        newPassword,
      });
      if (response.ok) {
        console.log("Password Changed");
      }
    } catch (error) {
      console.log("Password Change Failed", error);
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <>
      <div>
        <div className="h-fit w-full px-4 pt-1">
          <h2 className="patua h-fit w-full hidden md:flex md:justify-center md:items-center font-bold text-center text-sm md:text-3xl text-gray-500 ">
            <Image height={80} width={80} src="/logo.png" alt="logo" />
            Madhav Institute of Technology & Science, Gwalior (M. P.), INDIA
          </h2>
          <h2 className="patua h-fit w-full md:hidden font-bold text-center text-sm md:text-3xl text-gray-500 ">
            <Image
              height={50}
              width={50}
              src="/logo.png"
              className="mx-auto rounded-3xl"
              alt="logo"
            />
            Madhav Institute of Technology & Science, Gwalior
          </h2>
          <h2 className="baloo h-fit w-full font-bold hidden md:block -mt-2 text-center text-sm md:text-3xl text-gray-500 ">
            माधव प्रौद्योगिकी एवं विज्ञान संस्थान, ग्वालियर (म.प्र.), भारत
          </h2>
          <h2 className="baloo h-fit w-full md:hidden font-bold text-center text-sm md:text-3xl text-gray-500 ">
            माधव प्रौद्योगिकी एवं विज्ञान संस्थान, ग्वालियर
          </h2>
          <h2 className="h-fit w-full font-semibold text-center -mt-2 text-sm md:text-lg text-gray-500">
            (Deemed to be University)
          </h2>
          <h3 className="flex justify-center font-bold text-sm md:text-lg text-green-600 items-center">
            NAAC ACCREDITED WITH{" "}
            <p className="mx-2 font-bold text-red-500"> A++ </p> Grade{" "}
          </h3>
        </div>
        <div className="bungee h-[7%] w-full md:hidden text-2xl my-2 text-center">
          Time Table Manager
        </div>

        <div className="h-fit md:h-[78vh] w-full mt-3 rounded-xl">
          <div className="h-[93%] w-[90vw] md:w-[60vw] shadow-myShad2 rounded-xl mx-auto md:flex md:justify-center md:items-center grid place-items-center">
            <div className="hidden md:block imu h-full w-[45%] rounded-l-xl pt-4 backdrop-blur-lg">
              <div className="bungee h-[7%] w-full md:text-4xl lg:text-6xl md:mt-32 lg:mt-20 text-center">
                Time<br></br>
                <br></br> Table<br></br>
                <br></br> Manager
              </div>
            </div>
            <div className="clipped-2 h-full w-full md:w-[55%] rounded-r-xl">
              <h3 className="h-fit w-fit md:px-4 md:pt-1 md:text-xl lg:text-3xl xl:text-4xl text-2xl font-bold mx-auto mt-3 mb-2">
                FORGOT &nbsp; PASSWORD
              </h3>
              <div className="h-fit w-fit mt-1 mb-1 p-3 mx-auto">
                <h3 className="patua h-fit w-full text-xl md:text-lg lg:text-2xl text-center mx-auto font-semibold">
                  NEW PASSWORD
                </h3>
                <input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={handleChange}
                  className="h-12 w-[80vw] md:w-64 lg:w-80 px-2 rounded-md text-lg my-1 shadow-myShad"
                  placeholder="Enter New Password ..."
                />
              </div>
              <div className="h-fit w-fit mt-1 mb-1 p-3 mx-auto">
                <h3 className="patua h-fit w-full text-xl md:text-lg lg:text-2xl text-center font-semibold mx-auto">
                  CONFIRM PASSWORD
                </h3>
                <input
                  id="confirmPassword"
                  type="password"
                  value={CPassword}
                  onChange={handleMatch}
                  autoComplete="current-password"
                  className="h-12 w-[80vw] md:w-64 lg:w-80 px-2 rounded-md text-lg my-1 shadow-myShad"
                  placeholder="Confirm Password ..."
                />
              </div>
              {(newPassword.length <= 0 || CPassword.length <= 0) && (
                <h3 className="pl-5 text-red-500 md:text-sm lg:text-lg font-semibold">
                  Passwords required!
                </h3>
              )}
              {newPassword.length < minPasswordLength && (
                <h3 className="pl-5 text-red-500 md:text-sm lg:text-lg font-semibold">
                  Passwords should be greater than 8 characters
                </h3>
              )}
              {!passwordMatch && newPassword !== "" && CPassword !== "" && (
                <h3 className="pl-5 text-red-500 md:text-sm lg:text-lg font-semibold">
                  Passwords do not match!
                </h3>
              )}
              {passwordMatch && newPassword !== "" && CPassword !== "" && (
                <h3 className="pl-5 text-green-500 md:text-sm lg:text-lg font-semibold">
                  Passwords match!
                </h3>
              )}
              <div className="h-fit w-fit mx-auto my-2">
                <button
                  onClick={changePassword}
                  disabled={!passwordMatch || loading}
                  className="px-6 py-3 text-xl font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
