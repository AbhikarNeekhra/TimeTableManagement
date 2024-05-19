import { query } from "@/lib/db";

export async function GET(request) {
  try {
    const getFeedback = await query({
      query: "SELECT * FROM feedback ORDER BY feedback_id",
      values: [],
    });

    let data = JSON.stringify(getFeedback);
    return new Response(data, {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

export async function POST(request) {
  try {
    const { feedback_text, feedback_email, feedback_subject, role } =
      await request.json();
    const addFeedback = await query({
      query:
        "INSERT INTO feedback (feedback_text, feedback_email, feedback_subject, role) VALUES (?, ?, ?, ?)",
      values: [feedback_text, feedback_email, feedback_subject, role],
    });

    const result = addFeedback.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }

    const feedback = {
      feedback_text: feedback_text,
      feedback_email: feedback_email,
      feedback_subject: feedback_subject,
      role: role,
    };

    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        feedback: feedback,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

export async function PUT(request) {
  try {
    const {
      feedback_id,
      feedback_text,
      feedback_email,
      feedback_subject,
      role,
    } = await request.json();
    const updateFeedback = await query({
      query:
        "UPDATE feedback SET feedback_text = ?, feedback_email = ?, feedback_subject = ?, role = ? WHERE feedback_id = ?",
      values: [
        feedback_text,
        feedback_email,
        feedback_subject,
        role,
        feedback_id,
      ],
    });

    const result = updateFeedback.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }

    const feedback = {
      feedback_id: feedback_id,
      feedback_text: feedback_text,
      feedback_email: feedback_email,
      feedback_subject: feedback_subject,
      role: role,
    };

    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        feedback: feedback,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}

export async function DELETE(request) {
  try {
    const { feedback_id } = await request.json();
    const deleteFeedback = await query({
      query: "DELETE FROM feedback WHERE feedback_id = ?",
      values: [feedback_id],
    });

    const result = deleteFeedback.affectedRows;
    let message = "";
    if (result) {
      message = "success";
    } else {
      message = "error";
    }

    const feedback = {
      feedback_id: feedback_id,
    };

    return new Response(
      JSON.stringify({
        message: message,
        status: 200,
        feedback: feedback,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 500,
        error: error.message,
      })
    );
  }
}
