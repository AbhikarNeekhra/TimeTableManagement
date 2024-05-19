"use client";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "@/app/(Components)/toast/toast";
import { useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Select from "react-select";

const TimeTable = () => {
  const [data, setData] = useState([]);
  const [sessioninfo, setSession] = useState([]);
  const [branch, setBranch] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [subject, setSubject] = useState([]);
  const [room, setRoom] = useState([]);
  const [timeslot, setTimeSlot] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Selection, setSelection] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [rows, setRows] = useState(null);
  const [isValid, setIsValid] = useState(false);

  //INPUT
  const [sessionInput, setSessionInput] = useState(null);
  const [branchInput, setBranchInput] = useState(null);
  const [subjectInput, setSubjectInput] = useState(null);
  const [facultyInput, setFacultyInput] = useState(null);
  const [timeSlotInput, setTimeSlotInput] = useState(null);
  const [roomInput, setRoomInput] = useState(null);
  // const handleSubmit = (data) => {
  //   // Handle form submission
  //   console.log(data);
  // };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.allotment);
        setSession(response.data.session);
        setBranch(response.data.branch);
        setFaculty(response.data.faculty);
        setSubject(response.data.subject);
        setTimeSlot(response.data.timeslot);
        setRoom(response.data.room);
        setLoading(false);
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
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
        setToastMessage("Record deleted successfully");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "session_name",
        header: "Session",
        size: 200,
      },
      {
        accessorKey: "allotment_id",
        header: "Allotment ID",
        size: 200,
      },
      {
        accessorKey: "branch_id",
        header: "Branch",
        size: 150,
      },
      {
        accessorKey: "subject_id",
        header: "Subject",
        size: 200,
      },
      {
        accessorKey: "faculty_email",
        header: "Faculty Email",
        size: 150,
      },
      {
        accessorKey: "room_name",
        header: "Room",
        size: 150,
      },
      {
        accessorKey: "day",
        header: "Day",
        size: 150,
      },
      {
        accessorKey: "slot_start_time",
        header: "Start Time",
        size: 150,
      },
      {
        accessorKey: "slot_end_time",
        header: "End Time",
        size: 150,
      },
      {
        accessorKey: "edit",
        header: "",
        size: 50,
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
        size: 50,
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
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [utype, setUtype] = useState("User");

  useEffect(() => {
    if (rows) {
      console.log("Rows detected successfully: ", rows);
      setUtype(rows.original.type);
      reset({
        session_id: rows.original.session_id,
        allotment_id: rows.original.allotment_id,
        room_id: rows.original.room_id,
        subject_id: rows.original.subject_id,
        faculty_email: rows.original.faculty_email,
        branch_id: rows.original.branch_id,
        day: rows.original.day,
        slot_start_time: rows.original.slot_start_time,
        slot_end_time: rows.original.slot_end_time,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    if (rows) {
      try {
        const response = await axios.put("/api/database/allotment", data);
        console.log("put request: ", response.data);
        if (response.data.message === "success") {
          setToastMessage("Record edited successfully");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
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
        const response = await axios.post("/api/database/allotment", data);
        console.log("post request: ", response.data);
        console.log("Data: ", data);
        if (response.data.message === "success") {
          setToastMessage("Record added successfully");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
        } else {
          setToastMessage("Something went wrong!! Please try again.");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
        }

        getData();
      } catch (error) {
        setToastMessage("Something went wrong!! Please try again.");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        console.error(error);
      }
    }
  };

  // useEffect(() => {
  //   // If there is data, the form is valid
  //   setIsValid(data ? true : false);
  // }, [data]);

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}

      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
          Allotment:
        </h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-7 w-64 gap-2">
              <label>Session:</label>
              <Select
                required
                isSearchable
                className="rounded-md border-2 m-2 w-64"
                value={sessionInput}
                onChange={(selectedOption) => setSessionInput(selectedOption)}
                options={sessioninfo.map((SessionID) => ({
                  value: SessionID.session_id,
                  label: `${SessionID.session_id} ${SessionID.session_name}`,
                }))}
              />

              <label>Branch ID:</label>
              <Select
                required
                className="rounded-md border-2 m-2"
                value={branchInput}
                onChange={(selectedOption) => setBranchInput(selectedOption)}
                options={branch.map((branchID) => ({
                  value: branchID.branch_id,
                  label: `${branchID.branch_id}`,
                }))}
              />

              <label>Subject ID:</label>
              <Select
                required
                className="rounded-md border-2 m-2 w-96"
                value={subjectInput}
                onChange={(selectedOption) => setSubjectInput(selectedOption)}
                options={subject.map((SubjectSelect) => ({
                  value: SubjectSelect.subject_id,
                  label: `${SubjectSelect.subject_code} ${SubjectSelect.subject_name} (${SubjectSelect.subject_type}) (${SubjectSelect.subject_orientation})`,
                }))}
              />

              <label>Faculty:</label>
              <Select
                required
                className="rounded-md border-2 m-2 w-96"
                value={facultyInput}
                onChange={(selectedOption) => setFacultyInput(selectedOption)}
                options={faculty.map((facultyMember) => ({
                  value: facultyMember.faculty_email,
                  label: `${facultyMember.faculty_name} (${facultyMember.faculty_email})`,
                }))}
              />

              <label>Day Time Slot:</label>
              <Select
                required
                className="rounded-md border-2 m-2 w-72"
                value={timeSlotInput}
                onChange={(selectedOption) => setTimeSlotInput(selectedOption)}
                options={timeslot.map((DayTimeSlot) => ({
                  value: DayTimeSlot.slot_id,
                  label: `${DayTimeSlot.slot_start_time} - ${DayTimeSlot.slot_end_time} ${DayTimeSlot.day}`,
                }))}
              />

              <label>Room ID:</label>
              <Select
                required
                className="rounded-md border-2 m-2"
                value={roomInput}
                onChange={(selectedOption) => setRoomInput(selectedOption)}
                options={room.map((RoomIDS) => ({
                  value: RoomIDS.room_id,
                  label: `${RoomIDS.room_name}`,
                }))}
              />

              <button
                type="submit"
                className="flex w-20 bg-indigo-500 text-white py-2 px-4 rounded-md mx-5 mb-2 hover:bg-indigo-600 justify-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div style={{ width: "95%" }} className="ml-3">
          <MaterialReactTable table={table} style={{ width: "100%" }} />
        </div>
        <div></div>
      </>
    </>
  );
};

export default TimeTable;
