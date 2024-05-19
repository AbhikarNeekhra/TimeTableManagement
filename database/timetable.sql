-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2024 at 10:48 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timetable`
--

-- --------------------------------------------------------

--
-- Table structure for table `allotment`
--

CREATE TABLE `allotment` (
  `allotment_id` int(10) NOT NULL,
  `room_id` int(5) NOT NULL,
  `department_id` varchar(5) NOT NULL,
  `session_id` int(5) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `faculty_email` varchar(50) NOT NULL,
  `start_time` text NOT NULL,
  `end_time` text NOT NULL,
  `branch_id` varchar(5) NOT NULL,
  `day` varchar(10) NOT NULL,
  `slot_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allotment`
--

INSERT INTO `allotment` (`allotment_id`, `room_id`, `department_id`, `session_id`, `subject_id`, `faculty_email`, `start_time`, `end_time`, `branch_id`, `day`, `slot_id`) VALUES
(1, 4, '', 1, 1, 'facultyaiml@gmail.com', '', '', 'AIML', '', 1),
(3, 4, '', 1, 1, 'facultyaiml@gmail.com', '', '', 'AIML', '', 3),
(4, 9, '', 1, 1, 'facultyaiml@gmail.com', '', '', 'AIML', '', 5),
(5, 3, '', 1, 5, 'tej@mitsgwalior.in', '', '', 'AIML', '', 7),
(6, 3, '', 1, 5, 'tej@mitsgwalior.in', '', '', 'AIML', '', 2),
(7, 3, '', 1, 5, 'tej@mitsgwalior.in', '', '', 'AIML', '', 4),
(8, 4, '', 2, 2, 'faculty2@gmail.com', '', '', 'AIML', '', 11),
(9, 4, '', 1, 2, 'faculty2@gmail.com', '', '', 'CSE', '', 5);

-- --------------------------------------------------------

--
-- Table structure for table `authentication`
--

CREATE TABLE `authentication` (
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authentication`
--

INSERT INTO `authentication` (`email`, `password`, `role`) VALUES
('admin@gmail.com', 'adminpass', 'admin'),
('coordinatorcse@gmail.com', 'coordinatorcse', 'coordinator'),
('facultyaiml@gmail.com', 'facultyaiml', 'faculty'),
('facultycse@gmail.com', 'facultycse', 'faculty'),
('studentaiml@gmail.com', 'studentaiml', 'student'),
('studentcse@gmail.com', 'studentcse', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branch_id` varchar(5) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `department_id` varchar(5) NOT NULL,
  `session_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branch_id`, `branch_name`, `department_id`, `session_id`) VALUES
('AIDS', 'Artificial Intelligence and Data Science', 'CAI', 1),
('AIML', 'Artificial Intelligence and Machine Learning', 'CAI', 1),
('AIR', 'Artificial Intelligence and Robotics', 'CAI', 0),
('CSE', 'Computer Science & Engineering', 'CSE', 1),
('CSE-1', 'Computer Science & Engineering-I', 'CSE', 0),
('CSE-2', 'Computer Science & Engineering-II', 'CSE', 0),
('CSE-3', 'Computer Science & Engineering-III', 'CSE', 0);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` varchar(5) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `session_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`, `session_id`) VALUES
('ALL', 'All Department', 0),
('CAI', 'Center For Artificial Intelligence', 1),
('CSE', 'Computer Science & Engineering', 1),
('EEE', 'Electrical and Electronics Engineering', 1),
('IOT', 'Internet Of Things', 1),
('IT', 'Information Technology', 0);

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `faculty_email` varchar(50) NOT NULL,
  `faculty_name` varchar(30) NOT NULL,
  `department_id` varchar(5) NOT NULL,
  `designation` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`faculty_email`, `faculty_name`, `department_id`, `designation`) VALUES
