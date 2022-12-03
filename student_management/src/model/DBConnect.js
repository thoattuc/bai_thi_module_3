/* Connect database */
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin95",
    database: "students_management",
    port: 3306
});

// export module DBConnect
module.exports = connection;