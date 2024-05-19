"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const FeedbackForm = () => {
  // State to manage feedback inputs
  const [feedback_subject, setSubject] = useState("");
  const [feedback_text, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { data: session } = useSession();

  // Set email and role when session is available
  useEffect(() => {
    if (session) {
      setEmail(session?.user?.email || "");
      setRole(session?.user?.role || "");
    }
  }, [session]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Category:", feedback_subject);
    console.log("Description:", feedback_text);

    // Send feedback data to the API
    axios
      .post("/api/database/feedback", {
        feedback_text: feedback_text,
        feedback_email: email,
        feedback_subject: feedback_subject,
        role: role,
      })
      .then((response) => {
        console.log(response.data);
        alert("Feedback submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        alert("An error occurred while submitting feedback.");
      });
    // Reset the form after submission
    setSubject("");
    setDescription("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Feedback Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="feedback_subject"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback Subject:
            </label>
            <select
              id="feedback_subject"
              value={feedback_subject}
              onChange={(event) => setSubject(event.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a Subject</option>
              <option value="Bug">Bug</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Time Table">Time Table</option>
              <option value="NEC/OC/DE">NEC/OC/DE</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="feedback_text"
              className="block text-sm font-medium text-gray-700"
            >
              Feedback Description:
            </label>
            <textarea
              id="feedback_text"
              value={feedback_text}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
