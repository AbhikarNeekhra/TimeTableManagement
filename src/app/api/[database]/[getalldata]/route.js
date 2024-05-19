import { query } from "@/lib/db";
export async function GET(request) {
  const getsession = await query({
    query: "SELECT * FROM session;",
  });
  const getdepartment = await query({
    query: "SELECT * FROM department;",
  });
  const getsemester = await query({
    query: "SELECT * FROM semester;",
  });
  const getbranch = await query({
    query: "SELECT * FROM branch;",
  });
  const getroom = await query({
    query: "SELECT * FROM room;",
  });
  const getelectivecourse = await query({
    query: "SELECT * FROM elective_course;",
  });
  const getstudent = await query({
    query: "SELECT * FROM student;",
  });
  const getsubject = await query({
    query:
      "SELECT s.subject_id, s.session_id, s.subject_name, s.department_id, s.subject_type, s.subject_id, s.subject_code, s.batch,  s.subject_orientation,s.branch_id, s.semester_id, semester.semester_name, session.session_name FROM subject s LEFT JOIN semester ON semester.semester_id = s.semester_id LEFT JOIN session ON session.session_id = s.session_id ORDER BY s.subject_id DESC;",
  });
  const getfaculty = await query({
    query: "SELECT * FROM faculty;",
  });
  const gettimeslot = await query({
    query: "SELECT * FROM timeslot;",
  });
  const get_other_session = await query({
    query: "SELECT * FROM other_session;",
  });

  const getallotment = await query({
    query:
      "SELECT a.allotment_id,a.semester_id, semester.semester_name, session.session_name, a.session_id, a.branch_id, a.subject_id,a.subject_code, a.faculty_email, a.faculty_name, a.slot_id, a.room_id, r.room_name, t.day, t.slot_start_time, t.slot_end_time  FROM allotment a LEFT JOIN timeslot t ON a.slot_id = t.slot_id LEFT JOIN room r ON a.room_id = r.room_id LEFT JOIN session ON a.session_id= session.session_id LEFT JOIN semester ON semester.semester_id=a.semester_id ORDER BY a.allotment_id DESC;",
  });
  const getdaytime = await query({
    query:
      "SELECT t.day, t.slot_id, t.slot_start_time, t.slot_end_time  FROM timeslot t JOIN allotment a ON t.slot_id = a.slot_id",
  });

  const combinedResult = {
    session: getsession,
    department: getdepartment,
    branch: getbranch,
    semester: getsemester,
    room: getroom,
    subject: getsubject,
    faculty: getfaculty,
    timeslot: gettimeslot,
    allotment: getallotment,
    daytime: getdaytime,
    other_session: get_other_session,
    elective_course: getelectivecourse,
    student: getstudent,
  };

  // Convert the combined result object to JSON
  const data = JSON.stringify(combinedResult);

  return new Response(data, {
    status: 200,
  });
}
