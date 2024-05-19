// semester_id , semester_name
import { query } from "@/lib/db";

export async function GET(request) {

  const getsemester = await query({
      query: "SELECT * FROM semester ORDER BY semester_id",
      values: [],
  });

  let data = JSON.stringify(getsemester);
  return new Response(data, {
      status: 200,
  });
}


export async function POST(request) {

    try {
        const { semester_id,semester_name } = await request.json();
        const addsemester = await query({
            query: "INSERT INTO semester ( semester_name ) VALUES (?)",
            values: [ semester_name ],
        });
        const result = addsemester.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            semester_id: semester_id,
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
        const { semester_id , semester_name  } = await request.json();
        const updatesemester = await query({
            query: "UPDATE semester SET semester_name = ?  WHERE semester_id = ?",
            values: [semester_name,semester_id ],
        });
        const result = updatesemester.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            semester_id: semester_id,
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
        const { semester_id } = await request.json();
        const deletesemester = await query({
            query: "DELETE FROM semester WHERE semester_id =? ",
            values: [semester_id],
        });
        const result = deletesemester.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            semester_id: semester_id,
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

