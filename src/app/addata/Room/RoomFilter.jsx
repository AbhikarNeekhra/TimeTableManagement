import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import upload from "../../../../public/upload.png";
import Myselect from "../../(Components)/Filter/mySelect/myselect";
import Toast from "../../(Components)/toast/toast";

export default function RoomFilter() {
  // const option3 = [
  //   "ALL",
  //   "CAI",
  //   "CAI2",
  //   "CAI3",
  //   "CSE",
  //   "MAC",
  //   "ECE",
  //   "IOT",
  //   "IT",
  // ];

  const [DepartmentList, setDepartmentList] = useState();

  const [data, setData] = useState();
  const [department, setDepartment] = useState([]);
  const [Departmentsel, setDepartmentsel] = useState("Department");
  const [RoomName, setRoomName] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [RoomCapacity, setRoomCapacity] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.room);
        setDepartment(response.data.department);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const department_ids = department.map(
    (department) => department.department_id
  );

  const handleAddRoom = async () => {
    try {
      const response = await axios.post("/api/database/room", {
        room_name: RoomName,
        room_type: RoomType,
        room_capacity: RoomCapacity,
        department_id: Departmentsel,
      });
      setToastMessage("Record added successfully!");
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
      getData();
      console.log(response.data);
      // Optionally, you can show a success message or handle other UI updates here
    } catch (error) {
      console.error("Error adding room:", error);
      // Handle error or show error message
    }
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <div className="h-fit px-2 py-3 w-[94%] sm:w-[75%] md:w-[60%] lg:[53%] xl:w-[50%] rounded-2xl transition-all ease-in-out delay-100 shadow-AbhiShad mx-auto bg-gradient-to-r from-[#FE886A] to-[#FF4B77] grid place-items-center">
        <div className="h-fit w-full text-center text-4xl text-white font-bold mb-2">
          Room
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
          <div className="h-[7vh] my-1 w-full lg:w-[53%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Room Name"
              value={RoomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[41%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Room Type"
              value={RoomType}
              onChange={(e) => setRoomType(e.target.value)}
            />
          </div>
        </div>
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-1 w-full lg:w-[26.3%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Room Capacity"
              value={RoomCapacity}
              onChange={(e) => setRoomCapacity(e.target.value)}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <Myselect
              list={department_ids.map((departmentIdS) => departmentIdS)}
              selected={Departmentsel}
              setSelected={setDepartmentsel}
              defaultVal={"Department"}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[25%] grid place-items-center px-3">
            <button
              onClick={handleAddRoom}
              className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
            >
              Add Room
            </button>
          </div>
        </div>
        {/* <div className="h-fit py-1 md:mt-2 my-1 w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <button className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]">
            Add Session
          </button>
        </div> */}
      </div>
    </>
  );
}
