import React, { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Toast from "../../(Components)/toast/toast";

const EditDepartmentModal = ({ isOpen, onClose, rowData, onSave }) => {
  const [editedData, setEditedData] = useState({ ...rowData });

  useEffect(() => {
    setEditedData({ ...rowData });
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center`}
    >
      <div className="modal-content bg-white p-8 rounded-md shadow-AbhiShad">
        <h2 className="text-lg font-bold mb-4">Edit Department</h2>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="departmentName">
            Department Name
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="text"
            id="departmentName"
            name="department_name"
            value={editedData.department_name}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 bg-gradient-to-r from-[#FE886A] to-[#FF4B77]"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const DepartmentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage] = useState(5); // Number of items per page
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.department);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false even in case of error
      });
  };

  const editRecord = (row) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  };

  const deleteRecord = (row) => {
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
      department_id: row.department_id,
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
        getData(); // Update data after deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditedData = (editedData) => {
    // Implement the logic to save edited data
    console.log("Edited data:", editedData);
    // You can send the edited data to the server here
  };

  // Calculate index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get current items to display
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      {loading ? (
        <div className="text-center text-xl font-bold my-2">Loading...</div>
      ) : (
        <>
          {currentItems.length > 0 ? (
            <div className="w-full relative flex flex-col shadow-lg mb-2">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full">
                  <h3 className="text-center font-bold text-2xl p-4">
                    Department Table
                  </h3>
                </div>
              </div>
              <div className="block bg-transparent p-4 w-full overflow-x-auto">
                <table className="w-full ">
                  <thead>
                    <tr className="border border-solid shadow-md border-l-0 border-r-0">
                      <th className="text-md px-6 py-3">Department ID</th>
                      <th className="text-md px-6 py-3">Department Name</th>
                      <th className="text-md px-6 py-3">EDIT</th>
                      <th className="text-md px-6 py-3">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row) => (
                      <tr
                        key={row.department_id}
                        className="border border-solid border-l-0 border-r-0"
                      >
                        <td className="text-md px-6 py-3 text-center">
                          {row.department_id}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.department_name}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          <button
                            className="text-white font-bold bg-blue-700 px-4 py-1 rounded-md"
                            onClick={() => editRecord(row)}
                          >
                            Edit
                          </button>
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          <button
                            className="text-white font-bold bg-red-700 px-4 py-1 rounded-lg"
                            onClick={() => deleteRecord(row)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center">No data to display</div>
          )}
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {data.length > itemsPerPage && (
              <ul className="flex space-x-2">
                {[...Array(Math.ceil(data.length / itemsPerPage))].map(
                  (item, index) => (
                    <li key={index}>
                      <button
                        className={`${
                          currentPage === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } px-4 py-2 rounded-md`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </>
      )}
      <EditDepartmentModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        rowData={selectedRow}
        onSave={saveEditedData}
      />
    </>
  );
};

export default DepartmentTable;
