"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./filter.css";
import Myselect from "./mySelect/myselect";
import FinalTable from "@/app/finalTable/page";

export default function Filter() {
  const [active, setActive] = useState(true);
  const [show, setShow] = useState(false);
  const option1 = ["2021", "2022", "2023", "2024", "2025", "2026"];
  const option2 = [
    "Computer Science & Engineering",
    "Mathematics & Computing",
    "Information Technology",
    "Electrical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Mechanical Engineering",
  ];
  const option3 = [
    "1st SEM",
    "2nd SEM",
    "3rd SEM",
    "4rth SEM",
    "5th SEM",
    "6th SEM",
  ];
  const option4 = ["CSE", "MAC", "AIDS", "AIML", "ITIOT", "CE", "AE"];
  const option5 = ["01-04-23", "22-06-23", "06-02-24", "23-07-24", "12-08-24"];
  const option6 = ["Option 1", "Option 2", "Option with a longer text"];
  const [selected1, setSelected1] = useState("Session");
  const [selected2, setSelected2] = useState("Department");
  const [selected3, setSelected3] = useState("Semester");
  const [selected4, setSelected4] = useState("Branch");
  const [selected5, setSelected5] = useState("Day");
  const [selected6, setSelected6] = useState("Session");

  const handleDrop = () => {
    setActive((prev) => !prev);
  };

  const FilterContent = () => {
    return (
      <>
        <div className="filcon h-fit md:h-[84%] w-[50%] mx-auto">
          <div className="h-[100%] w-fit lg:w-[80%] shadow-AbhiShad rounded-2xl mx-auto py-5 px-3">
            <div className="h-fit py-2 sm:grid sm:place-items-center mx-auto lg:flex lg:justify-evenly lg:items-center sm:my-1 lg:my-2">
              <Myselect
                list={option1}
                selected={selected1}
                setSelected={setSelected1}
                defaultVal={"Sesssss"}
              />
              <Myselect
                list={option2}
                selected={selected2}
                setSelected={setSelected2}
                defaultVal={"Department"}
              />
            </div>
            <div className="h-fit py-2 sm:grid sm:place-items-center lg:flex lg:justify-evenly lg:items-center sm:my-1 lg:my-2">
              <Myselect
                list={option3}
                selected={selected3}
                setSelected={setSelected3}
                defaultVal={"Semester"}
              />
              <Myselect
                list={option4}
                selected={selected4}
                setSelected={setSelected4}
                defaultVal={"Branch"}
              />
              <Myselect
                list={option5}
                selected={selected5}
                setSelected={setSelected5}
                defaultVal={"Day"}
              />
            </div>
            <div className="h-fit w-full grid">
              <button
                onClick={() => {
                  setShow((prev) => !prev);
                }}
                className="h-fit w-fit px-5 py-2 text-xl mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
              >
                GET TIME TABLE
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={`${active ? "xl:h-[38vh] py-1" : "h-[4vh]"} w-full slidee`}
      >
        <h1
          className={`lilta ${
            active
              ? "h-[15%] text-3xl pt-[2px] font-semibold"
              : "h-[4vh] text-xl bg-red-100"
          } w-full text-center`}
        >
          {active ? "APPLY - FILTERS" : "DROP DOWN TO APPLY FILTERS"}
        </h1>
        {active ? <FilterContent /> : <></>}
      </div>
      <div className="h-[3vh] w-full mt-[3px] mb-5">
        <div className="h-[3vh] w-[12vw] bg-red-400 mx-auto grid place-items-center font-semibold text-white rounded-b-full">
          {active ? "DRAG UP" : "DROP DOWN"}
        </div>
        <div
          onClick={handleDrop}
          className="h-[3vh] w-[8vh] bg-green-200 rounded-b-full mx-auto grid place-items-center cursor-pointer"
        >
          <Image
            height={20}
            width={20}
            className={` ${active ? "rotate-180" : ""}`}
            src="/arrow-down-icon-png-6696.png"
            alt="dropdown"
          />
        </div>
      </div>
      {show && <FinalTable />}
    </>
  );
}
