import React, { useState } from "react";
import Image from "next/image";
import down from "../../../../public/arrow-down-icon-png-6696.png";
import upload from "../../../../public/upload.png";
import Myselect from "../../(Components)/Filter/mySelect/myselect";
import Table from "../../(Components)/table/page";

export default function DepartmentFilter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");

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

  const handleDepartmentIdChange = (e) => {
    setDepartmentId(e.target.value);
  };

  const handleDepartmentNameChange = (e) => {
    setDepartmentName(e.target.value);
  };

  return (
    <>
      <div className="h-fit px-2 py-3 w-[94%] sm:w-[75%] md:w-[60%] lg:[53%] xl:w-[50%] rounded-2xl transition-all ease-in-out delay-100 shadow-AbhiShad mx-auto bg-gradient-to-r from-[#FE886A] to-[#FF4B77] grid place-items-center">
        <div className="h-fit w-full text-center text-4xl text-white font-bold mb-2">
          Semester
        </div>
        {/* Other content */}
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-1 w-full lg:w-[60%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              value={departmentName}
              onChange={handleDepartmentNameChange}
              placeholder="Semester Name"
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <button className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]">
              Add Semester
            </button>
          </div>
        </div>
        {/* <div className="h-[7vh] md:h-[10vh] w-full bg-blue-200"></div> */}
        {/* <div className="h-fit py-1 md:mt-2 my-1 w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <button className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]">
            Add Department
          </button>
        </div> */}
      </div>
    </>
  );
}
