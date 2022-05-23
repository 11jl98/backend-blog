require('dotenv/config')

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: process.env.PASSWORD_BD,
      database: 'app'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
