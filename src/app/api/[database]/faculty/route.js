// faculty_email, faculty_name ,department_id, designation
import { query } from "@/lib/db";

export async function GET(request) {

    const getfaculty = await query({
        query: "SELECT * FROM faculty ORDER BY faculty_name",
        values: [],
    });

    let data = JSON.stringify(getfaculty);
    return new Response(data, {
        status: 200,
    });
}


export async function POST(request) {

    try {
        const { faculty_email, faculty_name, department_id, designation } = await request.json();
        const addfaculty = await query({
            query: "INSERT INTO faculty (faculty_email , faculty_name ,department_id,  designation) VALUES (?,?,?,?)",
            values: [faculty_email, faculty_name, department_id, designation],
        });
        const result = addfaculty.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            faculty_email: faculty_email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            error: error.message,
            // data: request
        }));
    }
}



export async function PUT(request) {

    try {
        const { faculty_email, faculty_name, department_id, designation } = await request.json();
        const updatefaculty = await query({
            query: "UPDATE faculty SET faculty_email = ?, faculty_name = ?, department_id = ?,  designation=?  WHERE faculty_email = ?",
            values: [faculty_name, department_id, designation, faculty_email],
        });
        const result = updatefaculty.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            faculty_email: faculty_email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            error: error.message,
            data: res
        }));
    }

}


export async function DELETE(request) {

    try {
        const { faculty_email } = await request.json();
        const deletefaculty = await query({
            query: "DELETE FROM faculty WHERE faculty_email =? ",
            values: [faculty_email],
        });
        const result = deletefaculty.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            faculty_email: faculty_email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            error: error.message,
            // data: res
        }));
    }

}

