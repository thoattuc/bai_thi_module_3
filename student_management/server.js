const http = require('http');
const PORT = 8080;
const url = require('url');
const qs = require('qs');
const fs = require('fs');
const path = require('path');

const StudentController = require('./src/controllers/student.controller');

const studentController = new StudentController;

const server = http.createServer(((req, res) => {
    const urlParse = url.parse(req.url);

    console.log(urlParse.pathname);
    console.log(req.method + " " + urlParse.pathname);

    switch (urlParse.pathname) {

        case "/" :
            studentController.showStudents(req, res);
            break;

        case "/profile" :
            studentController.showProfile(req, res, urlParse);
            break;

        case "/deleteStudent" :
            studentController.showDeleteStudent(req,res);
            break;

            case "/delete" :
                studentController.deleteStudent(req, res, urlParse);
                break;

        case "/addStudent" :
            if (req.method === "GET") {
                studentController.showAddStudent(req, res);
            } else {
                studentController.addStudent(req, res);
            }
            break;

            case "/editStudent" :
                if (req.method === "GET") {
                    studentController.showEditStudent(req, res, urlParse);
                } else {
                    studentController.editStudent(req, res);
                }
                break;

        default:
            res.end();
    }
}));

server.listen(PORT, 'localhost', () => {
    console.log('Server running on port: ' + PORT);
});