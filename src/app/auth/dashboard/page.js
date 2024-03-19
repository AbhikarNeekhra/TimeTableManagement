"use client";
import Circularbar from "@/app/Components/CircularBar/CircularBar";
import Header from "@/app/Components/Header/Header";
import React from "react";
import "./dash.css";

export default function Dashboard() {
  return (
    <>
      <div className="h-fit w-full">
        <div className="h-[45vh] w-full grid grid-cols-3 mb-1 gap-0">
          <div className="h-full w-[32vw] grid place-items-center">
            <Circularbar target={88} />
            <h3 className="marmelad text-3xl font-bold text-center">ROOMS</h3>
          </div>
          <div className="h-full w-[32vw] grid place-items-center">
            <Circularbar target={69} />
            <h3 className="marmelad text-3xl font-bold text-center">
              TIMESLOT
            </h3>
          </div>
          <div className="h-full w-[32vw] grid place-items-center">
            <Circularbar target={60} />
            <h3 className="marmelad text-3xl font-bold text-center">FACULTY</h3>
          </div>
        </div>
        <div className="h-[45vh] w-full grid grid-cols-4 gap-2">
          <div className="h-full w-[24.6vw] grid place-items-center">
            <Circularbar target={53} />
            <h3 className="marmelad text-3xl font-bold">SUBJECTS</h3>
          </div>
          <div className="h-full w-[24.6vw] grid place-items-center">
            <Circularbar target={20} />
            <h3 className="marmelad text-3xl font-bold">DEPARTMENTS</h3>
          </div>
          <div className="h-full w-[24.6vw] grid place-items-center">
            <Circularbar target={30} />
            <h3 className="marmelad text-3xl font-bold">TIMETABLES</h3>
          </div>
          <div className="h-full w-[24.6vw] grid place-items-center">
            <Circularbar target={45} />
            <h3 className="marmelad text-3xl font-bold">SESSIONS</h3>
          </div>
        </div>
      </div>
    </>
  );
}
