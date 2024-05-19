"use client";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "../../(Components)/toast/toast";
import { useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import UploadData from "../../(Components)/UploadCsv/uploadcsv";

const TimeSlot = () => {
  const [data, setData] = useState([]);
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
        setData(response.data.timeslot);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editRecord = (row) => {
    // setAddRecord(true);
    setRows(row);
    console.log(row);
  };

  const ClearRow = (row) => {
    setRows(null);
    // setAddRecord(true);
    console.log(row);
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
      slot_id: row.original.slot_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/timeslot",
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
        } else {
          setToastMessage("Record not deleted");
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
        accessorKey: "slot_id",
        header: "slot ID",
        size: 20,
      },
      {
        accessorKey: "slot_start_time",
        header: "Slot Start Time",
        size: 20,
      },
      {
        accessorKey: "slot_end_time",
        header: "Slot End Time",
        size: 20,
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 20,
      },
      {
        accessorKey: "day",
        header: "Day",
        size: 20,
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
      // Delete icon column
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
    defaultColumn: {
      minSize: 20, //allow columns to get smaller than default
      maxSize: 200, //allow columns to get larger than default
      size: 20, //make columns wider by default
    },
    // initialState: { density: 'compact' },
    initialState: { pagination: { pageSize: 25 }, density: "compact" },
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
        slot_start_time: rows.original.slot_start_time,
        slot_end_time: rows.original.slot_end_time,
        duration: rows.original.duration,
        day: rows.original.day,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    if (rows) {
      try {
        const response = await axios.put("/api/database/timeslot", data);
        console.log(response.data);
        setToastMessage("Record edited successfully!");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
      } catch (error) {
        setToastMessage("Something went wrong!! Please try again.");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post("/api/database/timeslot", data);
        console.log(response.data);
        if (response) {
          setToastMessage("Record added successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
        } else {
          setToastMessage("Record not added");
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
  };
  // CSV Upload handling
  const sessionFields = ["slot_start_time", "slot_end_time", "duration", "day"];
  const sessionApiUrl = "/api/database/timeslot"; //where to post data
  //callback after Upload CSV action is performed
  const handleButtonClick = (message) => {
    console.log(message);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
    getData();
  };

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}

      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
          Time Slots:
        </h1>
        <UploadData
          fields={sessionFields}
          apiUrl={sessionApiUrl}
          onButtonClick={handleButtonClick} // Pass callback function
        />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap text-lg mt-3 mx-1">
              <label htmlFor="slot_start_time">Slot Start Time:</label>
              <input
                required
                className="rounded-md border-2 m-2"
                type="time"
                {...register("slot_start_time")}
              />
              <label htmlFor="slot_end_time">Slot End Time:</label>
              <input
                required
                className="rounded-md border-2 m-2"
                type="time"
                {...register("slot_end_time")}
              />

              <label htmlFor="duration">Duration :</label>
              <input
                className="rounded-md border-2 m-2"
                type="time"
                {...register("duration")}
              />
              <label htmlFor="day">Day :</label>

              <select
                required
                className="rounded-md border-2 m-2"
                {...register("day")}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className=" flex w-20 bg-indigo-500 text-white py-2 px-4 rounded-md mx-5 mb-2 hover:bg-indigo-600 justify-center"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </form>
        </div>
        <div style={{ width: "80%" }} className="ml-3">
          <MaterialReactTable table={table} style={{ width: "100%" }} />
        </div>
        <div></div>
      </>
    </>
  );
};

export default TimeSlot;
