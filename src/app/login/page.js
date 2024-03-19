import React from "react";
import Image from "next/image";
import "./login.css";

export default function Login() {
  return (
    <>
      <div>
        <div className="h-fit w-full px-4 pt-1">
          <h2 className="patua h-fit w-full font-bold text-center text-3xl text-blue-500 ">
            Madhav Institute of Technology & Science, Gwalior (M.P.), INDIA{" "}
          </h2>
          <h2 className="baloo h-fit w-full font-bold text-center text-3xl text-blue-500 ">
            माधव प्रौद्योगिकी एवं विज्ञान संस्थान, ग्वालियर (म.प्र.), भारत
          </h2>
          <h2 className="h-fit w-full font-semibold text-center text-lg text-blue-500">
            (Deemed to be University)
          </h2>
          <h3 className="flex justify-center font-bold text-green-600 items-center">
            NAAC ACCREDITED WITH{" "}
            <p className="mx-2 font-bold text-red-500"> A++ </p> Grade{" "}
          </h3>
        </div>

        <div className="h-[80vh] w-full mt-3 rounded-xl">
          <div className="h-[93%] w-[60vw] shadow-myShad2 rounded-xl mx-auto flex justify-center items-center">
            <div className="imu h-full w-[45%] bg-red-500 rounded-l-xl pt-4 backdrop-blur-lg">
              <Image
                height={200}
                width={200}
                className="mx-auto my-3 rounded-3xl"
                src="/logo.png"
                alt="logo"
              />
              <div className="bungee h-[7%] w-full text-6xl mt-10 text-center">
                Time<br></br> Table<br></br> Manager
              </div>
            </div>
            <div className="clipped-2 h-full w-[55%] rounded-r-xl">
              <h3 className="h-fit w-fit px-4 py-1 text-5xl font-bold mx-auto mt-3 mb-2">
                LOGIN
              </h3>
              <div className="h-fit w-fit mt-1 p-3 mx-auto">
                <h3 className="patua h-fit w-full text-2xl text-center font-semibold">
                  USERNAME
                </h3>
                <input
                  className="h-12 w-80 px-2 rounded-md text-lg my-1 shadow-myShad"
                  type="text"
                  placeholder="Enter E-Mail ..."
                />
              </div>
              <div className="h-fit w-fit mt-1 mb-1 p-3 mx-auto">
                <h3 className="patua h-fit w-full text-2xl text-center font-semibold mx-auto">
                  PASSWORD
                </h3>
                <input
                  className="h-12 w-80 px-2 rounded-md text-lg my-1 shadow-myShad"
                  type="password"
                  placeholder="Enter Password ..."
                />
              </div>
              <h3 className="pl-5 text-red-500 text-lg font-semibold">
                Forgot Password ?{" "}
                <a className=" hover:font-bold hover:text-green-400 hover:underline cursor-pointer">
                  Reset Here
                </a>
              </h3>
              <div className="h-fit w-fit mx-auto my-5">
                <button className="px-6 py-3 text-xl font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]">
                  Sign In
                </button>
              </div>
              <h3 className="baloo h-fit w-fit mx-auto text-xl font-semibold">
                OR LOGIN WITH
              </h3>
              <div className="h-fit w-full mt-4 flex justify-evenly items-center">
                <Image
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
