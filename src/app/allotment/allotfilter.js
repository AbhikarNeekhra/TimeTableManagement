"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import axios from "axios";
import down from "../../../public/arrow-down-icon-png-6696.png";
import Myselect from "../(Components)/Filter/mySelect/myselect";
import Toast from "../(Components)/toast/toast";
import FinalTable from "../finalTable/page";

export default function AllotFilter() {
  const [cont, setCont] = useState(true);
  const [SessionId, setSessionId2] = useState("Session ID");
  const [Semester, setSemester2] = useState("Semester");
  const [Branch, setBranch2] = useState("Branch");
  const [SubjectId, setSubjectId2] = useState("Subject ID");
  const [Timeslot, setTimslot2] = useState("Day Time Slot");
  const [Faculty, setFaculty2] = useState("Faculty");
  const [RoomId, setRoomId2] = useState("Room ID");

  // Functions ends here -----------------

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCheck, setDataCheck] = useState([]);
  const [sessioninfo, setSession] = useState([]);
  const [branch, setBranch] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [subject, setSubject] = useState([]);
  const [timeslot, setTimeSlot] = useState([]);
  const [ElectiveCourse, setElectiveCourse] = useState([]);
  const [room, setRoom] = useState([]);
  const [other_session, setOtherSession] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [rows, setRows] = useState(null);
  const [sessionInput, setSessionInput] = useState(null);
  const [branchInput, setBranchInput] = useState(null);
  const [subjectInput, setSubjectInput] = useState(" ");
  const [facultyInput, setFacultyInput] = useState(null);
  const [timeSlotInput, setTimeSlotInput] = useState(null);
  const [semesterInput, setSemesterInput] = useState(null);
  const [departmentInput, setDepartmentInput] = useState(null);
  const [roomInput, setRoomInput] = useState(null);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [filteredSlot, setFilteredSlot] = useState([]);
  const [semester, setSemester] = useState([]);
  const [filteredSubject, setFilteredSubject] = useState([]);
  const [showFacultyAllocation, setShowFacultyAllocation] = useState(false);
  const [department, setDepartment] = useState([]);
  const [electivesubjectlist, setelectivesubjectlist] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.allotment);
        setDataCheck(response.data.allotment);
        setSession(response.data.session);
        setBranch(response.data.branch);
        setFaculty(response.data.faculty);
        setSubject(response.data.subject);
        setTimeSlot(response.data.timeslot);
        setRoom(response.data.room);
        setSemester(response.data.semester);
        setOtherSession(response.data.other_session);
        setDepartment(response.data.department);
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

  function subtractSets(setA, setB) {
    let resultSet = new Set(setA);
    for (let elem of setB) {
      resultSet.delete(elem);
    }
    return resultSet;
  }

  const subjectfilter = async () => {
    // console.log(sessionInput);
    const filteredSubjectsforsession = subject.filter(
      (item) => item.session_id == sessionInput.value
    );
    const filteredSubjectsforbranch = filteredSubjectsforsession.filter(
      (item) => item.branch_id == branchInput.value
    );
    const filteredSubjects = filteredSubjectsforbranch.filter(
      (item) => item.semester_id == semesterInput.value
    );
    // console.log(filteredSubjects);
    setFilteredSubject(filteredSubjects);
  };

  const electivesubjects = () => {
    console.log("Department Input: ", departmentInput.value);
    const filteredSubjectsforsession = subject.filter(
      (item) => item.session_id == sessionInput.value
    );
    const filteredSubjectsforDepartment = filteredSubjectsforsession.filter(
      (item) => item.department_id == departmentInput.value
    );
    const nonregularsubjects = filteredSubjectsforDepartment.filter(
      (item) => item.subject_orientation !== "REGULAR"
    );
    console.log("filteredSubjectDepartment: ", filteredSubjectsforDepartment);
    setelectivesubjectlist(nonregularsubjects);
  };

  const handleElectiveAllocation = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        session_id: sessionInput.value,
        department_id: departmentInput.value,
        subject_id: subjectInput.value.subject_id,
        faculty_email: facultyInput.value.email,
        room_id: roomInput.value,
      });
      const response = await axios.post("/api/database/electivecourse", data);
      console.log("post request: ", response.data);
      if (response.data.message === "success") {
        setToastMessage("Record added successfully");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        getData();
      }

      console.log("Data: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const NonClashOptionsBranch = async () => {
    try {
      let alltimeslot = new Set();
      let timeslotClash = new Set();
      // console.log("Response Check:: ", dataCheck);
      // console.log(branchInput)
      // console.log(branchInput)
      console.log("SUBJECT INPUT::", subjectInput);
      timeslot.forEach((item) => {
        alltimeslot.add(item.slot_id);
        dataCheck.forEach((item2) => {
          if (
            branchInput.value == item2.branch_id &&
            item.slot_id == item2.slot_id &&
            sessionInput.value == item2.session_id &&
            semesterInput.value == item2.semester_id &&
            subjectInput.value.subject_type == "THEORY"
          ) {
            timeslotClash.add(item.slot_id);
          }
        });
      });
      console.log("timeslotclash::", timeslotClash);

      let availableSlot = subtractSets(alltimeslot, timeslotClash);
      const FilteredTimeSlot1 = timeslot.filter((slot) =>
        availableSlot.has(slot.slot_id)
      );

      const FilteredTimeSlot = FilteredTimeSlot1.sort((slot1, slot2) => {
        // Assuming slot.day is the property representing the day
        if (slot1.day < slot2.day) {
          return -1;
        }
        if (slot1.day > slot2.day) {
          return 1;
        }
        return 0;
      });

      setFilteredSlot(FilteredTimeSlot);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const NonClashOptionsSlot = async () => {
    try {
      let allfaculty = new Set();
      let allRooms = new Set();
      let facultyclash = new Set();
      let roomClash = new Set();

      // console.log("Response Check:: ", dataCheck);
      // console.log(branchInput)
      faculty.forEach((item) => {
        allfaculty.add(item.faculty_email);
        dataCheck.forEach((item2) => {
          if (
            timeSlotInput.value === item2.slot_id &&
            item.faculty_email == item2.faculty_email &&
            sessionInput.value == item2.session_id
          ) {
            facultyclash.add(item.faculty_email);
          }
        });
      });

      room.forEach((item) => {
        allRooms.add(item.room_id);
        dataCheck.forEach((item2) => {
          if (
            timeSlotInput.value === item2.slot_id &&
            item.room_id == item2.room_id &&
            sessionInput.value == item2.session_id
          ) {
            roomClash.add(item.room_id);
          }
        });
      });

      // console.log("Faculty Clashes: ", facultyclash)
      let availableFaculty = subtractSets(allfaculty, facultyclash);
      let availableRoom = subtractSets(allRooms, roomClash);
      // console.log("Faculty Available: ",availableFaculty)
      // console.log("Branch Available: ",availableBranch)
      // console.log("Room Available: ",availableRoom)
      const filteredFaculty = faculty.filter((facultyMember) =>
        availableFaculty.has(facultyMember.faculty_email)
      );
      const filteredRoom = room.filter((RoomIDS) =>
        availableRoom.has(RoomIDS.room_id)
      );

      setFilteredRoom(filteredRoom);
      setFilteredFaculty(filteredFaculty);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleOtherSessionSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        faculty_name: e.target[0].value,
        slot_id: timeSlotInput.value,
        session_id: sessionInput.value,
        branch_id: branchInput.value,
        semester_id: semesterInput.value,
        subject_id: null,
        subject_code: null,
        room_id: null,
        faculty_email: null,
      });
      const response = await axios.post("/api/database/allotment", data);
      console.log("post request: ", response.data);
      if (response.data.message === "success") {
        setToastMessage("Record added successfully");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        getData();
      }

      console.log("Data: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Response Check:: ", dataCheck);

      let data = JSON.stringify({
        session_id: sessionInput.value,
        branch_id: branchInput.value,
        subject_id: subjectInput.value.subject_id,
        subject_code: subjectInput.value.subject_code,
        faculty_email: facultyInput.value.email,
        slot_id: timeSlotInput.value,
        room_id: roomInput.value,
        faculty_name: facultyInput.value.name,
        semester_id: semesterInput.value,
      });

      if (rows) {
        try {
          data = JSON.stringify({
            allotment_id: rows.original.allotment_id,
            session_id: sessionInput.value,
            branch_id: branchInput.value,
            subject_id: subjectInput.value.subject_id,
            subject_code: subjectInput.value.subject_code,
            faculty_email: facultyInput.value,
            slot_id: timeSlotInput.value,
            room_id: roomInput.value,
            faculty_name: facultyInput.value.name,
            semester_id: semesterInput.value,
          });
          const response = await axios.put("/api/database/allotment", data);
          console.log("PUT Data", data);
          console.log("put request: ", response.data);
          if (response.data.message === "success") {
            setToastMessage("Record edited successfully");
            setTimeout(() => {
              setToastMessage("");
            }, 3000);
            getData();
            // NonClashOptionsBranch();
          } else {
            setToastMessage("Something went wrong!! Please try again.");
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
          console.log("POST BRANCH INPUT:: ", branchInput.value);
          const response = await axios.post("/api/database/allotment", data);
          console.log("post request: ", response.data);
          console.log("POST Data: ", data);
          // console.log("faculty_name: ", data.faculty_name)
          if (response.data.message === "success") {
            setToastMessage("Record added successfully");
            setTimeout(() => {
              setToastMessage("");
            }, 3000);
            // console.log("BranchInput: ", branchInput)
            setTimeSlotInput(null);
            setFacultyInput(null);
            setRoomInput(null);
            setSubjectInput(null);
            // handleBranchOnChange(branchInput);
            // setSessionInput(sessionInput);
            // setBranchInput(branchInput);
            getData();
            // console.log("BranchInput: ", branchInput)
          } else {
            setToastMessage("Something went wrong!! Please try again.");
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editRecord = (row) => {
    setRows(row);
    console.log(row);
  };

  const deleteRecord = (row) => {
    console.log("Row: ", row);
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
      allotment_id: row.original.allotment_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/allotment",
      data: data,
    };
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
          setBranchInput(branchInput);
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
        accessorKey: "allotment_id",
        header: "Allotment ID",
      },
      {
        accessorKey: "semester_name",
        header: "Semester",
      },
      {
        accessorKey: "branch_id",
        header: "Branch",
      },

      {
        accessorKey: "subject_code",
        header: "Subject Code",
      },

      {
        accessorKey: "faculty_name",
        header: "Faculty Name",
      },
      {
        accessorKey: "room_name",
        header: "Room",
        size: 40,
      },
      {
        accessorKey: "day",
        header: "Day",
        size: 40,
      },
      {
        accessorKey: "slot_start_time",
        header: "Start Time",
        size: 40,
      },
      {
        accessorKey: "slot_end_time",
        header: "End Time",
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

  useEffect(() => {
    const fetchData = async () => {
      // console.log(branchInput)
      if (
        sessionInput !== null &&
        branchInput !== null &&
        semesterInput !== null
      ) {
        await subjectfilter();
      }
    };
    fetchData();
  }, [branchInput]);

  useEffect(() => {
    console.log(subjectInput);
    const fetchData = async () => {
      console.log(subjectInput);
      if (
        sessionInput !== null &&
        subjectInput !== null &&
        branchInput !== null &&
        semesterInput !== null
      ) {
        await NonClashOptionsBranch();
      }
    };
    fetchData();
  }, [branchInput]);

  useEffect(() => {
    const fetchData = async () => {
      await NonClashOptionsBranch();
    };
    if (subjectInput !== null) {
      fetchData();
    }
  }, [subjectInput]);
  useEffect(() => {
    const fetchData = async () => {
      await NonClashOptionsSlot();
    };
    if (timeSlotInput !== null) {
      fetchData();
    }
  }, [timeSlotInput]);
  useEffect(() => {
    const fetchData = async () => {
      await electivesubjects();
    };
    if (departmentInput !== null) {
      fetchData();
    }
  }, [departmentInput]);

  const toggleFacultyAllocation = () => {
    setShowFacultyAllocation(!showFacultyAllocation);
  };

  // Functions ends here -----------------

  const FilterContent = () => {
    return (
      <>
        <div className="h-fit px-2 py-3 w-[94%] sm:w-[75%] md:w-[60%] lg:[56%] xl:w-[53%] rounded-2xl transition-all ease-in-out delay-100 shadow-AbhiShad mx-auto bg-gradient-to-r from-[#FE886A] to-[#FF4B77] grid place-items-center">
          <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
            <div className="h-[7vh] my-1 w-full lg:w-[35%] grid place-items-center px-3">
              <Myselect
                list={filteredSession.map(
                  (SessionID) =>
                    SessionID.session_id + " " + SessionID.session_name
                )}
                selected={SessionId}
                setSelected={setSessionId2}
                defaultVal={SessionId}
              />
            </div>
            <div className="h-[7vh] my-1 w-full lg:w-[68%] grid place-items-center px-3">
              <Myselect
                list={branch.map(
                  (branchIDS) =>
                    branchIDS.branch_id + " " + branchIDS.branch_name
                )}
                selected={Branch}
                setSelected={setBranch2}
                defaultVal={Branch}
              />
            </div>
          </div>
          <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
            <div className="h-[7vh] my-1 w-full lg:w-[22%] grid place-items-center px-3">
              <Myselect
                list={semester.map(
                  (SemesterSelect) => SemesterSelect.semester_name
                )}
                selected={Semester}
                setSelected={setSemester2}
                defaultVal={Semester}
              />
            </div>
            <div className="h-[7vh] my-1 w-full lg:w-[59%] grid place-items-center px-3">
              <Myselect
                list={timeslot.map(
                  (DayTimeSlot) =>
                    DayTimeSlot.slot_start_time +
                    "-" +
                    DayTimeSlot.slot_end_time +
                    " " +
                    DayTimeSlot.day
                )}
                selected={Timeslot}
                setSelected={setTimslot2}
                defaultVal={Timeslot}
              />
            </div>
            <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
              <Myselect
                list={room.map((RoomIDS) => RoomIDS.room_name)}
                selected={RoomId}
                setSelected={setRoomId2}
                defaultVal={RoomId}
              />
            </div>
          </div>
          <div className="h-fit w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
            <div className="h-[7vh] my-1 w-full lg:w-[30%] grid place-items-center px-3">
              <Myselect
                list={electivesubjectlist.map(
                  (SubjectSelect) =>
                    SubjectSelect.subject_code +
                    " " +
                    SubjectSelect.subject_name +
                    " " +
                    SubjectSelect.subject_orientation
                )}
                selected={SubjectId}
                setSelected={setSubjectId2}
                defaultVal={SubjectId}
              />
            </div>
            <div className="h-[7vh] my-1 w-full lg:w-[48%] grid place-items-center px-3">
              <Myselect
                list={faculty.map(
                  (facultyMember) => facultyMember.faculty_name
                )}
                selected={Faculty}
                setSelected={setFaculty2}
                defaultVal={Faculty}
              />
            </div>
          </div>
          {/* <div className="h-[7vh] md:h-[10vh] w-full bg-blue-200"></div> */}
          <div className="h-fit py-1 md:mt-2 my-1 w-full lg:flex lg:justify-center lg:items-center grid place-items-center">
            <button className="px-5 py-2 text-xl md:my-0 my-1 active:text-white mx-auto font-semibold shadow-myShad2 active:shadow-myShad rounded-lg hover:bg-red-400 active:bg-red-600 bg-[#FE886A]">
              Submit
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={`${
          cont
            ? "h-fit py-1 px-2"
            : "h-fit py-1 px-2 bg-gradient-to-r from-[#FE886A] to-[#FF4B77]"
        } w-full transition-all ease-in-out delay-100 py-2`}
      >
        {cont ? (
          <FilterContent />
        ) : (
          <div className="text-xl font-bold text-center">
            Drag Down to Apply Filters
          </div>
        )}
      </div>
      <div className="h-12 w-full mb-5 transition-all ease-in-out delay-100">
        <div className="h-7 w-fit px-12 bg-green-300 text-center rounded-b-full text-lg mx-auto">
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
      <FinalTable />
    </>
  );
}
