  // elective_course_id,session_id, department_id, subject_id, faculty_email,room_id
import { query } from "@/lib/db";

export async function GET(request) {
  const getelective_course = await query({
    query: "SELECT * FROM elective_course ORDER BY elective_course_id",
    values: [],
  });

  let data = JSON.stringify(getelective_course);
  return new Response(data, {
    status: 200,
  });
}

export async function POST(request) {
  try {
    const { session_id, department_id, subject_id, faculty_email, room_id,subject_code, subject_name, subject_orientation,room_name,faculty_name,session_name } =
      await request.json();
    const addelective_course = await query({
      query:
        "INSERT INTO elective_course ( session_id, department_id, subject_id,  faculty_email, room_id,subject_code, subject_name, subject_orientation,room_name,faculty_name,session_name ) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      values: [
        session_id,
        department_id,
        subject_id,
        faculty_email,
        room_id,
        subject_code,
        subject_name,
        subject_orientation,
        room_name,
        faculty_name,
        session_name,
      ],
    });
    const result = addelective_course.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    // const product = {
    //   elective_course_id: elective_course_id,
    // };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        // product: product,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
        // data: request
      })
    );
  }
}

export async function PUT(request) {
  try {
    const {
      elective_course_id,
      session_id,
      department_id,
      subject_id,
      faculty_email,
      room_id,
      subject_code,
      subject_name,
      subject_orientation,
      room_name,
      faculty_name,
      session_name,
    } = await request.json();
    const updateelective_course = await query({
      query:
        "UPDATE elective_course SET session_id=?, department_id = ?, subject_id =? , faculty_email=?, room_id =?,subject_code=?,subject_name=?,subject_orientation=?,room_name=?,faculty_name=?,session_name=? WHERE elective_course_id = ?",
      values: [
        session_id,
        department_id,
        subject_id,
        faculty_email,
        room_id,
        subject_code,
        subject_name,
        subject_orientation,
        room_name,
        faculty_name,
        session_name,
        elective_course_id,
      ],
    });
    const result = updateelective_course.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const product = {
      elective_course_id: elective_course_id,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        product: product,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
        // data: res
      })
    );
  }
}

export async function DELETE(request) {
  try {
    const { elective_course_id } = await request.json();
    const deleteelective_course = await query({
      query: "DELETE FROM elective_course WHERE elective_course_id =? ",
      values: [elective_course_id],
    });
    const result = deleteelective_course.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const product = {
      elective_course_id: elective_course_id,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        product: product,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
        // data: res
      })
    );
  }
}
