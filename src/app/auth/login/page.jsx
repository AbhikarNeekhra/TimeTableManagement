"use client";
import React from "react";
import "./login.css";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      signIn("credentials", {
        email: user.email,
        password: user.password,
        // callbackUrl: '/auth/dashboard'
      });
      console.log(user.email, user.password);
      console.log("Login Success");
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassWithGoogle = async () => {
    try {
      setLoading(true);
      signIn("google", {
        callbackUrl: "/auth/forgotPass",
      });
    } catch (error) {
      console.log("Try Again in sometime", error);
    } finally {
      setLoading(false);
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

        <div className="h-fit md:h-[78vh] w-full mt-3 rounded-xl md:mb-0 mb-2">
          <div className="h-[93%] w-[90vw] md:w-[76vw] lg:w-[60vw] shadow-myShad2 rounded-xl mx-auto md:flex md:justify-center md:items-center grid place-items-center">
            <div className="hidden md:block imu h-full w-[45%] rounded-l-xl pt-4 backdrop-blur-lg">
              <div className="bungee h-[7%] w-full md:text-4xl lg:text-6xl md:mt-32 lg:mt-20 text-center">
                Time<br></br>
                <br></br> Table<br></br>
                <br></br> Manager
              </div>
            </div>
            <div className="clipped-2 h-full w-full md:w-[55%] rounded-r-xl">
              <h3 className="h-fit w-fit md:px-4 md:pt-1 md:text-5xl text-2xl font-bold mx-auto mt-3 mb-2">
                LOGIN
              </h3>
              <div className="h-fit w-fit mt-1 p-3 mx-auto">
                <h3 className="patua h-fit w-full text-xl md:text-2xl text-center mx-auto font-semibold">
                  USERNAME
                </h3>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="h-12 w-[80vw] md:w-64 lg:w-80 px-2 rounded-md text-lg my-1 shadow-myShad"
                  placeholder="Enter E-Mail ..."
                />
              </div>
              <div className="h-fit w-fit mt-1 mb-1 p-3 mx-auto">
                <h3 className="patua h-fit w-full text-xl md:text-2xl text-center font-semibold mx-auto">
                  PASSWORD
                </h3>
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  autoComplete="current-password"
                  className="h-12 w-[80vw] md:w-64 lg:w-80 px-2 rounded-md text-lg my-1 shadow-myShad"
                  placeholder="Enter Password ..."
                />
              </div>
              <h3 className="pl-5 text-red-500 text-lg font-semibold">
                Don't have an account ?{" "}
                <Link
                  className=" hover:font-bold hover:text-green-400 hover:underline cursor-pointer"
                  href="/auth/signup"
                >
                  Click Here
                </Link>
              </h3>
              <div className="h-fit w-fit mx-auto my-5">
                <button
                  onClick={onLogin}
                  className="px-6 py-3 text-xl font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
                >
                  Sign In
                </button>
              </div>
              <h3 className="baloo h-fit w-fit mx-auto text-xl font-semibold">
                OR LOGIN WITH
              </h3>
              <div className="h-fit w-full mt-1 flex justify-evenly items-center md:mb-0 mb-5">
                <button
                  onClick={handleGoogleSignIn}
                  className="px-6 py-3 text-xl flex justify-evenly items-center font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
                >
                  Sign In
                  <Image
                    className="cursor-pointer hover:scale-105 ml-3"
                    height={25}
                    width={25}
                    src="/google.png"
                    alt="logos"
                  />
                </button>
              </div>
              {/* <div className="h-fit w-full mt-1 flex justify-evenly items-center md:mb-0 mb-5">
                <Image
                  onClick={handleGoogleSignIn}
                  className="cursor-pointer hover:scale-105"
                  height={60}
                  width={60}
                  src="/google.png"
                  alt="logos"
                />
                <Image
                  className="cursor-pointer hover:scale-105"
                  height={55}
                  width={55}
                  src="/facebook.png"
                  alt="logos"
                />
                <Image
                  className="cursor-pointer rounded-full hover:scale-105"
                  height={55}
                  width={55}
                  src="/twitter.png"
                  alt="logos"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