('faculty2@gmail.com', 'Faculty 2', 'CSE', 'Assistant Professor'),
('facultyaiml@gmail.com', 'Bhagat Singh Raghuwanshi', 'CAI', 'Assistant Professor'),
('facultycse@gmail.com', 'KHUSHBOO AGARWAL', 'CSE', 'Assistant Professor'),
('tej@mitsgwalior.in', 'Tej Singh', 'CAI', 'Assistant Professor');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `feedback_text` varchar(250) NOT NULL,
  `feedback_email` varchar(50) NOT NULL,
  `feedback_subject` varchar(100) NOT NULL,
  `session_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `moderator`
--

CREATE TABLE `moderator` (
  `moderator_email` varchar(50) NOT NULL,
  `moderator_name` varchar(50) NOT NULL,
  `session_id` int(3) NOT NULL,
  `moderator_id` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `moderator`
--

INSERT INTO `moderator` (`moderator_email`, `moderator_name`, `session_id`, `moderator_id`) VALUES
('admin@gmail.com', 'Atul Chauhan', 1, 1),
('coordinatorcse@gmail.com', 'RAJNI RANJAN SINGH MAKWANA', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(5) NOT NULL,
  `room_name` varchar(100) NOT NULL,
  `room_type` varchar(30) NOT NULL,
  `room_capacity` int(5) NOT NULL,
  `department_id` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `room_name`, `room_type`, `room_capacity`, `department_id`) VALUES
(1, '101', 'Regular', 60, 'CSE'),
(2, '102', 'Regular', 50, 'CSE'),
(3, 'SH1', 'Seminar Hall', 90, 'CSE'),
(4, 'M102', 'Regular', 60, 'CAI'),
(5, 'Computing Lab', 'Lab', 30, 'CSE'),
(6, 'Computing Lab -2', 'LAB', 40, 'CAI'),
(7, 'Conference Room A', 'Meeting', 20, 'CSE'),
(8, 'Conference Room B', 'Meeting', 20, 'CAI'),
(9, 'M301', 'Regular', 60, 'CAI'),
(12, 'SH20', 'Seminar Hall', 90, 'CSE'),
(13, 'SH21', 'Seminar Hall', 50, 'CAI'),
(14, 'SH21', 'Seminar Hall', 50, 'CAI'),
(15, 'M301', 'Regular', 60, 'CAI'),
(16, 'M305', 'Regular', 60, 'CAI'),
(20, '105', 'Regular', 40, 'EEE'),
(22, 'IOT LAB', 'LAB', 35, 'IOT');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `session_id` int(3) NOT NULL,
  `session_name` varchar(50) NOT NULL,
  `session_year` int(4) NOT NULL,
  `active_session` tinyint(1) NOT NULL,
  `day_start_time` time NOT NULL,
  `day_end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`session_id`, `session_name`, `session_year`, `active_session`, `day_start_time`, `day_end_time`) VALUES
