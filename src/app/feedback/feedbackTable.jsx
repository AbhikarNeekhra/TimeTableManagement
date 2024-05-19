"use client";
import { MaterialReactTable } from "material-react-table";
import { useMaterialReactTable } from "material-react-table";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "@/app/(Components)/toast/toast";
import { useMemo, useState, useEffect } from "react";

const FeedbackTable = () => {
  const [data, setData] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true); // Set loading state before fetching data
    axios
      .get("/api/database/feedback")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
      feedback_id: row.original.feedback_id,
    });
    let config = {
      method: "delete",
      url: "/api/database/feedback",
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
          setToastMessage("Something went wrong!! Please try again.");
          setTimeout(() => {
            setToastMessage("");
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
        setToastMessage("Error deleting record. Please try again.");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "feedback_id", // Change accessorKeyKey to accessorKey
        header: "Feedback ID", // Change header to header
        size: 20,
      },
      {
        accessorKey: "feedback_text",
        header: "Feedback Text",
        size: 50,
      },
      {
        accessorKey: "feedback_email",
        header: "Email",
        size: 50,
      },
      {
        accessorKey: "feedback_subject",
        header: "Subject",
        size: 50,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 20,
      },
      {
        accessorKey: "delete", // Add unique id for the delete button
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
    initialState: { pagination: { pageSize: 25 }, density: "compact" },
  });

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <div style={{ width: "95%" }} className="ml-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MaterialReactTable table={table} style={{ width: "100%" }} />
        )}
      </div>
    </>
  );
};

export default FeedbackTable;
