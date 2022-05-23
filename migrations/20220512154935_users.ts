import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table)=>{
        table.uuid('id').primary()
        table.string('email').notNullable().unique()
        table.string('name_user').notNullable().unique()
        table.string('password')
        table.string('avatar_url')
        table.string('description')
        table.enum('rule', ['admin', 'normal']).notNullable().defaultTo('normal')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

