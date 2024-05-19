"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import './ProfileViewStudent.css'; // Import your CSS file

// Define the ProfileViewStudent component
const ProfileViewStudent = () => {
  // UseSession hook to get the session data
  const { data: session } = useSession();

  // State to store student information
  const [studentInfo, setStudentInfo] = useState(null);

  // Effect to fetch student information
  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get('/api/database/student');
        setStudentInfo(response.data);
      } catch (error) {
        console.error('Error fetching student information:', error);
      }
    };

    fetchStudentInfo();
  }, []); // Empty dependency array to execute once on component mount

  // Log the studentInfo
  console.log("Student info", studentInfo);

  // Get email from session
  const email = session?.user?.email;
  console.log("email :: ", email);

  // Find student with current email
  const student = studentInfo?.find((student) => student.student_email === email);
  console.log("filter", student);
  return (
    <div className="profile-view-container">
      <h1 className="profile-header">Profile</h1>
      {student && (
        <div className="student-info">
          <div><strong>Name:</strong> {student.student_name}</div>
          <div><strong>Email:</strong> {student.student_email}</div>
          <div><strong>Enrollment No.:</strong> {student.student_enrollment}</div>
          <div><strong>Branch:</strong> {student.student_branch}</div>
        </div>
      )}
    </div>
  );
};

// Export the ProfileViewStudent component
export default ProfileViewStudent;