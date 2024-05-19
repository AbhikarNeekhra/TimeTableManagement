"use client";
import axios from "axios";
import { Box, Button } from "@mui/material";
import React from "react";
import { Checkbox } from "@material-tailwind/react";
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

const Student = () => {
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState([]);
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
        setData(response.data.student);
        setBranch(response.data.branch);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextSemester = async () => {
    const selectedRows = table.getSelectedRowModel().flatRows;
    const selectedRowData = selectedRows.map((row) => row.original);
    console.log("Selected Row Data:", selectedRowData);
    let count = 0;
    try {
      for (const row of selectedRowData) {
        const updatedRow = { ...row, semester: row.semester + 1 };
        console.log("Updated ", updatedRow);

        const data = JSON.stringify(updatedRow); // Stringify updated row
        const config = {
          method: "put",
          url: "/api/database/student",
          data: data,
        };

        console.log("Updated Row Data:", data);
        const response = await axios.request(config);

        console.log("Response: ", response);
        if (response.data.message === "success") {
          count++;
        }
      }
    } catch (error) {
      console.log(error);
      // Consider handling errors more specifically here
    }
    if (count !== 0) {
      setToastMessage(`${count} records promoted successfully`);
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
      getData();
    }
  };

  const handlePrevSemester = async () => {
    const selectedRows = table.getSelectedRowModel().flatRows;
    const selectedRowData = selectedRows.map((row) => row.original);
    console.log("Selected Row Data:", selectedRowData);
    let count = 0;
    try {
      for (const row of selectedRowData) {
        const updatedRow = { ...row, semester: row.semester - 1 };
        console.log("Updated ", updatedRow);

        const data = JSON.stringify(updatedRow); // Stringify updated row
        const config = {
          method: "put",
          url: "/api/database/student",
          data: data,
        };

        console.log("Updated Row Data:", data);
        const response = await axios.request(config);

        console.log("Response: ", response);
        if (response.data.message === "success") {
          count++;
        }
      }
    } catch (error) {
      console.log(error);
      // Consider handling errors more specifically here
    }
    if (count !== 0) {
      setToastMessage(`${count} records demoted successfully`);
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
      getData();
    }
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

    // Set values from the selected row to form fields for editing
    document.querySelector('input[name="student_name"]').value =
      row.original.student_name;
    document.querySelector('input[name="student_enrollment"]').value =
      row.original.student_enrollment;
    document.querySelector('select[name="student_branch"]').value =
      row.original.student_branch;
    document.querySelector('select[name="semester"]').value =
      row.original.semester;
    document.querySelector('input[name="student_email"]').value =
      row.original.student_email;

    console.log(row);
  };

  const addRecord = () => {
    setRows(null);
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
      student_email: row.original.student_email, // Assuming student_email is the primary key
    });
    console.log(row.original.student_email);
    let config = {
      method: "delete",
      url: "/api/database/student",
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
        accessorKey: "student_name",
        header: "Student Name",
        size: 20,
      },
      {
        accessorKey: "student_enrollment",
        header: "Student Enrollment",
        size: 20,
      },
      {
        accessorKey: "student_branch",
        header: "Student Branch",
        size: 20,
      },
      {
        accessorKey: "semester",
        header: "Semester",
        size: 20,
      },
      {
        accessorKey: "student_email",
        header: "Student Email",
        size: 20,
      },
      {
        accessorKey: "edit",
        header: "",
        size: 20,
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
        size: 20,
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
      minSize: 20,
      maxSize: 200,
      size: 20,
    },
    initialState: { pagination: { pageSize: 200 }, density: "compact" },
    enableRowSelection: true,
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 25, 50, 100, 200, 500, 1000],
      shape: "rounded",
      variant: "outlined",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    console.log(formdata);
    if (rows) {
      // data.student_email = rows.original.student_email;
      try {
        let newData = {
          student_name: document.querySelector('input[name="student_name"]')
            .value, 
          student_enrollment: document.querySelector(
            'input[name="student_enrollment"]'
          ).value,
          student_branch: document.querySelector('select[name="student_branch"]')
            .value,
          semester: document.querySelector('select[name="semester"]').value,
          student_email: rows.original.student_email,
        };
        console.log("FormData::", newData);
        console.log(rows.original, "rows");
        const response = await axios.put("/api/database/student", newData);
        if (response.data.message === "success") {
          setToastMessage("Record edited successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
        } else {
          setToastMessage("Something went wrong! Please try again.");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
        }
      } catch (error) {
        setToastMessage("Something went wrong! Please try again.");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post("/api/database/student", formdata);
        if (response.data.message === "success") {
          setToastMessage("Record added successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
        }
      } catch (error) {
        setToastMessage("Something went wrong! Please try again.");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        console.error(error);
      }
    }
  };

  // CSV Upload handling
  const studentFields = [
    "student_name",
    "student_email",
    "student_enrollment",
    "student_branch",
    "semester",
  ];
  const apiUrl = "/api/database/student"; //where to post data
  const handleButtonClick = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
    getData();
  };

  return (
    <>
      {/* <React.Fragment> */}
      <div>{toastMessage && <Toast message={toastMessage} />}</div>

      <>
        <h1 className="text-3xl text-black mb-1 mt-5 font-extrabold">
          Students:
        </h1>
        <UploadData
          fields={studentFields}
          apiUrl={apiUrl}
          onButtonClick={handleButtonClick}
        />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="m-1 font-bold text-red-500 ml-2 text-lg"
              id="editmode"
            ></div>

            <div className="flex flex-row flex-wrap text-lg mt-3 mx-1">
              <label htmlFor="student_name">Student Name:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("student_name")}
              />
              <label htmlFor="student_enrollment">Student Enrollment:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("student_enrollment")}
              />
              <label htmlFor="student_branch">Student Branch:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("student_branch")}
                required
              >
                <option disabled selected value="">
                  select
                </option>
                {branch.map((branch) => (
                  <option key={branch.branch_id} value={branch.branch_id}>
                    {branch.branch_id} {/* Render the branch name */}
                  </option>
                ))}
              </select>
              <label htmlFor="semester">Semester:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("semester")}
                required
              >
                <option disabled selected value="">
                  Select Semester
                </option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>

              <label htmlFor="student_email">Student Email:</label>
              <input
                className="rounded-md border-2 m-2"
                type="email"
                {...register("student_email")}
                required
              />

              <button
                type="submit"
                className=" flex w-20 bg-indigo-500 text-white py-2 px-4 rounded-md mx-5 mb-2 hover:bg-indigo-600 justify-center"
              >
                {" "}
                Submit{" "}
              </button>
            </div>
          </form>
          <div id="addrecord" onClick={addRecord}></div>
        </div>
        <div className="grid grid-cols-6">
          <div className="p-2 border-black">
            <Box>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  color="success"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                  }
                  onClick={handleNextSemester}
                  variant="outlined"
                >
                  Promote to next Semester
                </Button>
              </Box>
            </Box>
          </div>
          {/* </React.Fragment> */}
          <div className="border-black p-2">
            <Box>
              <Box sx={{ display: "flex", gap: "0.5rem" }}>
                <Button
                  className="border-black"
                  color="error"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                  }
                  onClick={handlePrevSemester}
                  variant="outlined"
                >
                  Demote to previous Semester
                </Button>
              </Box>
            </Box>
          </div>
        </div>
        <div style={{ width: "95%" }} className="ml-3">
          {data && data.length > 0 && (
            <MaterialReactTable table={table} style={{ width: "100%" }} />
          )}
        </div>
        <div>
          {" "}
          {/* <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={
              !table.getIsSomeRowsSelected() &&
              !table.getIsAllPageRowsSelected()
            }
            onClick={handleNextSemester}
          >
            Promote all to next semester
          </button> */}
        </div>
      </>
    </>
  );
};

export default Student;
