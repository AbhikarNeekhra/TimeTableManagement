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
const Semester = () => {
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
        setData(response.data.semester);
        // setSession(response.data.session);
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
    console.log(row);
    document.querySelector('input[name="semester_name"]').value =
      row.original.semester_name;
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
      url: "/api/database/semester",
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
        accessorKey: "semester_id", //normal accessorKey
        header: "Semester ID",
        size: 20,
      },
      {
        accessorKey: "semester_name", //normal accessorKey
        header: "Semester Name",
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
    formState: { errors },
  } = useForm();

  const onSubmit = async (data2) => {
    if (rows) {
      try {
        let dataput = JSON.stringify({
          semester_name: data2.semester_name,
          semester_id: rows.original.semester_id,
        });
        console.log(data);
        const response = await axios.put("/api/database/semester", dataput);
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
        let datapost = JSON.stringify({
          semester_name: data2.semester_name,
        });
        console.log(data);
        const response = await axios.post("/api/database/semester", datapost);
        console.log(response.data);
        if (response.data.message == "success") {
          getData();
          setToastMessage("Record added successfully!");
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

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
          Semester:{" "}
        </h1>

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="m-1 font-bold text-red-500 ml-2 text-lg"
              id="editmode"
            ></div>

            <div className="flex flex-wrap text-lg mt-3 mx-1">
              <label htmlFor="semester_name">Semester Name :</label>
              <input
                className=" block rounded-md border-2 m-2"
                type="text"
                {...register("semester_name")}
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
          <div id="addrecord" onClick={addrecord}></div>
        </div>
        <div style={{ width: "40%" }} className="ml-3">
          <MaterialReactTable table={table} style={{ width: "100%" }} />
        </div>
        <div></div>
      </>
    </>
  );
};

export default Semester;
