import { query } from "@/lib/db";

export async function GET(request) {

  const seeroom = await query({
      query: "SELECT * FROM room ORDER BY room_id DESC",
      values: [],
  });

//   const seefaculty = await query({
//       query: "SELECT * FROM faculty ORDER BY designation",
//       values: [],
//   });

  let data = JSON.stringify(seeroom);
  return new Response(data, {
      status: 200,
  });
}


export async function POST(request) {

    try {
        const { room_id,room_name,room_capacity,room_type,department_id } = await request.json();
        const updateUsers = await query({
            query: "INSERT INTO room (room_name,room_type,room_capacity,department_id) VALUES (?,?,?,?)",
            values: [room_name,room_type,room_capacity,department_id],
        });
        const result = updateUsers.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            room_id: room_id,
   

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
        const { room_id,room_name,room_capacity,room_type,department_id } = await request.json();
        const updateProducts = await query({
            query: "UPDATE allotment SET room_name = ?,room_capacity = ?, room_type = ?, department_id = ? WHERE room_id = ?",
            values: [room_name,room_capacity,room_type,department_id,room_id],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            room_id: room_id,
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
        const { room_id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM room WHERE room_id =? ",
            values: [room_id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            room_id: room_id,
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
