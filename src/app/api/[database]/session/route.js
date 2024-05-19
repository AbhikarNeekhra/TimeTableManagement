// session_id, session_name, session_year, active_session, day_start_time, day_end_time
import { query } from "@/lib/db";

export async function GET(request) {

  const getsession = await query({
      query: "SELECT * FROM session ORDER BY session_id DESC",
      values: [],
  });
  

  let data = JSON.stringify(getsession);
  return new Response(data, {
      status: 200,
  });
}


export async function POST(request) {

    try {
        const { session_id, session_name,session_year, active_session, day_start_time, day_end_time } = await request.json();
        const addsession = await query({
            query: "INSERT INTO session (session_name,session_year, active_session, day_start_time, day_end_time) VALUES (?,?,?,?,?)",
            values: [session_name,session_year, active_session, day_start_time, day_end_time],
        });
        const result = addsession.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            session_id: session_id,
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
        const { session_id, session_name,session_year, active_session, day_start_time, day_end_time } = await request.json();
        const updatesession = await query({
            query: "UPDATE session SET session_name = ?,session_year = ?, active_session = ?, day_start_time = ?, day_end_time=? WHERE session_id = ?",
            values: [session_name,session_year, active_session, day_start_time, day_end_time, session_id],
        });
        const result = updatesession.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            session_id: session_id,
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
            data: request
        }));
    }

}


export async function DELETE(request) {

    try {
        const { session_id } = await request.json();
        const deletesession = await query({
            query: "DELETE FROM session WHERE session_id =? ",
            values: [session_id],
        });
        const result = deletesession.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            session_id: session_id,
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