(0, 'JUL-DEC 2023', 2023, 0, '09:00:00', '18:00:00'),
(1, 'JAN-JUN 2024', 2024, 1, '10:00:00', '18:00:00'),
(2, 'JUL-DEC 2024', 2024, 0, '09:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_email` varchar(50) NOT NULL,
  `student_enrollment` varchar(15) NOT NULL,
  `student_branch` varchar(5) NOT NULL,
  `student_name` varchar(30) NOT NULL,
  `session_id` int(3) NOT NULL,
  `batch` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_email`, `student_enrollment`, `student_branch`, `student_name`, `session_id`, `batch`) VALUES
('studentaiml@gmail.com', '0901AM211001', 'AIML', 'Aashutosh Savita', 1, 'Batch A'),
('studentcse@gmail.com', '0901CS211001', 'CSE', 'AADITYA TIWARI', 1, 'Batch B');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject_id` int(10) NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `department_id` varchar(5) NOT NULL,
  `subject_type` varchar(10) NOT NULL,
  `branch_id` varchar(5) NOT NULL,
  `subject_code` int(10) NOT NULL,
  `batch` varchar(30) NOT NULL,
  `session_id` int(3) NOT NULL,
  `subject_orientation` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_id`, `subject_name`, `department_id`, `subject_type`, `branch_id`, `subject_code`, `batch`, `session_id`, `subject_orientation`) VALUES
(1, 'Deep Learning', 'CAI', 'THEORY', 'AIDS', 270603, 'FULL BRANCH', 1, 'REGULAR'),
(2, 'Deep Learning', 'CAI', 'THEORY', 'AIML', 280603, 'FULL BRANCH', 1, 'REGULAR'),
(4, 'Deep Learning', 'CAI', 'PRACTICAL', 'AIML', 280603, 'A', 1, 'REGULAR'),
(5, 'Deep Learning', 'CAI', 'PRACTICAL', 'AIML', 280603, 'B', 1, 'REGULAR'),
(6, 'Network Security', 'CSE', 'THEORY', 'CSE-1', 250601, 'FULL BRANCH', 1, 'REGULAR'),
(7, 'Network Security', 'CSE', 'THEORY', 'CSE-2', 250601, 'FULL BRANCH', 1, 'REGULAR'),
(8, 'Network Security', 'CSE', 'THEORY', 'CSE-3', 250601, 'FULL BRANCH', 1, 'REGULAR'),
(9, 'Network Security', 'CSE', 'PRACTICAL', 'CSE-1', 250601, 'A', 1, 'REGULAR'),
(10, 'Network Security', 'CSE', 'PRACTICAL', 'CSE-1', 250601, 'B', 1, 'REGULAR'),
(11, 'Network Security', 'CSE', 'PRACTICAL', 'CSE-2', 250601, 'A', 1, 'REGULAR'),
(12, 'Network Security', 'CSE', 'PRACTICAL', 'CSE-2', 250601, 'B', 1, 'REGULAR'),
(14, 'Network Security', 'CSE', 'PRACTICAL', 'CSE-2', 250601, 'C', 1, 'REGULAR'),
(15, 'Network Security', 'CSE', 'PRACTICAL', 'CSE-3', 250601, 'A', 1, 'REGULAR'),
(16, 'Network Security', 'CSE', 'PRACTICAL', 'CSE-3', 250601, 'B', 1, 'REGULAR');

-- --------------------------------------------------------

--
-- Table structure for table `timeslot`
--

CREATE TABLE `timeslot` (
  `slot_id` int(10) NOT NULL,
  `slot_start_time` time NOT NULL,
  `slot_end_time` time NOT NULL,
  `duration` varchar(20) NOT NULL,
  `day` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timeslot`
--

INSERT INTO `timeslot` (`slot_id`, `slot_start_time`, `slot_end_time`, `duration`, `day`) VALUES
(1, '09:00:00', '10:00:00', '01:00:00', 'MONDAY'),
(2, '09:00:00', '10:00:00', '01:00:00', 'TUESDAY'),
(3, '09:00:00', '10:00:00', '01:00:00', 'WEDNESDAY'),
(4, '09:00:00', '10:00:00', '01:00:00', 'THURSDAY'),
(5, '09:00:00', '10:00:00', '01:00:00', 'FRIDAY'),
(6, '09:00:00', '10:00:00', '01:00:00', 'SATURDAY'),
(7, '10:00:00', '11:00:00', '01:00:00', 'MONDAY'),
(8, '10:00:00', '11:00:00', '01:00:00', 'TUESDAY'),
(9, '10:00:00', '11:00:00', '01:00:00', 'WEDNESDAY'),
(10, '10:00:00', '11:00:00', '01:00:00', 'THURSDAY'),
(11, '10:00:00', '11:00:00', '01:00:00', 'FRIDAY'),
(12, '10:00:00', '11:00:00', '01:00:00', 'SATURDAY'),
(13, '10:00:00', '12:00:00', '02:00:00', 'MONDAY'),
(14, '10:00:00', '12:00:00', '02:00:00', 'TUESDAY'),
(15, '10:00:00', '12:00:00', '02:00:00', 'WEDNESDAY'),
(16, '12:00:00', '13:00:00', '01:00:00', 'MONDAY'),
(17, '12:00:00', '13:00:00', '01:00:00', 'TUESDAY'),
(18, '12:00:00', '13:00:00', '01:00:00', 'WEDNESDAY'),
(19, '12:00:00', '13:00:00', '01:00:00', 'THURSDAY'),
(20, '14:00:00', '15:00:00', '01:00:00', 'MONDAY');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allotment`
--
ALTER TABLE `allotment`
  ADD PRIMARY KEY (`allotment_id`);

--
-- Indexes for table `authentication`
--
ALTER TABLE `authentication`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`faculty_email`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `moderator`
--
ALTER TABLE `moderator`
  ADD PRIMARY KEY (`moderator_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `moderator_email` (`moderator_email`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_email`),
  ADD UNIQUE KEY `student_enrollment` (`student_enrollment`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `student_branch` (`student_branch`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_id`) USING BTREE,
  ADD KEY `department_id` (`department_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`slot_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allotment`
--
ALTER TABLE `allotment`
  MODIFY `allotment_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `moderator`
--
ALTER TABLE `moderator`
  MODIFY `moderator_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `session_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `subject_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `slot_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  ADD CONSTRAINT `branch_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);

--
-- Constraints for table `moderator`
--
ALTER TABLE `moderator`
  ADD CONSTRAINT `moderator_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`),
  ADD CONSTRAINT `moderator_ibfk_2` FOREIGN KEY (`moderator_email`) REFERENCES `authentication` (`email`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`),
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`student_email`) REFERENCES `authentication` (`email`),
  ADD CONSTRAINT `student_ibfk_3` FOREIGN KEY (`student_branch`) REFERENCES `branch` (`branch_id`);

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  ADD CONSTRAINT `subject_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`),
  ADD CONSTRAINT `subject_ibfk_3` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
