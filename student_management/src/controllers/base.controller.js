/* Base controller */
const fs = require('fs');
const connection = require('../model/DBConnect');

class BaseController {
    static getTemplate(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, "utf8", (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    static querySQL(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    };
}

// export module BaseController:
module.exports = BaseController;