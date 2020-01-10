
const path = require('path');
module.exports = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        database: 'twitter',
        user: 'root',
        password: ''
    },

    migrations: {
        tableName: 'migrations',
        directory: path.resolve(__dirname, './migrations'),
    },
    userNullAsDefault: true

};