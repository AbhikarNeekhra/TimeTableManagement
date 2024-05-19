// pages/api/student.js
import { query } from "@/lib/db";
export async function GET(request) {
  try {
    const getStudents = await query({
      query: "SELECT * FROM student",
      values: [],
    });
    let data = JSON.stringify(getStudents);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching student data:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

export async function POST(request) {
  try {
    const {
      student_name,
      student_email,
      student_enrollment,
      student_branch,
      semester,
    } = await request.json();
    const addStudent = await query({
      query:
        "INSERT INTO student (student_name, student_email, student_enrollment, student_branch, semester) VALUES (?, ?, ?, ?,?)",
      values: [
        student_name,
        student_email,
        student_enrollment,
        student_branch,
        semester,
      ],
    });
    const result = addStudent.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const student = {
      student_name: student_name,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        student: student,
      })
    );
  } catch (error) {
    console.error("Error adding student:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

export async function PUT(request) {
  try {
    const {
      student_name,
      student_email,
      student_enrollment,
      student_branch,
      semester,
    } = await request.json();
    const updateStudent = await query({
      query:
        "UPDATE student SET student_name = ?, student_enrollment = ?, student_branch = ?, semester = ? WHERE student_email = ?",
      values: [
        student_name,
        student_enrollment,
        student_branch,
        semester,
        student_email,
      ],
    });
    const result = updateStudent.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const student = {
      student_email: student_email,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        student: student,
      })
    );
  } catch (error) {
    console.error("Error updating student:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

export async function DELETE(request) {
  try {
    const { student_email } = await request.json();
    const deleteStudent = await query({
      query: "DELETE FROM student WHERE student_email = ?",
      values: [student_email],
    });
    const result = deleteStudent.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }
    const student = {
      student_email: student_email,
    };
    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        student: student,
      })
    );
  } catch (error) {
    console.error("Error deleting student:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}
