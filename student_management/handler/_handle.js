const fs = require('fs');

// create object handle filePath:
const _handle = {};

_handle.getTempPath = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err.message);
            }
            resolve(data)
        });
    });
}

module.exports = _handle;