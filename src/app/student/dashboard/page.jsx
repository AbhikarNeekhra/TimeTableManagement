"use client";
import { useState } from "react";
import { SidebarProvider } from "../../Context/SidebarContext";
import Myselect from "../../(Components)/Filter/mySelect/myselect";
import Header from "../../(Components)/Header/Header";
import Image from "next/image";
import share from "../../../../public/share.png";
import FinalTable from "../../finalTable/page";
import Link from "next/link";

export default function Dashboard() {
  const option1 = [
    "JAN-JUN 2024",
    "JUL-DEC 2024",
    "JUL-DEC 2023",
    "JUL-DEC 2025",
  ];

  const option2 = [
    "AIDS",
    "AIML",
    "AIR",
    "AIRR3",
    "CSE",
    "CSE-1",
    "CSE-2",
    "CSE-3",
    "ME",
  ];

  const option3 = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  const [SessionId, setSessionId] = useState("Session ID");
  const [BranchId, setBranchId] = useState("Branch ID");
  const [SemesterId, setSemesterId] = useState("Semester ID");

  return (
    <>
      <div>
        <SidebarProvider>
          <Header />
        </SidebarProvider>
        <h1 className="h-fit w-full py-3 px-6 text-center text-xl md:text-3xl font-bold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#FE886A] to-[#FF4B77]">
          <span className="text-black text-lg">Welcome,</span>&nbsp;{" "}
          <Link href="/profile">ABHIKAR NEEKHRA</Link>
        </h1>
        <div className="h-fit w-full md:w-fit mx-auto md:scale-105 my-3 shadow-myShad">
          <h1 className="text-center text-2xl py-1 text-white font-bold bg-gradient-to-r from-[#FE886A] to-[#FF4B77]">
            YOUR TIMETABLE
          </h1>
          <FinalTable />
        </div>
        {/* <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-2 w-full lg:w-[20%] grid place-items-center px-3">
            <Myselect
              list={option1}
              selected={SessionId}
              setSelected={setSessionId}
              defaultVal={"session id"}
            />
          </div>
          <div className="h-[7vh] my-2 w-full lg:w-[20%] grid place-items-center px-3">
            <Myselect
              list={option2}
              selected={BranchId}
              setSelected={setBranchId}
              defaultVal={"branch id"}
            />
          </div>
          <div className="h-[7vh] my-2 w-full lg:w-[20%] grid place-items-center px-3">
            <Myselect
              list={option3}
              selected={SemesterId}
              setSelected={setSemesterId}
              defaultVal={"Semester id"}
            />
          </div>
          <div className="h-fit my-1 w-full lg:w-[18%] grid place-items-center px-3">
            <div className="h-full w-full grid place-items-center">
              <button className="px-5 py-2 text-xl md:my-0 my-2 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A] flex justify-center items-center">
                Export to PDF
                <Image
                  height={30}
                  width={30}
                  src={share}
                  className="ml-2 scale-110"
                  alt="export"
                />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
