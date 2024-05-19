'use client'
import FacultyTimeTable from "../(Components)/finaltable/facultyTimetable";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const ModeratorTimeTable = () => {
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState([]);
  const [electiveCourse, setElectiveCourse] = useState([]);
  const [room, setRoom] = useState([]);
  const { data: sessiondata } = useSession();
  let moderator_email = sessiondata?.user?.email;

  const getData = () => {
    axios
      .get("/api/database/getalldata")
      .then((response) => {
        setSubject(response.data.subject);
        setElectiveCourse(response.data.elective_course);
        setRoom(response.data.room);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredElective = electiveCourse.filter(
    (item) => item.faculty_email === moderator_email
  );

  return (
    <>
      <div className="p-5">
        <div className="text-xl font-bold mb-3">Moderator Dashboard</div>
        <div className="mb-3">Logged in as: {moderator_email}</div>
        <FacultyTimeTable
          branchwiseprop={{
            session: 2,
            faculty_email: moderator_email,
          }}
        />
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-800 px-4 py-2">
                  Subject Code
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  Subject Name
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  Subject Orientation
                </th>
                <th className="border border-gray-800 px-4 py-2">Room Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredElective.map((elec) => {
                const correspondingSubject = subject.find(
                  (sub) => sub.subject_id === elec.subject_id
                );
                const correspondingRoom = room.find(
                  (r) => r.room_id === elec.room_id
                );
                return (
                  <tr key={elec.subject_id} className="border border-gray-800">
                    <td className="border border-gray-800 px-4 py-2">
                      {correspondingSubject?.subject_code}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {correspondingSubject?.subject_name}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {correspondingSubject?.subject_orientation}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {correspondingRoom?.room_name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ModeratorTimeTable;

