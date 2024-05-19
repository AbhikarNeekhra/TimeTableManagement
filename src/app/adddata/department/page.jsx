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

const Department = () => {
  const [data, setData] = useState([]);
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
        setData(response.data.department);
        setSession(response.data.session);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const session_ids = session.map((session) => session.session_name);

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
      department_id: row.original.department_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/department",
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
        accessorKey: "department_id", //normal accessorKey
        header: "Department Id",
        size: 20,
      },
      {
        accessorKey: "department_name",
        header: "Department Name",
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
        department_id: rows.original.department_id,
        department_name: rows.original.department_name,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    if (rows) {
      try {
        const response = await axios.put("/api/database/department", data);
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
        const response = await axios.post("/api/database/department", data);
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
  const sessionFields = ["department_id", "department_name"];
  const sessionApiUrl = "/api/database/department"; //where to post data
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

      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
          Department:{" "}
        </h1>
        <UploadData
          fields={sessionFields}
          apiUrl={sessionApiUrl}
          onButtonClick={handleButtonClick}
          // Pass callback function
        />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap text-lg mt-3 mx-1">
              <label htmlFor="department_id">Department ID:</label>
              <input
                className=" rounded-md border-2  m-2"
                type="text"
                {...register("department_id")}
              />

              <label htmlFor="department_name">Department Name :</label>
              <input
                className=" rounded-md border-2 m-2"
                type="text"
                {...register("department_name")}
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

export default Department;
