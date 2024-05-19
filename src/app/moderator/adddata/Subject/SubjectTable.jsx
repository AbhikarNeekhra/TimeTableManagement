"use client";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "../../../(Components)/toast/toast";
import { useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

export default function StudentTable() {
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [branch, setBranch] = useState([]);
  const [semester, setSemester] = useState([]);
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
        setData(response.data.subject);
        setSession(response.data.session);
        setDepartment(response.data.department);
        setBranch(response.data.branch);
        setSemester(response.data.semester);
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

    document.querySelector('select[name="session_id"]').value =
      row.original.session_id;
    document.querySelector('input[name="subject_name"]').value =
      row.original.subject_name;
    document.querySelector('select[name="department_id"]').value =
      row.original.department_id;
    document.querySelector('select[name="subject_type"]').value =
      row.original.subject_type;
    document.querySelector('select[name="subject_orientation"]').value =
      row.original.subject_orientation;
    document.querySelector('select[name="branch_id"]').value =
      row.original.branch_id;
    document.querySelector('select[name="semester_id"]').value =
      row.original.semester_id;
    document.querySelector('input[name="batch"]').value = row.original.batch;
    document.querySelector('input[name="subject_code"]').value =
      row.original.subject_code;

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
      subject_id: row.original.subject_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/subject",
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
        accessorKey: "session_name",
        header: "Session ID",
        size: 20,
      },
      {
        accessorKey: "subject_id",
        header: "Subject ID",
        size: 20,
      },
      {
        accessorKey: "subject_name",
        header: "Subject Name",
        size: 20,
      },
      {
        accessorKey: "department_id",
        header: "Department ID",
        size: 20,
      },
      {
        accessorKey: "subject_type",
        header: "Subject Type",
        size: 20,
      },
      {
        accessorKey: "subject_code",
        header: "Subject Code",
        size: 20,
      },
      {
        accessorKey: "branch_id",
        header: "Branch ID",
        size: 20,
      },

      {
        accessorKey: "semester_name",
        header: "Semester",
      },
      {
        accessorKey: "batch",
        header: "Batch",
        size: 20,
      },

      {
        accessorKey: "subject_orientation",
        header: "Subject Orientation",
        size: 20,
      },
      {
        accessorKey: "edit",
        header: "",
        size: 20,
        Cell: ({ row }) => (
          <div className="flex">
            <button
              className="text-white font-bold bg-blue-700 px-4 py-2 rounded-md"
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
        size: 20,
        Cell: ({ row }) => (
          <button
            className="text-white font-bold bg-red-700 px-4 py-2 rounded-lg"
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

  return (
    <>
      <div className="w-full px-3">
        <MaterialReactTable table={table} style={{ width: "100%" }} />
      </div>
    </>
  );
}
