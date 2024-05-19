"use client";
import BranchTableFinal from "../(Components)/finaltable/FinalTable";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useSession } from "next-auth/react";
// import { set } from "react-hook-form";
const StudentDashboard = () => {
  const [sessionInput, setSessionInput] = useState("");
  const [branchInput, setBranchInput] = useState("");
  const [semesterInput, setSemesterInput] = useState("");
  const [session, setSession] = useState([]);
  const [branch, setBranch] = useState([]);
  const [semester, setSemester] = useState([]);
  const [electiveCourse, setElectiveCourse] = useState([]);
  const [electiveCourseInput, setElectiveCourseInput] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState([]);
  const { data: curr_session } = useSession();
  // useEffect(() => {
  //   handleTableChange();
  // }, []);
  const student_email = curr_session?.user?.email;
  console.log(student_email);
  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setSession(response.data.session);
        setBranch(response.data.branch);
        setSemester(response.data.semester);
        setElectiveCourse(response.data.elective_course);
        setStudent(response.data.student);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
    // handleTableChange();
  }, [student_email]);
  // get row from student where student_email = student_email
  const filterStudent = (student_email) => {
    // setLoading(false);
    return student.filter((student) => {
      return student.student_email === student_email;
    });
  };
  console.log(filterStudent(student_email)[0]?.student_branch);
  console.log(filterStudent(student_email)[0]?.semester);
  // filter elective course based on electiveCourseInput.elective_course_id
  const filterElectiveCourse = (electiveInput) => {
    return electiveCourse.filter((course) => {
      return course.elective_course_id === electiveInput;
    });
  };

  console.log(
    "elective course",
    filterElectiveCourse(electiveCourseInput.value)
  );
  useEffect(() => {
    if (filterStudent(student_email)[0]?.semester) {
      handleTableChange();
      console.log("able to run handleTableChange");
    }
  }, [student_email, student]);
  const handleTableChange = () => {
    // if (!loading){ return};

    const session = {
      value: "2",
    };
    const branch = {
      value: `${filterStudent(student_email)[0]?.student_branch}`,
      // value: "AIML",
    };
    const semester = {
      value: `${filterStudent(student_email)[0]?.semester}`,
      name: `${filterStudent(student_email)[0]?.semester}`,
      // value: "2",
    };
    setSessionInput(session);
    setBranchInput(branch);
    setSemesterInput(semester);
    console.log("TimeTable Data: ", sessionInput, branchInput, semesterInput);
  };

  return (
    <>
      <div>Student Dashboard</div>
      {/* <div>
        <form className="flex flex-row flex-wrap items-center ">
           <label htmlFor="session_id">Session ID:</label>
          <Select
            defaultValue={""}
            required
            className="rounded-md border-2 m-2 w-40"
            onChange={(selectedOption) => {
              setSessionInput(selectedOption);
            }}
            options={session.map((SessionIDS) => ({
              value: SessionIDS.session_id,
              label: SessionIDS.session_name,
            }))}
          /> */}

      {/* <label htmlFor="branch_id">Branch ID:</label>
          <Select
            defaultValue={""}
            required
            className="rounded-md border-2 m-2 w-32"
            onChange={(selectedOption) => {
              setBranchInput(selectedOption);
            }}
            options={branch.map((BranchIDS) => ({
              value: BranchIDS.branch_id,
              label: BranchIDS.branch_id,
            }))}
          />

          <label htmlFor="semester_id">Semester ID:</label>
          <Select
            defaultValue={""}
            required
            className="rounded-md border-2 m-2 w-28 "
            onChange={(selectedOption) => {
              setSemesterInput(selectedOption);
            }}
            options={semester.map((SemesterIDS) => ({
              value: SemesterIDS.semester_id,
              name: SemesterIDS.semester_name,
              label: SemesterIDS.semester_name,
            }))}
          /> 
        </form>
      </div>*/}

      <BranchTableFinal
        branchwiseprop={{
          session: sessionInput,
          branch: branchInput,
          semester: semesterInput,
        }}
      />
      <div id="electiveshow">
        <form className="flex flex-row flex-wrap items-center ">
          <label htmlFor="elective_course_id">Elective Course ID:</label>
          <Select
            defaultValue={""}
            required
            className="rounded-md border-2 m-2 w-48"
            onChange={(selectedOption) => {
              setElectiveCourseInput(selectedOption);
            }}
            options={electiveCourse.map((ElectiveCourseIDS) => ({
              value: ElectiveCourseIDS.elective_course_id,
              label: `${ElectiveCourseIDS.subject_name}-${ElectiveCourseIDS.subject_code} - ${ElectiveCourseIDS.subject_orientation}`,
            }))}
          />
        </form>
      </div>
      <div id="elective-table-output" className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-800 px-4 py-2">Session Name</th>
              <th className="border border-gray-800 px-4 py-2">Subject Name</th>
              <th className="border border-gray-800 px-4 py-2">Subject Code</th>
              <th className="border border-gray-800 px-4 py-2">
                Subject Orientation
              </th>
              <th className="border border-gray-800 px-4 py-2">Faculty Name</th>
              <th className="border border-gray-800 px-4 py-2">Room Name</th>
              <th className="border border-gray-800 px-4 py-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {filterElectiveCourse(electiveCourseInput.value).map(
              (electiveCourse) => (
                <tr
                  key={electiveCourse.subject_code}
                  className="border border-gray-800"
                >
                  <td className="border border-gray-800 px-4 py-2">
                    {electiveCourse.session_name}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {electiveCourse.subject_name}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {electiveCourse.subject_code}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {electiveCourse.subject_orientation}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {electiveCourse.faculty_name}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {electiveCourse.room_name}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {electiveCourse.department_id}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentDashboard;
