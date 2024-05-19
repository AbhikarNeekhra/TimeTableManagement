"use client";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "@/app/(Components)/toast/toast";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Select from "react-select";

const TimeTable = () => {
  const [data, setData] = useState([]);
  const [dataCheck, setDataCheck] = useState([]);
  const [sessioninfo, setSession] = useState([]);
  const [branch, setBranch] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [subject, setSubject] = useState([]);
  const [room, setRoom] = useState([]);
  const [timeslot, setTimeSlot] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [rows, setRows] = useState(null);
  const [sessionInput, setSessionInput] = useState(null);
  const [branchInput, setBranchInput] = useState(null);
  const [subjectInput, setSubjectInput] = useState(null);
  const [facultyInput, setFacultyInput] = useState(null);
  const [timeSlotInput, setTimeSlotInput] = useState(null);
  const [roomInput, setRoomInput] = useState(null);

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
        setLoading(false);
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Response Check:: ", dataCheck);
      // item represents each individual record or item in the allotment table.

      // check every entry in table that either faculty_email or slot_id is not equal to the input value
      const isFacultyAvailable = dataCheck.every(
        (item) =>
          item.faculty_email !== facultyInput.value ||
          item.slot_id !== timeSlotInput.value
      );

      // Check if the selected time slot is available for the selected room
      const isRoomAvailable = dataCheck.every(
        (item) =>
          item.room_id !== roomInput.value ||
          item.slot_id !== timeSlotInput.value
      );
      const isBranchAvailable = dataCheck.every(
        (item) =>
          item.branch_id !== branchInput.value ||
          item.slot_id !== timeSlotInput.value
      );

      if (!isFacultyAvailable) {
        setToastMessage("Selected faculty is already occupied at this time.");
        setTimeout(() => {
          setToastMessage("");
        }, 6000);
        getData();
        return;
      }
      if (!isRoomAvailable) {
        setToastMessage("Selected room is already occupied at this time.");
        setTimeout(() => {
          setToastMessage("");
        }, 6000);
        getData();
        return;
      }
      if (!isBranchAvailable) {
        setToastMessage("Selected branch is already occupied at this time.");
        setTimeout(() => {
          setToastMessage("");
        }, 6000);
        return;
      }

      let data = JSON.stringify({
        session_id: sessionInput.value,
        branch_id: branchInput.value,
        subject_id: subjectInput.value,
        faculty_email: facultyInput.value,
        slot_id: timeSlotInput.value,
        room_id: roomInput.value,
      });

      if (rows) {
        try {
          data = JSON.stringify({
            allotment_id: rows.original.allotment_id,
            session_id: sessionInput.value,
            branch_id: branchInput.value,
            subject_id: subjectInput.value,
            faculty_email: facultyInput.value,
            slot_id: timeSlotInput.value,
            room_id: roomInput.value,
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
          console.log("POST Data: ", data);
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


  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}

      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold ">
          Allotment:
        </h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row  flex-wrap">
              <div>
                <label>Session:</label>
                <Select
                  required
                  isSearchable
                  className="rounded-md border-2  w-96 z-30"
                  value={sessionInput}
                  onChange={(selectedOption) => setSessionInput(selectedOption)}
                  options={sessioninfo.map((SessionID) => ({
                    value: SessionID.session_id,
                    label: `${SessionID.session_id} ${SessionID.session_name}`,
                  }))}
                />
              </div>

              <div>
                <label>Day Time Slot:</label>
                <Select
                  required
                  className="rounded-md border-2 m-2 w-96 z-20"
                  value={timeSlotInput}
                  onChange={(selectedOption) =>
                    setTimeSlotInput(selectedOption)
                  }
                  options={timeslot.map((DayTimeSlot) => ({
                    value: DayTimeSlot.slot_id,
                    label: `${DayTimeSlot.slot_start_time} - ${DayTimeSlot.slot_end_time} ${DayTimeSlot.day}`,
                  }))}
                />
              </div>

              <div>
                <label>Branch ID:</label>
                <Select
                  required
                  className="rounded-md border-2 m-2 w-96 z-30"
                  value={branchInput}
                  onChange={selectedOption => setBranchInput(selectedOption)}
                  options={availableBranches.map(branchID => ({
                    value: branchID.branch_id,
                    label: `${branchID.branch_id}`,
                  }))}
                />
                </div>

                {/* <Select
                  required
                  className="rounded-md border-2 m-2 w-96 z-30"
                  value={branchInput}
                  onChange={(selectedOption) => setBranchInput(selectedOption)}
                  options={branch.map((branchID) => ({
                    value: branchID.branch_id,
                    label: `${branchID.branch_id}`,
                  }))}
                />
              </div> */}
                <div>
                  <label>Subject ID:</label>
                  <Select
                    required
                    className="rounded-md border-2 m-2 w-96 z-20"
                    value={subjectInput}
                    onChange={(selectedOption) => setSubjectInput(selectedOption)}
                    options={subject.map((SubjectSelect) => ({
                      value: SubjectSelect.subject_id,
                      label: `${SubjectSelect.subject_code} ${SubjectSelect.subject_name} (${SubjectSelect.subject_type}) Batch-${SubjectSelect.batch}`,
                    }))}
                  />
                </div>
                <div>
                  <label>Faculty:</label>
                  <Select
                    required
                    className="rounded-md border-2 m-2 w-96 z-10"
                    value={facultyInput}
                    onChange={(selectedOption) => setFacultyInput(selectedOption)}
                    options={faculty.map((facultyMember) => ({
                      value: facultyMember.faculty_email,
                      label: `${facultyMember.faculty_name} (${facultyMember.faculty_email})`,
                    }))}
                  />
                </div>
                <div>
                  <label>Room ID:</label>
                  <Select
                    required
                    className="rounded-md border-2 m-2 w-96 z-20"
                    value={roomInput}
                    onChange={(selectedOption) => setRoomInput(selectedOption)}
                    options={room.map((RoomIDS) => ({
                      value: RoomIDS.room_id,
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
              </div>
          </form>
        </div>
        {/* Branch Wise Time table */}
        <div style={{ width: "95%" }}></div>
        <div style={{ width: "95%" }} className="ml-3">
          <MaterialReactTable table={table} style={{ width: "100%" }} />
        </div>
        <div></div>
      </>
    </>
  );
};

export default TimeTable;
