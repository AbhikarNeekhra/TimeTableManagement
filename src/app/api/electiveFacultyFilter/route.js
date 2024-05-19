// elective_course_id,session_id, department_id, subject_id, faculty_email,room_id
import { query } from "@/lib/db";

export async function GET(request) {
    const getfilterdelectivefaculty = await query({
        query: "SELECT DISTINCT faculty.* FROM faculty LEFT JOIN elective_course ON faculty.faculty_email = elective_course.faculty_email WHERE elective_course.faculty_email IS NULL ORDER BY faculty.faculty_email;",
        values: [],
    });

    let data = JSON.stringify(getfilterdelectivefaculty);
    console.log("data", data)
    return new Response(data, {
        status: 200,
    });
}