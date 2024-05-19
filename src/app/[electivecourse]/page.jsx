"use client"

import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "@/app/(Components)/toast/toast";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { MaterialReactTable } from "material-react-table";
import { useMaterialReactTable } from "material-react-table";

const Elective = () => {

  const [sessioninfo, setSessionInfo] = useState([]);
  const [session, setSession] = useState([]);
  const [department, setDepartment] = useState([]);
  // const [subject, setSubject] = useState([]);
  // const [faculty, setFaculty] = useState([]);
  const [subject, setSubject] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [room, setRoom] = useState([]);
  // const [data, setData] = useState([]);
  const [data, setElectiveCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionInput, setSessionInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [facultyInput, setFacultyInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [filteredSubject, setFilteredSubject] = useState([]);
  const [filteredDepartment, setFilteredDepartment] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [finalSubject, setFinalSubject] = useState([]);
  const [rows, setRows] = useState(null);

  const [showFacultyAllocation, setShowFacultyAllocation] = useState(true);


  const [toastMessage, setToastMessage] = useState("");


  useEffect(() => {
    getData();
    filterdSubjectapi();


  }, []);

  useEffect(() => {
    if (departmentInput.value) {
      subjectfilter();
      // roomfilter();
    }
  }, [departmentInput]);

  useEffect(() => {
    if (subjectInput) {
      facultyfilter();
      roomfilter();

    }
  }, [subjectInput]);


  const filterdSubjectapi = () => {
    axios
      .get("/api/database/finalfilterelective")
      .then((response) => {
        setFinalSubject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };




  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setSessionInfo(response.data.session);
        setSession(response.data.session);
        setFaculty(response.data.faculty);
        setSessionInfo(response.data.session);
        setSession(response.data.session);
        setFaculty(response.data.faculty);
        setSubject(response.data.subject);
        setRoom(response.data.room);
        setRoom(response.data.room);
        setDepartment(response.data.department);
        setElectiveCourse(response.data.elective_course);

        setLoading(false);
        // console.log("Response: ", response);
        setElectiveCourse(response.data.elective_course);

        setLoading(false);
        // console.log("Response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredSession = sessioninfo.filter(
    (item) => item.active_session == 1
  );

  const subjectfilter = async () => {
    console.log("Department Input: ", departmentInput.value);
    const filteredSubjectsforsession = finalSubject.filter(
      (item) => item.session_id == sessionInput.value.session_id
    );
    const filteredSubjectsforDepartment = filteredSubjectsforsession.filter(
      (item) => item.department_id == departmentInput.value
    );
    const nonregularsubjects = filteredSubjectsforDepartment.filter(
      (item) => item.subject_orientation !== "REGULAR"
    );
    setFilteredSubject(nonregularsubjects);
  };

  const facultyfilter = async () => {
    const filteredFacultyEmails = new Set(faculty
      .filter(item => item.department_id === departmentInput.value)
      .map(item => item.faculty_email)
    );

    console.log("Filtered Faculty Emails: ", filteredFacultyEmails);

    const facultyWithOrientationEmails = new Set(data
      .filter(item => item.subject_orientation === subjectInput.value.subject_orientation)
      .map(item => item.faculty_email)
    );

    console.log("Faculty with Orientation Emails: ", facultyWithOrientationEmails);

    const availableFacultyEmails = [...filteredFacultyEmails].filter(email => !facultyWithOrientationEmails.has(email));

    console.log("Available Faculty Emails: ", availableFacultyEmails);

    const facultyMembers = faculty.filter(item => availableFacultyEmails.includes(item.faculty_email));

    console.log("Available Faculty Members: ", facultyMembers);

    setFilteredFaculty(facultyMembers);
  };


  const roomfilter = async () => {
    // Step 1: Filter rooms based on department input value
    const filteredRoom = room.filter(
      (item) => item.department_id == departmentInput.value
    );

    // Step 2: Extract room IDs from filtered rooms
    const filteredRoomIds = filteredRoom.map(item => item.room_id);

    // Step 3: Filter out elective rooms with the same subject orientation
    const electiveWithOrientation = new Set(data
      .filter(item => item.subject_orientation === subjectInput.value.subject_orientation)
      .map(item => item.room_id)
    );

    // Step 4: Find available rooms by removing elective rooms
    const availableRooms = filteredRoomIds.filter(roomId => !electiveWithOrientation.has(roomId));

    // Step 5: Filter rooms based on available room IDs
    const filteredRooms = filteredRoom.filter(item => availableRooms.includes(item.room_id));

    // Step 6: Set filtered rooms
    setFilteredRoom(filteredRooms);
  }

  // const handleElectiveAllocation = async (e) => {
  //   e.preventDefault();
  //   if (rows) {
  //     // console.log(rows);
  //     try {
  //       let newdata = JSON.stringify({
  //         session_id: sessionInput.value.session_id,
  //         department_id: departmentInput.value,
  //         subject_id: subjectInput.value.subject_id,
  //         faculty_email: facultyInput.value.email,
  //         room_id: roomInput.value.room_id,
  //         subject_code: subjectInput.value.subject_code,
  //         subject_name: subjectInput.value.subject_name,
  //         subject_orientation: subjectInput.value.subject_orientation,
  //         room_name: roomInput.value.room_name,
  //         faculty_name: facultyInput.value.faculty_name,
  //         session_name: sessionInput.value.session_name,
  //       });
  //       console.log("NewData::", newdata);

  //       const response = await axios.put("/api/database/electivecourse", newdata);
  //       console.log(response.data);
  //       if (response.data.message == "success") {
  //         getData();
  //         setToastMessage("Record edited successfully!");
  //         setTimeout(() => {
  //           setToastMessage("");
  //         }, 3000);
  //       }
  //     } catch (error) {
  //       setToastMessage("Something went wrong!! Please try again.");
  //       setTimeout(() => {
  //         setToastMessage("");
  //       }, 3000);
  //       console.error(error);
  //     }
  //   } else {
  //     try {
  //       let data = JSON.stringify({
  //         session_id: sessionInput.value.session_id,
  //         department_id: departmentInput.value,
  //         subject_id: subjectInput.value.subject_id,
  //         faculty_email: facultyInput.value.email,
  //         room_id: roomInput.value.room_id,
  //         subject_code: subjectInput.value.subject_code,
  //         subject_name: subjectInput.value.subject_name,
  //         subject_orientation: subjectInput.value.subject_orientation,
  //         room_name: roomInput.value.room_name,
  //         faculty_name: facultyInput.value.faculty_name,
  //         session_name: sessionInput.value.session_name,
  //       });
  //       const response = await axios.post("/api/database/electivecourse", data);
  //       console.log("post request: ", response.data);
  //       if (response.data.message === "success") {
  //         setToastMessage("Record added successfully");
  //         setTimeout(() => {
  //           setToastMessage("");
  //         }, 3000);
  //         getData();
  //       }

  //       console.log("Data: ", data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleElectiveAllocation = async (e) => {
    console.log("clicked on submit")
    console.log("rows: ", rows)
    e.preventDefault();
    try {
      const formData = {
        session_id: sessionInput.value.session_id,
        department_id: departmentInput.value,
        subject_id: subjectInput.value.subject_id,
        faculty_email: facultyInput.value.faculty_email,
        room_id: roomInput.value.room_id,
        subject_code: subjectInput.value.subject_code,
        // subject_name: subjectInput.value.subject_name,
        subject_name: subjectInput.value.subject_name,
        subject_orientation: subjectInput.value.subject_orientation,
        room_name: roomInput.value.room_name,
        faculty_name: facultyInput.value.faculty_name,
        session_name: sessionInput.value.session_name,
        elective_course_id: rows ? rows.original.elective_course_id : null,
      };

      if (!rows) {
        // Perform add operation
        console.log("post request: ", formData)
        const response = await axios.post("/api/database/electivecourse", formData);
        if (response.data.message === "success") {
          setToastMessage("Record added successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
        }
      } else {
        // Perform edit operation
        console.log("put request: ", formData)
        const response = await axios.put("/api/database/electivecourse", formData);
        if (response.data.message === "success") {
          setToastMessage("Record edited successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
        }
      }
    } catch (error) {
      setToastMessage("Something went wrong! Please try again.");
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
      console.error(error);
    }
  };



  const editRecord = (row) => {
    setRows(row);
    console.log("Row in edit mode: ", row.original);
    // Set the inner HTML of an element with id "editmode"
    document.getElementById("editmode").innerHTML = "*Enter edit inputs";

    // Create a button element
    const element = document.createElement("button");
    element.innerHTML = "Add New record";
    element.className =
      "flex w-50 bg-indigo-500 text-white py-2 px-4 rounded-md mx-5 mb-2 hover:bg-indigo-600 justify-center h-10 mt-8";
    // element.onclick = () => {
    //   handleElectiveAllocation();
    // };

    // Set the inner HTML of an element with id "addrecord"
    document.getElementById("addrecord").innerHTML = "";
    document.getElementById("addrecord").appendChild(element);

    setSessionInput({
      value: {
        session_id: row.original.session_id,
        session_name: row.original.session_name,
      },
      label: row.original.session_name,
    });

    setDepartmentInput({
      value: row.original.department_id,
      label: row.original.department_id,
    });

    // setSubjectInput({
    //   value: {
    //     subject_name: row.original.subject_name,
    //     subject_id: row.original.subject_id,
    //     subject_code: row.original.subject_code,
    //     subject_orientation: row.original.subject_orientation,
    //   },
    //   label: {
    //     subject_name: row.original.subject_name,
    //     subject_code: row.original.subject_code,
    //     subject_orientation: row.original.subject_orientation,
    //   },
    setSubjectInput({
      value: {
        subject_name: row.original.subject_name,
        subject_id: row.original.subject_id,
        subject_code: row.original.subject_code,
        subject_orientation: row.original.subject_orientation,
      },
      label: `${row.original.subject_code} ${row.original.subject_name} ${row.original.subject_orientation}`,
    });


    setFacultyInput({
      value: {
        faculty_name: row.original.faculty_name,
        faculty_email: row.original.faculty_email,
      },
      label: row.original.faculty_name,
    });

    setRoomInput({
      value: {
        room_id: row.original.room_id,
        room_name: row.original.room_name,
      },
      label: row.original.room_name,
    });

    console.log(row);
  };

  const deleteRecord = (row) => {
    console.log("Row: ", row);
    // console.log(row.original.elective_course_id)
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to delete this record?",
      buttons: [
        {
          // console.log(row.original.elective_course_id)
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
      elective_course_id: row.original.elective_course_id,

    });
    let config = {
      method: "delete",
      url: "/api/database/electivecourse",
      data: data,
    };
    // console.log("row ele id", row.original.elective_course_id)
    axios
      .request(config)
      .then((response) => {
        console.log("Response: ", response);
        if (response.data.message === "success") {
          setToastMessage("Record deleted successfully");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
          // setBranchInput(branchInput);
          setSessionInput(sessionInput);
        } else {
          setToastMessage("Something went wrong!! Please try again.");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "department_id",
        header: "Department",
      },
      {
        accessorKey: "subject_code",
        header: "Subject Code",
      },

      {
        accessorKey: "subject_name",
        header: "Subject Name",
      },

      {
        accessorKey: "subject_orientation",
        header: "Subject Orientation",
      },

      {
        accessorKey: "faculty_name",
        header: "Faculty Name",
      },
      {
        accessorKey: "faculty_email",
        header: "Faculty Email",
      },



      {
        accessorKey: "room_id",
        header: "Room ID",
      },
      {
        accessorKey: "room_name",
        header: "Room",
        size: 40,
      },
      {
        accessorKey: "session_name",
        header: "Session",
        size: 40,
      },
      {
        accessorKey: "edit",
        header: "",
        size: 40,
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
      {
        accessorKey: "delete",
        header: "",
        size: 40,
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

  const table = useMaterialReactTable({
    columns,
    data,
    defaultColumn: {
      minSize: 20, //allow columns to get smaller than default
      maxSize: 200, //allow columns to get larger than default
      size: 20, //make columns wider by default
    },
    // initialState: { density: 'compact' },
    initialState: { pagination: { pageSize: 25 }, density: "compact" },
  });

  const addrecord = () => {
    setRows(null);
    // reset();
    document.getElementById("editmode").innerHTML = "";
    document.getElementById("addrecord").innerHTML = "";
  };

  const toggleFacultyAllocation = () => {
    setShowFacultyAllocation(!showFacultyAllocation);
  };

  return (
    <div>
      {toastMessage && <Toast message={toastMessage} />}
      <button
        onClick={toggleFacultyAllocation}
        className=" bg-blue-600 p-2 m-2 px-4 rounded-full text-white"
      >
        {showFacultyAllocation
          ? "Hide"
          : "Elective Course Faculty and Room Allocation"}
      </button>
      {showFacultyAllocation && (
        <div>
          <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
            Elective Course Faculty and Room Allocation
          </h1>
          <form
            onSubmit={handleElectiveAllocation}
            className="flex flex-row flex-wrap"
          >
            <div
              className="m-1 font-bold text-red-500 ml-2 text-lg"
              id="editmode"
            ></div>
            <div>
              <label>Session:</label>
              <Select
                required
                isSearchable
                className="rounded-md border-2  w-96 z-50"
                // styles={{ "z-index": 25 }}
                value={sessionInput}
                onChange={(selectedOption) => {
                  setSessionInput(selectedOption);
                  setSubjectInput(null);
                }}
                options={filteredSession.map((SessionID) => ({
                  value: {
                    session_id: SessionID.session_id,
                    session_name: SessionID.session_name,
                  },
                  label: ` ${SessionID.session_name}`,
                }))}
              />
            </div>
            <div>
              <label>Department:</label>
              <Select
                required
                isSearchable
                className="rounded-md border-2  w-96 z-40"
                styles={{ "z-index": 18 }}
                value={departmentInput}
                onChange={(departmentInput) => {
                  setDepartmentInput(departmentInput);
                }}
                options={department.map((DepartmentIDS) => ({
                  value: DepartmentIDS.department_id,
                  label: `${DepartmentIDS.department_id} `,
                }))}
              />
            </div>
            <div>
              <label>Subject ID:</label>
              <Select
                className="rounded-md border-2 m-2 z-30 w-96"
                value={subjectInput}
                styles={{ "z-index": 11 }}
                onChange={(selectedOption) => {
                  setSubjectInput(selectedOption);
                  // handleSubjectOnChange(selectedOption);
                  // setTimeSlotInput(null);
                }}
                options={filteredSubject.map((SubjectSelect) => ({
                  value: {
                    subject_id: SubjectSelect.subject_id,
                    subject_code: SubjectSelect.subject_code,
                    // subject_type: SubjectSelect.subject_type,
                    subject_orientation: SubjectSelect.subject_orientation,
                    subject_name: SubjectSelect.subject_name,
                  },
                  label: `${SubjectSelect.subject_code} ${SubjectSelect.subject_name} ${SubjectSelect.subject_orientation}`,
                }))}
              />
            </div>

            <div>
              <label>Faculty:</label>
              <Select
                className="rounded-md border-2 m-2 w-96 z-20"
                styles={{ "z-index": 9 }}
                value={facultyInput}
                onChange={(selectedOption) =>
                  setFacultyInput(selectedOption)
                }
                options={filteredFaculty.map((facultyMember) => ({
                  value: {
                    faculty_email: facultyMember.faculty_email,
                    faculty_name: facultyMember.faculty_name,
                  },
                  label: `${facultyMember.faculty_name}`,
                }))}
              />
            </div>

            <div>
              <label>Room ID:</label>
              <Select
                className="rounded-md border-2 m-2 w-96 z-10"
                value={roomInput}
                styles={{ "z-index": 8 }}
                onChange={(selectedOption) =>
                  setRoomInput(selectedOption)
                }
                options={filteredRoom.map((RoomIDS) => ({
                  value: {
                    room_id: RoomIDS.room_id,
                    room_name: RoomIDS.room_name,
                  },
                  label: `${RoomIDS.room_name}`,
                }))}
              />
            </div>

            <button
              type="submit"
              className="flex w-20 bg-indigo-500 text-white py-2 px-4 rounded-md mx-5 mb-2 hover:bg-indigo-600 justify-center h-10 mt-8"
            >
              Submit
            </button>
          </form>
          <div id="addrecord" onClick={addrecord}></div>
        </div>
      )}

      <div style={{ width: "95%" }} className="ml-3">
        <MaterialReactTable table={table} style={{ width: "100%", "z-index": -1 }} />
      </div>


    </div>
  )
}

export default Elective