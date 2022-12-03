CREATE DATABASE `students_management`;

use `students_management`;

CREATE TABLE class (
	class_id INT NOT NULL PRIMARY KEY,
    class_name NVARCHAR(25) NOT NULL
);


CREATE TABLE students (
	student_id INT NOT NULL PRIMARY KEY,
    student_name NVARCHAR(50) NOT NULL,
    class_id INT,
    th_point INT,
    pr_point INT,
    describes LONGTEXT,
    evaluate NVARCHAR(50)
);