import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

   return knex.schema.createTable('following', (table)=>{
    table.uuid('id').primary()
    table.uuid('id_user').references('id').inTable('users')
    table.uuid('id_following').references('id').inTable('users')
    table.dateTime('date').notNullable()
})
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('following')
}

