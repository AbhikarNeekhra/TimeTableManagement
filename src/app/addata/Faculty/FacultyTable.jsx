import React, { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Toast from "../../(Components)/toast/toast";
import "react-confirm-alert/src/react-confirm-alert.css";

const EditFacultyModal = ({ isOpen, onClose, rowData, onSave }) => {
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
        <h2 className="text-lg font-bold mb-4">Edit Faculty</h2>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="facultyEmail">
            Faculty Email
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="email"
            id="facultyEmail"
            name="faculty_email"
            value={editedData.faculty_email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="facultyName">
            Faculty Name
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="text"
            id="facultyName"
            name="faculty_name"
            value={editedData.faculty_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="departmentId">
            Department ID
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="text"
            id="departmentId"
            name="department_id"
            value={editedData.department_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="designation">
            Designation
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="text"
            id="designation"
            name="designation"
            value={editedData.designation}
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

const FacultyTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.faculty);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const editRecord = (row) => {
    setSelectedRow(row);
    setEditModalOpen(true);
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
      faculty_email: row.faculty_email,
    });
    let config = {
      method: "delete",
      url: "/api/database/faculty",
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
        fetchData();
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
                    Faculty Table
                  </h3>
                </div>
              </div>
              <div className="block bg-transparent p-4 w-full overflow-x-auto">
                <table className="w-full ">
                  <thead>
                    <tr className="border border-solid shadow-md border-l-0 border-r-0">
                      <th className="text-md px-6 py-3">Faculty Email</th>
                      <th className="text-md px-6 py-3">Faculty Name</th>
                      <th className="text-md px-6 py-3">Department</th>
                      <th className="text-md px-6 py-3">Designation</th>
                      <th className="text-md px-6 py-3">EDIT</th>
                      <th className="text-md px-6 py-3">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row) => (
                      <tr
                        key={row.faculty_email}
                        className="border border-solid border-l-0 border-r-0"
                      >
                        <td className="text-md px-6 py-3 text-center">
                          {row.faculty_email}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.faculty_name}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.department_id}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.designation}
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
          {data.length > itemsPerPage && (
            <div className="flex justify-center mt-4">
              {Array.from({
                length: Math.ceil(data.length / itemsPerPage),
              }).map((item, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          {/* Edit Modal */}
          <EditFacultyModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            rowData={selectedRow}
            onSave={saveEditedData}
          />
        </>
      )}
    </>
  );
};

export default FacultyTable;
