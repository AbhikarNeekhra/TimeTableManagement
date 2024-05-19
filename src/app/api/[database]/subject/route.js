// subject_id,session_id, subject_name, department_id, subject_type, subject_id, subject_code, batch,  subject_orientation,semester_id
import { query } from "@/lib/db";

export async function GET(request) {

  const getsubject = await query({
      query: "SELECT * FROM subject ORDER BY subject_id DESC",
      values: [],
  });

  let data = JSON.stringify(getsubject);
  return new Response(data, {
      status: 200,
  });
}

export async function POST(request) {

    try {
        const { session_id, subject_id, subject_name, department_id, subject_type,  subject_orientation, branch_id, batch, subject_code,semester_id  } = await request.json();
        const addsubject = await query({
          query:
            "INSERT INTO subject ( session_id, subject_name, department_id, subject_type,  subject_orientation, branch_id, batch, subject_code,semester_id ) VALUES (?,?,?,?,?,?,?,?,?)",
          values: [
            session_id,
            subject_name,
            department_id,
            subject_type,
            subject_orientation,
            branch_id,
            batch,
            subject_code,
            semester_id,
          ],
        });
        const result = addsubject.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            subject_id: subject_id,
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
        const { session_id, subject_id, subject_name, department_id, subject_type,  subject_orientation, branch_id, batch, subject_code,semester_id } = await request.json();
        const updatesubject = await query({
            query: "UPDATE subject SET session_id=?, subject_name = ?, department_id = ?, subject_type =? , subject_orientation=?, branch_id =?, batch=?, subject_code=?,semester_id=? WHERE subject_id = ?",
            values: [ session_id, , subject_name, department_id, subject_type,  subject_orientation, branch_id, batch, subject_code,semester_id, subject_id],
        });
        const result = updatesubject.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            subject_id: subject_id,
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
        const { subject_id } = await request.json();
        const deletesubject = await query({
            query: "DELETE FROM subject WHERE subject_id =? ",
            values: [subject_id],
        });
        const result = deletesubject.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            subject_id: subject_id,
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

