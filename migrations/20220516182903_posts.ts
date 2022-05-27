import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('posts', (table)=>{
        table.uuid('id').primary()
        table.uuid('id_user').references('id').inTable('users')
        table.string('title').unique()
        table.string('url_file')
        table.string('description').notNullable()
        table.dateTime('date_post').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('posts')
}