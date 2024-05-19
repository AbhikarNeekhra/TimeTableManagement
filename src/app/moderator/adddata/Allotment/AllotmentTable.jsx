"use client";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "@/app/(Components)/toast/toast";
import { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { useMaterialReactTable } from "material-react-table";
import Select from "react-select";
import BranchTableFinal from "../../../(Components)/finaltable/FinalTable";

export default function AllotmentTable() {
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

  return (
    <>
      <BranchTableFinal
        branchwiseprop={{
          session: sessionInput,
          branch: branchInput,
          semester: semesterInput,
        }}
      />
      <div style={{ width: "95%" }}></div>
      <div className="w-full px-3">
        <MaterialReactTable table={table} style={{ width: "100%" }} />
      </div>
    </>
  );
}
