// branch_id , branch_name ,department_id, session_id
import { query } from "@/lib/db";

export async function GET(request) {

  const getbranch = await query({
      query: "SELECT * FROM branch ORDER BY branch_id",
      values: [],
  });

  let data = JSON.stringify(getbranch);
  return new Response(data, {
      status: 200,
  });
}

export async function POST(request) {

    try {
        const { branch_id , branch_name ,department_id } = await request.json();
        const addbranch = await query({
            query: "INSERT INTO branch (branch_id ,branch_name,department_id) VALUES (?,?,?)",
            values: [branch_id,branch_name,department_id],
        });
        const result = addbranch.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            branch_id: branch_id,
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
        const { branch_id , branch_name ,department_id } = await request.json();
        const updatebranch = await query({
            query: "UPDATE branch SET branch_id = ?, branch_name = ?, department_id = ?  WHERE branch_id = ?",
            values: [branch_id , branch_name ,department_id,branch_id],
        });
        const result = updatebranch.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            branch_id: branch_id,
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
        const { branch_id } = await request.json();
        const deletebranch = await query({
            query: "DELETE FROM branch WHERE branch_id =? ",
            values: [branch_id],
        });
        const result = deletebranch.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            branch_id: branch_id,
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

