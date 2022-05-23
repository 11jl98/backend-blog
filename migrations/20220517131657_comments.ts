import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('comments', (table)=>{
        table.uuid('id').primary()
        table.uuid('id_user').references('id').inTable('users')
        table.uuid('id_post').references('id').inTable('posts')
        table.string('id_comments_ref').references('id').inTable('comments')
        table.string('description').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('comments')
}

