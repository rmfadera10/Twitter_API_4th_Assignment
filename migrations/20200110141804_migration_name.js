exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('userId');
        table.string('Username').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('filename').notNullable();
        table.string('bio').notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
