"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
// import { f } from "html2pdf.js";
// import html2pdf from "html2pdf.js";
// import html2canvas from 'html2canvas';

let two = "First";
const FacultyTimeTable = (props) => {
  const [data, setData] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [department, setDepartment] = useState([]);
  const [semester, setSemester] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const one = props;
  const doc = new jsPDF();

  // const exportToPDF2 = async () => {
  //   const element = document.getElementById("branch-table-container");

  //   var opt = {
  //     margin: 1,
  //     filename: "timetable.pdf",
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: { scale: 2 },
  //   };
  //   html2pdf().set(opt).from(element).save();
  // };

  // console.log(props);
  const exportToPDF = async () => {
    let pdf = new jsPDF("p", "pt", "a4");
    let srcwidth = document.getElementById(
      "branch-table-container"
    ).scrollWidth;

    pdf.html(document.getElementById("branch-table-container"), {
      html2canvas: {
        scale: 595.26 / srcwidth, //595.26 is the width of A4 page
        scrollY: 0,
      },
      filename: "jspdf",
      x: 10,
      y: 10,

      callback: function () {
        window.open(pdf.output("bloburl"));
      },
    });
  };

  const getDataFinalTable = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setData(response.data.allotment);
        setFaculty(response.data.faculty);
        setDepartment(response.data.department);
        setSemester(response.data.semester);
        setSubject(response.data.subject);
        setLoading(false);
        // console.log("Response: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDataFinalTable();
  }, []);
  let selectedSessionnew = props.branchwiseprop.session;
  let faculty_email = props.branchwiseprop.faculty_email;
  const findFacultyWithEmail = async (faculty_email) => {
    return faculty.find((item) => item.faculty_email == faculty_email);
  };

  const findDepartmentById = async (department_id) => {
    return department.find((item) => item.department_id == department_id);
  };

  const processFaculty = async (faculty_email) => {
    try {
      const facultyWithEmail = await findFacultyWithEmail(faculty_email);
      console.log("facultyWithEmail:: ", facultyWithEmail);

      const facultyName = facultyWithEmail ? facultyWithEmail.faculty_name : "";

      const facultyDepartment = facultyWithEmail
        ? facultyWithEmail.department_id
        : "";

      const departmentrow = await findDepartmentById(facultyDepartment);

      const DepartmentName = departmentrow ? departmentrow.department_name : "";

      console.log("Faculty Name:", facultyName);
      console.log("Department Name:", DepartmentName);

      if (
        selectedSessionnew !== undefined &&
        selectedSessionnew !== null &&
        selectedSessionnew !== "" &&
        facultyName !== undefined &&
        facultyName !== null &&
        facultyName !== "" &&
        DepartmentName !== undefined &&
        DepartmentName !== null &&
        DepartmentName !== ""
      ) {
        let selectedBranchDataContainer = document.getElementById(
          "selectedBranchDataContainer"
        );
        selectedBranchDataContainer.innerHTML = `<h3 > ${facultyName} </h3>`;
        let departmentName = document.getElementById("departmentName");
        departmentName.innerHTML = `<h3 > ${DepartmentName} </h3>`;
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Call the function with the desired faculty_email
  processFaculty(faculty_email);

  const filteredDataWithSession = selectedSessionnew
    ? data.filter((entry) => entry.session_id == selectedSessionnew)
    : data;
  // console.log("filteredDataWithSession:: ",filteredDataWithSession)
  const filteredData = faculty_email
    ? filteredDataWithSession.filter(
        (entry) => entry.faculty_email == faculty_email
      )
    : data;
  console.log("filteredData:: ", filteredData);
  //  console.log("filteredDataWithSEMESTER: ",filteredDataWithSemester)
  // console.log("FilteredDataFinal: ", filteredData);

  return (
    <>
      {/* <div>
        <button
          onClick={exportToPDF2}
          className="m-2 p-2 bg-blue-500 rounded-full text-white"
        >
          Export to PDF 2
        </button>
      </div> */}
      <button
        onClick={exportToPDF}
        className="m-2 p-2 bg-blue-500 rounded-full text-white"
      >
        Export to PDF
      </button>
      <div id="branch-table-container">
        <div style={{ width: "95%" }}>
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-1 max-w-full">
              <h3
                className="text-center font-bold text-blue-500 text-2xl p-2"
                id="departmentName"
              ></h3>
              <div>
                <h3 className="text-center font-bold text-xl">
                  Session Jan - June 2024
                </h3>
                <div className=" flex justify-between items-center w-90">
                  <div className="w-48 flex items-center"></div>

                  <div
                    className="text-center w-70  font-bold text-xl"
                    id="selectedBranchDataContainer"
                  ></div>
                  <div className="w-48"></div>
                </div>
              </div>
            </div>
          </div>

          {/* <MaterialReactTable  table={table} style={{ width: "100%" } } /> */}
          <div className="block bg-transparent w-full overflow-x-auto p-4">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-gray-700 ml-0">
                <tr className="border border-black">
                  <th className="text-md border border-black px-1 py-2">Day</th>
                  <th className="text-md border border-black px-1 py-2">
                    09:00 - 10:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    10:00 - 11:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    11:00 - 12:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    12:00 - 13:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    13:00 - 14:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    14:00 - 15:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    15:00 - 16:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    16:00 - 17:00
                  </th>
                  <th className="text-md border border-black px-1 py-2">
                    17:00 - 18:00
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                ].map((day, dayIndex) => (
                  <tr key={dayIndex} className="border border-black">
                    <td className="text-md border border-black px-1 py-2 text-center">
                      {day}
                    </td>
                    {[
                      "09:00 - 10:00",
                      "10:00 - 11:00",
                      "11:00 - 12:00",
                      "12:00 - 13:00",
                      "13:00 - 14:00",
                      "14:00 - 15:00",
                      "15:00 - 16:00",
                      "16:00 - 17:00",
                      "17:00 - 18:00",
                    ].map((slot, slotIndex) => {
                      const entries = filteredData.filter(
                        (entry) =>
                          entry.day === day &&
                          entry.slot_start_time.slice(0, 5) ===
                            slot.slice(0, 5) &&
                          entry.slot_end_time.slice(0, 5) === slot.slice(8)
                      );
                      return (
                        <td
                          key={slotIndex}
                          className="text-sm border border-black px-1 py-2 text-center"
                        >
                          {entries.map((entry, index) => (
                            <div key={index}>
                              {entry.room_name}
                              <br />
                              {entry.subject_code} -
                              {/* Fetching subject name */}
                              {
                                subject.find(
                                  (subjectItem) =>
                                    subjectItem.subject_id === entry.subject_id
                                )?.subject_name
                              }
                              <br />
                              Branch -{entry.branch_id}
                              <br />
                              {/* Fetching semester name */}
                              Semester -
                              {
                                semester.find(
                                  (semesterItem) =>
                                    semesterItem.semester_id ==
                                    entry.semester_id
                                )?.semester_name
                              }
                              {index !== entries.length - 1 && (
                                <hr style={{ borderTop: "1px solid black" }} />
                              )}
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default FacultyTimeTable;
