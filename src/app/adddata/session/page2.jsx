"use client";
import UploadData from "../../(Components)/UploadCsv/uploadcsv";
const SessionUpload = () => {
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
import UploadData from "@/app/(Components)/UploadCsv/uploadcsv";

const Session = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/database/session")
      .then((response) => {
        setData(response.data);
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
      session_id: row.original.session_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/session",
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
        accessorKey: "session_id",
        header: "Session ID",
        size: 20,
      },
      {
        accessorKey: "session_name",
        header: "Session Name",
        size: 20,
      },
      {
        accessorKey: "session_year",
        header: "Session Year",
        size: 20,
      },
      {
        accessorKey: "active_session",
        header: "Active Session",
        size: 20,
      },
      {
        accessorKey: "day_start_time",
        header: "Day Start Time",
        size: 20,
      },
      {
        accessorKey: "day_end_time",
        header: "Day End Time",
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
    initialState: { pagination: { pageSize: 10 }, density: "compact" },
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
        session_name: rows.original.session_name,
        session_year: rows.original.session_year,
        active_session: rows.original.active_session,
        day_start_time: rows.original.day_start_time,
        day_end_time: rows.original.day_end_time,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    if (rows) {
      data.session_id = rows.original.session_id;
      try {
        console.log(rows);
        const response = await axios.put("/api/database/session", data);
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
        const response = await axios.post("/api/database/session", data);
        console.log(response.data);
        setToastMessage("Record added successfully!");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
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
  // CSV Upload handling

  const sessionFields = [
    "session_name",
    "session_year",
    "active_session",
    "day_start_time",
    "day_end_time",
  ];

  const sessionApiUrl = "/api/database/session"; //where to post data
  //callback after Upload CSV action is performed
  const handleButtonClick = (message) => {
    console.log(message);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
    getData();
    // You can perform any necessary actions here based on the button click
  };


  return <UploadData fields={sessionFields} apiUrl={sessionApiUrl} />;
};

export default SessionUpload;

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}

      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
          Session:{" "}
        </h1>
        <UploadData
          fields={sessionFields}
          apiUrl={sessionApiUrl}
          onButtonClick={handleButtonClick}
          // Pass callback function
        />
        {/* <UploadData fields={sessionFields} apiUrl={sessionApiUrl} /> */}

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap text-lg mt-3 mx-1">
              <label htmlFor="session_name">Session Name:</label>
              {/* <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("session_name")}
              /> */}
              <input
                className="rounded-md border-2 m-2"
                type="text"
                pattern="[A-Z]{3}-[A-Z]{3} \d{4}"
                {...register("session_name")}
              />
              <label htmlFor="session_year">Session Year:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                pattern="[0-9]{4}"
                {...register("session_year")}
              />
              <label htmlFor="active_session">Active Session:</label>

              <select
                className="rounded-md border-2 m-2"
                {...register("active_session")}
              >
                <option value="0">0</option>
                <option value="1">1</option>
              </select>

              <label htmlFor="day_start_time">Day Start Time:</label>
              <input
                className="rounded-md border-2 m-2"
                type="time"
                {...register("day_start_time")}
              />
              <label htmlFor="day_end_time">Day End Time:</label>
              <input
                className="rounded-md border-2 m-2"
                type="time"
                {...register("day_end_time")}
              />

              <button
                type="submit"
                className=" flex w-20 bg-indigo-500 text-white py-2 px-4 rounded-md mx-5 mb-2 hover:bg-indigo-600 justify-center"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
            {/* <div>{toastMessage && <Toast message={toastMessage} />}</div> */}
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

export default Session;
