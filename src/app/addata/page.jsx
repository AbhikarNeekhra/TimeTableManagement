"use client";
import React, { useState } from "react";
import Image from "next/image";
import down from "../../../public/arrow-down-icon-png-6696.png";
import Myselect from "../(Components)/Filter/mySelect/myselect";
import SessionFilter from "./Session/SessionFilter";
import DepartmentFilter from "./Department/DepartmentFilter";
import TimeslotFilter from "./Timeslot/TimeslotFilter";
import BranchFilter from "./Branch/BranchFilter";
import FacultyFilter from "./Faculty/FacultyFilter";
import SubjectFilter from "./Subject/SubjectFilter";
import RoomFilter from "./Room/RoomFilter";
import SemesterFilter from "./Semester/SemesterFilter";
import BranchTable from "./Branch/BranchTable";
import DepartmentTable from "./Department/DepartmentTable";
import SessionTable from "./Session/SessionTable";
import TimeslotTable from "./Timeslot/TimeslotTable";
import FacultyTable from "./Faculty/FacultyTable";
import SubjectTable from "./Subject/SubjectTable";
import RoomTable from "./Room/RoomTable";
import SemesterTable from "./Semester/SemesterTable";

export default function AddData() {
  const [rout, setRout] = useState("Session");
  const [cont, setCont] = useState(true);

  const handleRoute = (e) => {
    setRout(e.target.innerHTML);
  };

  return (
    <>
      <div className="h-10 w-full bg-gradient-to-r from-[#FE886A] to-[#FF4B77] text-center text-white text-4xl font-bold">
        ADD DATA
      </div>
      <div className="h-fit w-full flex justify-evenly items-center px-5 py-2 overflow-x-auto">
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          Session
        </div>
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          Department
        </div>
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          TimeSlots
        </div>
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          Branch
        </div>
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          Faculty
        </div>
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          Subject
        </div>
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          Room
        </div>
        <div
          onClick={handleRoute}
          className="select-none mx-3 md:mx-0 px-6 py-3 text-lg font-semibold text-white rounded-2xl hover:font-bold hover:text-xl transition-all ease-in-out delay-100 hover:shadow-myShad2 shadow-myShad3 bg-gradient-to-r from-[#FE886A] to-[#FF4B77] cursor-pointer"
        >
          Semester
        </div>
      </div>

      {/* filters */}

      <div className="h-fit w-full">
        <div
          className={`${
            cont
              ? "h-fit py-1 px-2"
              : "h-fit py-1 px-2 bg-gradient-to-r from-[#FE886A] to-[#FF4B77]"
          } w-full transition-all ease-in-out delay-100 py-2`}
        >
          {cont ? (
            <div>
              {rout == "Session" && <SessionFilter />}
              {rout == "Department" && <DepartmentFilter />}
              {rout == "TimeSlots" && <TimeslotFilter />}
              {rout == "Branch" && <BranchFilter />}
              {rout == "Faculty" && <FacultyFilter />}
              {rout == "Subject" && <SubjectFilter />}
              {rout == "Room" && <RoomFilter />}
              {rout == "Semester" && <SemesterFilter />}
            </div>
          ) : (
            <div className="text-xl font-bold text-center animate-bounce">
              Drag Down to Apply Filters
            </div>
          )}
        </div>
        <div className="h-12 w-full mb-5 transition-all ease-in-out delay-100">
          <div
            onClick={() => {
              setCont((prev) => !prev);
            }}
            className="h-7 w-fit px-12 bg-green-300 text-center rounded-b-full text-lg mx-auto"
          >
            {cont ? "DRAG UP" : "DROP DOWN"}
          </div>
          <Image
            onClick={() => {
              setCont((prev) => !prev);
            }}
            height={15}
            width={15}
            className="h-fit w-fit px-4 py-1 bg-red-300 rounded-b-full mx-auto cursor-pointer select-none"
            src={down}
            alt="logo"
          />
        </div>
      </div>

      {/* Components below i want to Re-render on component value change */}
      {rout == "Branch" && <BranchTable />}
      {rout == "Department" && <DepartmentTable />}
      {rout == "Session" && <SessionTable />}
      {rout == "TimeSlots" && <TimeslotTable />}
      {rout == "Faculty" && <FacultyTable />}
      {rout == "Subject" && <SubjectTable />}
      {rout == "Room" && <RoomTable />}
      {rout == "Semester" && <SemesterTable />}
      {/* {rout == "Session" && <Session />} */}
      {/* {rout == "Department" && <Department />} */}
    </>
  );
}
