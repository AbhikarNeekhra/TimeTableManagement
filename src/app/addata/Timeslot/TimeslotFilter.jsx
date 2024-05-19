import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Myselect from "../../(Components)/Filter/mySelect/myselect";
import upload from "../../../../public/upload.png";
import Toast from "../../(Components)/toast/toast";

export default function TimeslotFilter() {
  const DayList = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const [Day, setDay] = useState("Day");
  const [SlotStart, setSlotStart] = useState();
  const [SlotEnd, setSlotEnd] = useState();
  const [Duration, setDuration] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const getFileName = () => {
    if (selectedFile) {
      let fileName = selectedFile.name;
      // Clip filename if its length is greater than the width of the div
      if (fileName.length > 18) {
        fileName = fileName.substring(0, 15) + "...";
      }
      return fileName;
    } else {
      return "No File Selected";
    }
  };

  const addTimeSlot = async () => {
    try {
      const response = await axios.post("/api/database/timeslot", {
        slot_start_time: SlotStart,
        slot_end_time: SlotEnd,
        duration: Duration,
        day: Day,
      });
      console.log(response.data);
      setToastMessage("TimeSlot added successfully!");
    } catch (error) {
      console.error("Error adding time slot:", error);
      setToastMessage("Failed to add TimeSlot. Please try again.");
    }
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <div className="h-fit px-2 py-3 w-[94%] sm:w-[75%] md:w-[60%] lg:[53%] xl:w-[50%] rounded-2xl transition-all ease-in-out delay-100 shadow-AbhiShad mx-auto bg-gradient-to-r from-[#FE886A] to-[#FF4B77] grid place-items-center">
        <div className="h-fit w-full text-center text-4xl text-white font-bold mb-2">
          Time Slots
        </div>
        <div className="h-fit my-1 w-full lg:flex lg:justify-center lg-items-center grid place-items-center px-3">
          <input
            id="fileInput"
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="h-full w-full lg:w-[70%] cursor-pointer rounded-xl flex justify-evenly items-center"
          >
            <div className="h-full w-[68%] lg:w-[65%] py-3 rounded-xl text-xl font-semibold text-white border border-dashed grid place-items-center border-black">
              {getFileName()}
            </div>
            <div className="h-full w-[28%] lg:w-[25%] shadow-AbhiShad bg-red-400 text-xl font-semibold rounded-full md:py-2 grid place-items-center">
              Select
            </div>
          </label>
          <div className="h-full w-full lg:w-[30%] grid place-items-center">
            <button className="px-5 py-2 text-xl md:my-0 my-2 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A] flex justify-center items-center">
              Upload CSV
              <Image
                height={30}
                width={30}
                src={upload}
                className="ml-2 scale-110"
                alt="upload"
              />
            </button>
          </div>
        </div>
        {/* Other content */}
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-fit my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <h3 className="text-white font-semibold">Slot Start Time</h3>
            <input
              onChange={(e) => {
                setSlotStart(e.target.value);
              }}
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-lg outline-none font-semibold text-gray-500"
              type="time"
            />
          </div>
          <div className="h-fit my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <h3 className="text-white font-semibold">Slot End Time</h3>
            <input
              onChange={(e) => {
                setSlotEnd(e.target.value);
              }}
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-lg outline-none font-semibold text-gray-500"
              type="time"
            />
          </div>
          <div className="h-fit my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <h3 className="text-white font-semibold">Duration</h3>
            <input
              onChange={(e) => {
                setDuration(e.target.value);
              }}
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-lg outline-none font-semibold text-gray-500"
              type="time"
            />
          </div>
        </div>
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <Myselect
              list={DayList}
              selected={Day}
              setSelected={setDay}
              defaultVal={"Day"}
            />
          </div>
          <div className="h-fit my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <div className="h-fit py-1 md:mt-2 my-1 w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
              <button
                onClick={addTimeSlot}
                className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
              >
                Add TimeSlot
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
