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

const Subject = () => {
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
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    if (rows) {
      // console.log(rows);
      try {
        let newdata = JSON.stringify({
          subject_id: rows.original.subject_id,
          session_id: document.querySelector('select[name="session_id"]').value,
          subject_name: document.querySelector('input[name="subject_name"]')
            .value,
          department_id: document.querySelector('select[name="department_id"]')
            .value,
          subject_type: document.querySelector('select[name="subject_type"]')
            .value,
          subject_orientation: document.querySelector(
            'select[name="subject_orientation"]'
          ).value,
          branch_id: document.querySelector('select[name="branch_id"]').value,
          semester_id: document.querySelector('select[name="semester_id"]')
            .value,
          batch: document.querySelector('input[name="batch"]').value,
          subject_code: document.querySelector('input[name="subject_code"]')
            .value,
        });
        console.log("NewData::", newdata);

        const response = await axios.put("/api/database/subject", newdata);
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
        console.log(data);
        const response = await axios.post("/api/database/subject", data);
        console.log(response.data);
        if (response.data.message == "success") {
          setToastMessage("Record added successfully!");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
          getData();
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
  const subjectFields = [
    "session_id",
    "subject_name",
    "department_id",
    "subject_type",
    "subject_orientation",
    "branch_id",
    "semester_id",
    "batch",
    "subject_code",
  ];
  const sessionApiUrl = "/api/database/subject"; //where to post data
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
          Subject:
        </h1>
        <UploadData
          fields={subjectFields}
          apiUrl={sessionApiUrl}
          onButtonClick={handleButtonClick} // Pass callback function
        />
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="m-1 font-bold text-red-500 ml-2 text-lg"
              id="editmode"
            ></div>

            <div className="flex flex-row flex-wrap text-lg mt-3 mx-1">
              <label htmlFor="session_id">Session ID:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("session_id")}
                required
              >
                <option disabled selected value="">
                  select
                </option>
                {session.map((SessionIDS) => (
                  <option
                    key={SessionIDS.session_id}
                    value={SessionIDS.session_id}
                  >
                    {`${SessionIDS.session_name}`}
                  </option>
                ))}
              </select>

              <label htmlFor="subject_name">Subject Name:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("subject_name")}
              />
              <label htmlFor="department_id">Department ID:</label>
              <select
                required
                className="rounded-md border-2 m-2"
                {...register("department_id")}
              >
                <option disabled selected value="">
                  select
                </option>
                {department.map((departmentIdS) => (
                  <option
                    key={departmentIdS.department_id}
                    value={departmentIdS.department_id}
                  >
                    {`${departmentIdS.department_id}`}
                  </option>
                ))}
              </select>

              <label htmlFor="subject_type">Subject Type:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("subject_type")}
              >
                <option disabled selected value="">
                  select
                </option>
                <option value="THEORY">THEORY</option>
                <option value="PRACTICAL">PRACTICAL</option>
              </select>

              <label htmlFor="subject_orientation">Subject Orientation:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("subject_orientation")}
              >
                <option disabled selected value="">
                  select
                </option>
                <option value="REGULAR">REGULAR</option>
                <option value="NEC">NEC</option>
                <option value="OC">OC</option>
              </select>

              <label htmlFor="branch_id">Branch ID:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("branch_id")}
              >
                <option disabled selected value>
                  select
                </option>
                {branch.map((branchIdS) => (
                  <option key={branchIdS.branch_id} value={branchIdS.branch_id}>
                    {`${branchIdS.branch_id}`}
                  </option>
                ))}
              </select>

              <label htmlFor="semester_id">Semester:</label>
              <select
                className="rounded-md border-2 m-2"
                {...register("semester_id")}
              >
                <option disabled selected value>
                  select
                </option>
                {semester.map((SemesterIDS) => (
                  <option
                    key={SemesterIDS.semester_id}
                    value={SemesterIDS.semester_id}
                  >
                    {`${SemesterIDS.semester_name}`}
                  </option>
                ))}
              </select>

              <label htmlFor="batch">Batch:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("batch")}
              />

              <label htmlFor="subject_code">Subject Code:</label>
              <input
                className="rounded-md border-2 m-2"
                type="text"
                {...register("subject_code")}
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
          <div id="addrecord" onClick={addrecord}></div>
        </div>
        <div style={{ width: "95%" }} className="ml-3">
          <MaterialReactTable table={table} style={{ width: "100%" }} />
        </div>
        <div></div>
      </>
    </>
  );
};

export default Subject;
