import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import upload from "../../../../../public/upload.png";
import Myselect from "../../../(Components)/Filter/mySelect/myselect";
import Toast from "../../../(Components)/toast/toast";
import axios from "axios";

export default function SubjectFilter() {
  // const option1 = [
  //   "JAN-JUN 2024",
  //   "JUL-DEC 2024",
  //   "JUL-DEC 2023",
  //   "JUL-DEC 2025",
  // ];
  // const option2 = [
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
  const SubjectTypeList = ["Theory", "Practical"];
  const option4 = ["Regular", "NEC", "OC", "4", "5", "6"];
  // const option5 = [
  //   "AIDS",
  //   "AIML",
  //   "AIR",
  //   "AIRR3",
  //   "CSE",
  //   "CSE-1",
  //   "CSE-2",
  //   "CSE-3",
  //   "ME",
  // ];
  // const option6 = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  // const [selected1, setSelected1] = useState("Session ID");
  // const [selected2, setSelected2] = useState("Department ID");
  // const [selected4, setSelected4] = useState("Subject Orientation");
  // const [selected5, setSelected5] = useState("Branch ID");
  // const [selected6, setSelected6] = useState("Semester");
  // const [SubjectName, setSubjectName] = useState("");
  // const [Batch, setBatch] = useState("");
  // const [SubjectCode, setSubjectCode] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  //
  // const [option1, setOption1] = useState([]);
  // const [option2, setOption2] = useState([]);
  // const [option3, setOption3] = useState([]);
  // const [option4, setOption4] = useState([]);
  // const [option5, setOption5] = useState([]);
  // const [option6, setOption6] = useState([]);
  const [SessionId, setSessionId] = useState("Session ID");
  const [DepartmentId, setDepartmentId] = useState("Department ID");
  const [SubjectId, setSubjectId] = useState("Subject Type");
  const [SubjectOrientation, setSubjectOrientation] = useState(
    "Subject Orientation"
  );
  const [BranchId, setBranchId] = useState("Branch ID");
  const [Semesterr, setSemesterr] = useState("Semester");
  const [SubjectName, setSubjectName] = useState("");
  const [Batch, setBatch] = useState("");
  const [SubjectCode, setSubjectCode] = useState("");
  const [SubjectType, setSubjectType] = useState("Subject Type");
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [branch, setBranch] = useState([]);
  const [semester, setSemester] = useState([]);
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.subject);
        setSession(response.data.session);
        setDepartment(response.data.department);
        setBranch(response.data.branch);
        setSemester(response.data.semester);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editRecord = (row) => {
    setRows(row);
    // Set the inner HTML of an element with id "editmode"
    document.getElementById("editmode").innerHTML = "*Enter edit inputs";

    // Create a button element
    const element = document.createElement("button");

    // Append the button to a container element (replace "containerId" with the actual id of the container)
    if (document.getElementById("addrecord").childElementCount == 0) {
      element.innerHTML = "Add New Record"; // Set button text
      element.className = "m-2 bg-blue-500 rounded-full p-2 text-white"; // Set class name
      document.getElementById("addrecord").appendChild(element);
    }

    document.querySelector('select[name="session_id"]').value =
      row.original.session_id;
    document.querySelector('input[name="subject_name"]').value =
      row.original.subject_name;
    document.querySelector('select[name="department_id"]').value =
      row.original.department_id;
    document.querySelector('select[name="subject_type"]').value =
      row.original.subject_type;
    document.querySelector('select[name="subject_orientation"]').value =
      row.original.subject_orientation;
    document.querySelector('select[name="branch_id"]').value =
      row.original.branch_id;
    document.querySelector('select[name="semester_id"]').value =
      row.original.semester_id;
    document.querySelector('input[name="batch"]').value = row.original.batch;
    document.querySelector('input[name="subject_code"]').value =
      row.original.subject_code;

    console.log(row);
  };
  const addrecord = () => {
    setRows(null);
    // reset();
    document.getElementById("editmode").innerHTML = "";
    document.getElementById("addrecord").innerHTML = "";
  };

  const deleteRecord = (row) => {
    console.log("Row: ", row);
    // console.log("day: ",row.original.day)
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteRow(row),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteRow = (row) => {
    let data = JSON.stringify({
      subject_id: row.original.subject_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/subject",
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log("Response: ", response);
        if (response.data.message == "success") {
          setToastMessage("Record deleted successfully");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "session_name",
        header: "Session ID",
        size: 20,
      },
      {
        accessorKey: "subject_id",
        header: "Subject ID",
        size: 20,
      },
      {
        accessorKey: "subject_name",
        header: "Subject Name",
        size: 20,
      },
      {
        accessorKey: "department_id",
        header: "Department ID",
        size: 20,
      },
      {
        accessorKey: "subject_type",
        header: "Subject Type",
        size: 20,
      },
      {
        accessorKey: "subject_code",
        header: "Subject Code",
        size: 20,
      },
      {
        accessorKey: "branch_id",
        header: "Branch ID",
        size: 20,
      },

      {
        accessorKey: "semester_name",
        header: "Semester",
      },
      {
        accessorKey: "batch",
        header: "Batch",
        size: 20,
      },

      {
        accessorKey: "subject_orientation",
        header: "Subject Orientation",
        size: 20,
      },
      {
        accessorKey: "edit",
        header: "",
        size: 20,
        Cell: ({ row }) => (
          <div className="flex">
            <button
              className="text-white font-bold bg-blue-700 px-2 rounded-md"
              onClick={() => editRecord(row)}
            >
              Edit
            </button>
          </div>
        ),
      },
      // Delete icon column
      {
        accessorKey: "delete",
        header: "",
        size: 20,
        Cell: ({ row }) => (
          <button
            className="text-white font-bold bg-red-700 px-2 rounded-lg"
            onClick={() => deleteRecord(row)}
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const onSubmit = async (data) => {
    console.log(data);
    if (rows) {
      // console.log(rows);
      try {
        let newdata = JSON.stringify({
          subject_id: rows.original.subject_id,
          session_id: document.querySelector('select[name="session_id"]').value,
          subject_name: document.querySelector('input[name="subject_name"]')
            .value,
          department_id: document.querySelector('select[name="department_id"]')
            .value,
          subject_type: document.querySelector('select[name="subject_type"]')
            .value,
          subject_orientation: document.querySelector(
            'select[name="subject_orientation"]'
          ).value,
          branch_id: document.querySelector('select[name="branch_id"]').value,
          semester_id: document.querySelector('select[name="semester_id"]')
            .value,
          batch: document.querySelector('input[name="batch"]').value,
          subject_code: document.querySelector('input[name="subject_code"]')
            .value,
        });
        // console.log(newdata)

        const response = await axios.put("/api/database/subject", newdata);
        console.log(response.data);
        if (response.data.message == "success") {
          getData();
          setToastMessage("Record edited successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
        }
      } catch (error) {
        setToastMessage("Something went wrong!! Please try again.");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        console.error(error);
      }
    } else {
      try {
        console.log(data);
        const response = await axios.post("/api/database/subject", {
          subject_id: SubjectId,
          session_id: 2,
          subject_name: SubjectName,
          department_id: DepartmentId,
          subject_type: SubjectType,
          subject_orientation: SubjectOrientation,
          branch_id: BranchId,
          semester_id: Semesterr,
          batch: Batch,
          subject_code: SubjectCode,
        });
        console.log(response.data);
        if (response.data.message == "success") {
          setToastMessage("Record added successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
        }
      } catch (error) {
        setToastMessage("Something went wrong!! Please try again.");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        console.error(error);
      }
    }
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

  // CSV Upload handling
  const subjectFields = [
    "session_id",
    "subject_name",
    "department_id",
    "subject_type",
    "subject_orientation",
    "branch_id",
    "semester_id",
    "batch",
    "subject_code",
  ];

  const sessionApiUrl = "/api/database/subject"; //where to post data
  //callback after Upload CSV action is performed
  const handleButtonClick = (message) => {
    console.log(message);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
    getData();
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <div className="h-fit px-2 py-3 w-[94%] sm:w-[75%] md:w-[60%] lg:[53%] xl:w-[50%] rounded-2xl transition-all ease-in-out delay-100 shadow-AbhiShad mx-auto bg-gradient-to-r from-[#FE886A] to-[#FF4B77] grid place-items-center">
        <div className="h-fit w-full text-center text-4xl text-white font-bold mb-2">
          Subject
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
          <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <Myselect
              list={session.map((SessionIDS) => SessionIDS.session_name)}
              selected={SessionId}
              setSelected={setSessionId}
              defaultVal={"Session ID"}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[58%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Subject Name"
              value={SubjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
        </div>
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <Myselect
              list={department.map(
                (departmentIdS) => departmentIdS.department_id
              )}
              selected={DepartmentId}
              setSelected={setDepartmentId}
              defaultVal={"Department ID"}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
            <Myselect
              list={SubjectTypeList}
              selected={SubjectType}
              setSelected={setSubjectType}
              defaultVal={"Subject Type"}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[38%] grid place-items-center px-3">
            <Myselect
              list={option4}
              selected={SubjectOrientation}
              setSelected={setSubjectOrientation}
              defaultVal={"Subject Orientation"}
            />
          </div>
        </div>
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-1 w-full lg:w-[24%] grid place-items-center px-3">
            <Myselect
              list={branch.map((branchIdS) => branchIdS.branch_id)}
              selected={BranchId}
              setSelected={setBranchId}
              defaultVal={"Branch ID"}
            />
          </div>
          <div className="h-[7vh] my-1 w-full lg:w-[20%] grid place-items-center px-3">
            <Myselect
              list={semester.map((SemesterIDS) => SemesterIDS.semester_name)}
              selected={Semesterr}
              setSelected={setSemesterr}
              defaultVal={"Semester"}
            />
          </div>
          <div className="h-[7vh] my-2 w-full lg:w-[48%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Batch"
              value={Batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
        </div>
        <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
          <div className="h-[7vh] my-2 w-full lg:w-[38%] grid place-items-center px-3">
            <input
              className="h-full w-full shadow-myShad2 rounded-xl px-5 py-3 text-md lg:text-lg outline-none font-semibold text-gray-500"
              type="text"
              placeholder="Subject Code"
              value={SubjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
          <div className="h-[7vh] my-2 w-full lg:w-[28%] grid place-items-center px-3">
            <button
              onClick={onSubmit}
              className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]"
            >
              Add Subject
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
