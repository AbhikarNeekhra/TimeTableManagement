// slot_id, slot_start_time, slot_end_time, duration, day
import { query } from "@/lib/db";

export async function GET(request) {

  const gettimeslot = await query({
      query: "SELECT * FROM timeslot ORDER BY slot_id DESC",
      values: [],
  });

  let data = JSON.stringify(gettimeslot);
  return new Response(data, {
      status: 200,
  });
}


export async function POST(request) {

    try {
        const { slot_id, slot_start_time, slot_end_time, duration, day } = await request.json();
        const addtimeslot = await query({
            query: "INSERT INTO timeslot (slot_start_time, slot_end_time, duration, day) VALUES (?,?,?,?)",
            values: [slot_start_time, slot_end_time, duration, day],
        });
        const result = addtimeslot.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            slot_id: slot_id,
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
        const {slot_id, slot_start_time, slot_end_time, duration, day } = await request.json();
        const updatetimeslot = await query({
            query: "UPDATE timeslot SET slot_start_time = ?,slot_end_time = ?, duration = ?, day = ? WHERE slot_id = ?",
            values: [slot_start_time, slot_end_time, duration, day, slot_id],
        });
        const result = updatetimeslot.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            slot_id: slot_id,
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
        const { slot_id } = await request.json();
        const deletetimeslot = await query({
            query: "DELETE FROM timeslot WHERE slot_id =? ",
            values: [slot_id],
        });
        const result = deletetimeslot.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            slot_id: slot_id,
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

