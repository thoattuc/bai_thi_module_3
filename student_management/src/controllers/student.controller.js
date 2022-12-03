/* Student management */
const BaseController = require('./base.controller');
const qs = require('qs');
const url = require('url');
const _handle = require("../../handler/_handle");

class StudentController extends BaseController {
    // Show:
    async showStudents(req, res) {
        let dataHTML = await BaseController.getTemplate("./views/students.html");
        const sqlShowStudents = `SELECT * FROM students INNER JOIN class ON students.class_id = class.class_id;`;
        let students = await BaseController.querySQL(sqlShowStudents);
        // console.log(students);
        let html = "";
        students.forEach((student, index) => {
            html += "<tr>";
            html += `<td>${index + 1}</td>`;
            html += `<td><a class="text-dark" href="/profile?id=${student.student_id}">${student.student_name}</a></td>`;
            html += `<td>${student.class_name}</td>`;
            html += `<td>${student.evaluate}</td>`;
            html += `<td class="text-center"><a class="btn btn-info bg-info" href="/editStudent?id=${student.student_id}">Sửa</a></td>`;
            html += `<td class="text-center"><a class="btn btn-info bg-danger" href="/deleteStudent?id=${student.student_id}">Xóa</a></td>`;
            html += "</tr>";
        });
        res.writeHead(200, {"Content-type": "text/html"});
        dataHTML = dataHTML.replace("{student-list}", html);
        res.write(dataHTML);
        res.end();
    }

    async showProfile(req, res, urlParse) {
        let idProfile = qs.parse(urlParse.query).id;
        console.log(idProfile);
        let profileHTML = await BaseController.getTemplate("./views/form/profile.html");
        res.writeHead(200, {"Content-Type": "text/html"});
        let sqlShowProfile = `SELECT * FROM students INNER JOIN class ON students.class_id = class.class_id
                                WHERE students.student_id = ${idProfile};`;
        let profile = await BaseController.querySQL(sqlShowProfile);
        console.log(profile);
        profileHTML = profileHTML.replace("{student-name}", profile[0].student_name);
        profileHTML = profileHTML.replace("{student-name}", profile[0].student_name);
        profileHTML = profileHTML.replace("{class-name}", profile[0].class_name);
        profileHTML = profileHTML.replace("{evaluate}", profile[0].evaluate);
        profileHTML = profileHTML.replace("{th-point}", profile[0].th_point);
        profileHTML = profileHTML.replace("{pr-point}", profile[0].pr_point);
        profileHTML = profileHTML.replace("{describes}", profile[0].describes);
        res.write(profileHTML);
        res.end();
    }

    // Add:
    async showAddStudent(req, res) {
        const sqlShowAdd = `SELECT * FROM class;`;
        let studentClass = await BaseController.querySQL(sqlShowAdd);
        console.log(studentClass);
        let html = "";
        studentClass.forEach((value, index) => {
            html += `<option value="${value.class_id}">${value.class_name}</option>`;
        });
        let addHTML = await BaseController.getTemplate("./views/form/addStudent.html");
        res.writeHead(200, {"Content-Type": "text/html"});
        addHTML = addHTML.replace('{class-name}', html);
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(addHTML);
        res.end();
    }


    async addStudent(req, res) {
        let data = "";
        req.on("data", chunk => {
            data += chunk;
        });
        res.on("end", async () => {
            let dataStudentParse = qs.parse(data);
            console.log(dataStudentParse);
            let sqlAddStudent = `INSERT INTO students (student_name, class_id, th_point, pr_point, describes, evaluate) VALUES ("${dataStudentParse.name}", ${dataStudentParse.class}, ${dataStudentParse.th_point}, ${dataStudentParse.pr_point}, "${dataStudentParse.describes}", "${dataStudentParse.evaluated}");`;
            let result = await BaseController.querySQL(sqlAddStudent);
            console.log(result);
            res.writeHead(200, {Location: "/"})
        });
    }

    // Delete:
    async showDeleteStudent(req, res) {
        let deleteHTML = await BaseController.getTemplate("./views/form/deleteStudent.html");
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(deleteHTML);
        res.end();
    }

    async deleteStudent(req, res, urlParse) {
        let idDelete = qs.parse(urlParse.query).id;
        const sqlDelete = `DELETE FROM students WHERE student_id = ${idDelete}`;
        await BaseController.querySQL(sqlDelete);
        res.writeHead(301, {Location: "/"});
        res.end();
    }

    // Edit:
    async showEditStudent(req, res, urlParse) {
        let idEdit = qs.parse(urlParse.query).id;
        let editHTML = await BaseController.getTemplate("./views/form/editStudent.html");
        let sqlEdit = `SELECT * FROM students WHERE student_id = ${idEdit};`;
        let student = await BaseController.querySQL(sqlEdit);
        editHTML = editHTML.replace("{student-id}", student[0].student_id);
        res.write(editHTML);
        res.end();
    }

    async editStudent(req, res) {
        let data = "";
        req.on("data", chunk => {
            data += chunk;
        });
        res.on("end", async () => {
            let dataUpdate = qs.parse(data);
            const sqlEdit = `UPDATE students
                            SET student_name = "${data.name}", th_point = ${data.th_point}, pr_point = ${data.pr_point}, evaluate = "${data.evaluated}", describes = "${data.describes}"
                            WHERE  ${idEdit};`;
        });
    }
}


module.exports = StudentController;