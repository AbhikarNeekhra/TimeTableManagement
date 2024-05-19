import { query } from "@/lib/db";
// import { all } from "axios";



export async function GET(request) {
    const allotmentResult = await query({
        query: "SELECT * FROM allotment ORDER BY allotment_id DESC",
        values: [],
    });

    const seeroom = await query({
        query: "SELECT * FROM room ORDER BY room_id",
        values: [],
    });

    const seefaculty = await query({
        query: "SELECT * FROM faculty ORDER BY designation",
        values: [],
    });
    const slotdetails = await query({
        query: "SELECT * FROM timeslot ORDER BY slot_id",
        values: [],
    });
    // let slotdata = JSON.stringify(slotdetails);


    let data = JSON.stringify(allotmentResult);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {

    try {
        const { allotment_id, session_id, branch_id,subject_id,faculty_email, room_id,slot_id,faculty_name,subject_code, semester_id } = await request.json();
        const updateUsers = await query({
            query: "INSERT INTO allotment (session_id, branch_id,subject_id,faculty_email, room_id,slot_id,faculty_name,subject_code,semester_id) VALUES (?,?,?,?,?,?,?,?,?)",
            values: [session_id, branch_id,subject_id,faculty_email, room_id,slot_id,faculty_name,subject_code,semester_id],
        });
        const result = updateUsers.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            allotment_id: allotment_id,

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
        const { allotment_id, session_id, branch_id,subject_id,faculty_email, room_id,slot_id,faculty_name,subject_code,semester_id } = await request.json();
        const updateProducts = await query({
            query: "UPDATE allotment SET session_id = ?,branch_id = ?,subject_id = ?,faculty_email = ?, room_id = ?, slot_id= ?, faculty_name=?,subject_code=?,semester_id=? WHERE allotment_id = ?",
            values: [session_id, branch_id,subject_id,faculty_email, room_id,slot_id,faculty_name ,subject_code,semester_id, allotment_id],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            allotment_id: allotment_id,
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


export async function DELETE(request) {

    try {
        const { allotment_id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM allotment WHERE allotment_id = ? ",
            values: [allotment_id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            allotment_id: allotment_id,
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
