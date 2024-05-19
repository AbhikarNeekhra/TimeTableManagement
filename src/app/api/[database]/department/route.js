// department_id , department_name ,session_id
import { query } from "@/lib/db";

export async function GET(request) {

  const getdepartment = await query({
      query: "SELECT * FROM department ORDER BY department_id",
      values: [],
  });

  let data = JSON.stringify(getdepartment);
  return new Response(data, {
      status: 200,
  });
}


export async function POST(request) {

    try {
        const { department_id , department_name } = await request.json();
        const adddepartment = await query({
            query: "INSERT INTO department (department_id , department_name ) VALUES (?,?)",
            values: [department_id , department_name ],
        });
        const result = adddepartment.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            department_id: department_id,
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
        const { department_id , department_name  } = await request.json();
        const updatedepartment = await query({
            query: "UPDATE department SET department_id = ?, department_name = ?  WHERE department_id = ?",
            values: [department_id , department_name ,department_id],
        });
        const result = updatedepartment.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            department_id: department_id,
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
        const { department_id } = await request.json();
        const deletedepartment = await query({
            query: "DELETE FROM department WHERE department_id =? ",
            values: [department_id],
        });
        const result = deletedepartment.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            department_id: department_id,
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

