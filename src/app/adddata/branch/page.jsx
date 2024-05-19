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

const Branch = () => {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState([]);
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
        setData(response.data.branch);
        setDepartment(response.data.department);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const department_ids = department.map(
    (department) => department.department_id
  );
  const editRecord = (row) => {
    setRows(row);
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
      branch_id: row.original.branch_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/branch",
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
        accessorKey: "branch_id",
        header: "Branch ID",
        size: 20,
      },
      {
        accessorKey: "branch_name",
        header: "Branch Name",
        size: 20,
      },
      {
        accessorKey: "department_id",
        header: "Department ID",
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
        branch_id: rows.original.branch_id,
        branch_name: rows.original.branch_name,
        department_id: rows.original.department_id,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    if (rows) {
      try {
        const response = await axios.put("/api/database/branch", data);
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
        const response = await axios.post("/api/database/branch", data);
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
  const sessionFields = ["branch_id", "branch_name", "department_id"];
  const sessionApiUrl = "/api/database/branch"; //where to post data
  //callback after Upload CSV action is performed
  const handleButtonClick = (message) => {
    console.log(message);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 5000);
    getData();
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}

      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
          Branch:
        </h1>
        <UploadData
          fields={sessionFields}
          apiUrl={sessionApiUrl}
          onButtonClick={handleButtonClick} // Pass callback function
        />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap text-lg mt-3 mx-1">
              <label htmlFor="branch_id">Branch ID:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("branch_id")}
              />
              <label htmlFor="branch_name">Branch Name:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("branch_name")}
              />

              <label htmlFor="department_id">Department ID:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("department_id")}
              >
                {department_ids.map((departmentIdS) => (
                  <option key={departmentIdS} value={departmentIdS}>
                    {departmentIdS}
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
        <div style={{ width: "60%" }} className="ml-3">
          <MaterialReactTable table={table} style={{ width: "100%" }} />
        </div>
        <div></div>
      </>
    </>
  );
};

export default Branch;
