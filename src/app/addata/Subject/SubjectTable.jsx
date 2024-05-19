import React, { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Toast from "../../(Components)/toast/toast";
import "react-confirm-alert/src/react-confirm-alert.css";

const EditSubjectModal = ({ isOpen, onClose, rowData, onSave }) => {
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
      } fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center px-3`}
    >
      <div className="modal-content bg-white p-8 rounded-md shadow-AbhiShad">
        <h2 className="text-lg font-bold mb-4">Edit Subject</h2>
        <div className="flex">
          <div className="mb-4 mr-4">
            <label className="block mb-1" htmlFor="subjectId">
              Subject ID
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="subjectId"
              name="subject_id"
              value={editedData.subject_id}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="semester">
              Semester
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="semester"
              name="semester_name"
              value={editedData.semester_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-4 mr-4">
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
            <label className="block mb-1" htmlFor="subjectType">
              Subject Type
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="subjectType"
              name="subject_type"
              value={editedData.subject_type}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex">
          <div className="mb-4 mr-4">
            <label className="block mb-1" htmlFor="subjectCode">
              Subject Code
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="subjectCode"
              name="subject_code"
              value={editedData.subject_code}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="branchId">
              Branch ID
            </label>
            <input
              className="border border-gray-400 px-2 py-1 w-full"
              type="text"
              id="branchId"
              name="branch_id"
              value={editedData.branch_id}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="subjectName">
            Subject Name
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="text"
            id="subjectName"
            name="subject_name"
            value={editedData.subject_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="batch">
            Batch
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="text"
            id="batch"
            name="batch"
            value={editedData.batch}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="subjectOrientation">
            Subject Orientation
          </label>
          <input
            className="border border-gray-400 px-2 py-1 w-full"
            type="text"
            id="subjectOrientation"
            name="subject_orientation"
            value={editedData.subject_orientation}
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

const SubjectTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/database/getalldata");
      setData(response.data.subject);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
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

  const deleteRow = async (row) => {
    try {
      const response = await axios.delete("/api/database/subject", {
        data: { subject_id: row.subject_id },
      });
      if (response.data.message === "success") {
        setToastMessage("Record deleted successfully");
        setTimeout(() => {
          setToastMessage("");
        }, 3000);
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveEditedData = (editedData) => {
    // Implement the logic to save edited data
    console.log("Edited data:", editedData);
    // You can send the edited data to the server here
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
                    Subject Table
                  </h3>
                </div>
              </div>
              <div className="block bg-transparent p-4 w-full overflow-x-auto">
                <table className="w-full ">
                  <thead>
                    <tr className="border border-solid shadow-md border-l-0 border-r-0">
                      <th className="text-md px-6 py-3">Session ID</th>
                      <th className="text-md px-6 py-3">Subject ID</th>
                      <th className="text-md px-6 py-3">Subject Name</th>
                      <th className="text-md px-6 py-3">Department ID</th>
                      <th className="text-md px-6 py-3">Subject Type</th>
                      <th className="text-md px-6 py-3">Subject Code</th>
                      <th className="text-md px-6 py-3">Branch ID</th>
                      <th className="text-md px-6 py-3">Semester</th>
                      <th className="text-md px-6 py-3">Batch</th>
                      <th className="text-md px-6 py-3">Subject Orientation</th>
                      <th className="text-md px-6 py-3">EDIT</th>
                      <th className="text-md px-6 py-3">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((row) => (
                      <tr
                        key={row.subject_id}
                        className="border border-solid border-l-0 border-r-0"
                      >
                        <td className="text-md px-6 py-3 text-center">
                          {row.session_id}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.subject_id}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.subject_name}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.department_id}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.subject_type}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.subject_code}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.branch_id}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.semester_name}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.batch}
                        </td>
                        <td className="text-md px-6 py-3 text-center">
                          {row.subject_orientation}
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
            <div className="flex justify-center my-4">
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
          <EditSubjectModal
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

export default SubjectTable;
