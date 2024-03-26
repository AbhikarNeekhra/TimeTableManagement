"use client";
import Circularbar from "@/app/Components/CircularBar/CircularBar";
import Header from "@/app/Components/Header/Header";
import React from "react";
import "./dash.css";
import RespBar from "@/app/Components/RespBar/RespBar";

export default function Dashboard() {
  return (
    <>
      <div className="h-fit w-full hidden lg:block">
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
      <div className="h-full w-full grid place-items-center justify-stretch lg:hidden">
        <RespBar text={"ROOMS"} value={88} />
        <RespBar text={"TIMESLOTS"} value={69} />
        <RespBar text={"FACULTY"} value={60} />
        <RespBar text={"SUBJECTS"} value={53} />
        <RespBar text={"DEPARTMENTS"} value={20} />
        <RespBar text={"TIMETABLES"} value={30} />
        <RespBar text={"SESSIONS"} value={72} />
      </div>
    </>
  );
}
