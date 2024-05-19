import React, { useState } from "react";
import Image from "next/image";
import upload from "../../../../public/upload.png";
import axios from "axios";
import Myselect from "../../(Components)/Filter/mySelect/myselect";
import Toast from "../../(Components)/toast/toast";

export default function SessionFilter() {
  const Sessions = ["1", "2", "3", "4", "5", "6"];

  const [ActSession, setActSession] = useState("Active Session");
  const [sessionName, setSessionName] = useState("");
  const [sessionYear, setSessionYear] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
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

  const addSession = async () => {
    const data = {
      session_name: sessionName,
      session_year: sessionYear,
      active_session: ActSession,
      day_start_time: startTime,
      day_end_time: endTime,
    };
    try {
      const response = await axios.post("/api/database/session", data);
      console.log(response.data);
      setToastMessage("Session added successfully!");
      // Reset form fields
      setSessionName("");
      setSessionYear("");
      setActSession("Active Session");
      setStartTime("");
      setEndTime("");
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    } catch (error) {
      setToastMessage("Failed to add session. Please try again.");
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
      console.error(error);
    }
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <div className="h-fit px-2 py-3 w-[94%] sm:w-[75%] md:w-[60%] lg:[53%] xl:w-[50%] rounded-2xl transition-all ease-in-out delay-100 shadow-AbhiShad mx-auto bg-gradient-to-r from-[#FE886A] to-[#FF4B77] grid place-items-center">
        <div className="h-fit w-full text-center text-4xl text-white font-bold mb-2">
          Session
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
            <div className="h-full w-[66%] lg:w-[65%] py-3 rounded-xl text-xl font-semibold text-white border border-dashed grid place-items-center border-black">
              {getFileName()}
            </div>
            <div className="py-2 px-1 md:px-0 md:h-full w-[25%] lg:w-[25%] shadow-AbhiShad bg-red-400 text-xl font-semibold rounded-full md:py-2 grid place-items-center">
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
          <div className="h-[7vh] my-1 w-full lg:w-[58%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Session Name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[38%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Session Year"
              value={sessionYear}
              onChange={(e) => setSessionYear(e.target.value)}
            />
          </div>
        </div>
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <Myselect
              list={Sessions}
              selected={ActSession}
              setSelected={setActSession}
              defaultVal={"Semester"}
            />
          </div>
        </div>
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-fit my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <h3 className="text-white font-semibold">Day Start Time</h3>
            <input
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
              value={startTime}
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-lg outline-none font-semibold text-gray-500"
              type="time"
            />
          </div>
          <div className="h-fit my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <h3 className="text-white font-semibold">Day End Time</h3>
            <input
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-lg outline-none font-semibold text-gray-500"
              type="time"
            />
          </div>
        </div>
        <div className="h-fit py-1 md:mt-2 my-1 w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <button
            onClick={addSession}
            className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
          >
            Add Session
          </button>
        </div>
      </div>
    </>
  );
}
