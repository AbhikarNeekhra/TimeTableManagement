"use client";
import Session from "./session/page.jsx";
import Department from "./department/page.jsx";
import Branch from "./branch/page.jsx";
import Room from "./room/page.jsx";
import Subject from "./subject/page.jsx";
import Faculty from "./faculty/page.jsx";
import TimeSlot from "./timeslot/page.jsx";
import Semester from "./semester/page.jsx";
import Student from "./student/page";

const AddRecord = () => {
  return (
    <>
      <div className="ml-10">
        <Session />
        <Department />
        <TimeSlot />
        <Branch />
        <Semester />
        <Room />
        <Faculty />
        <Student />
        <Subject />

      </div>
    </>
  );
};

export default AddRecord;
