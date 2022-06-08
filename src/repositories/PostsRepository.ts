import { Knex } from "knex"
import { RepositoryBase } from "./RepositoryBase"
import { PostsEntity } from "../entities/PostsEntity"

export class PostsRepo extends RepositoryBase<PostsEntity>{
    #database: Knex
    #table: string
    constructor({ database }){
        super('posts', database)
        this.#database = database
        this.#table = 'posts'
    }

    async getPosts(){
        const data = this.#database.table(this.#table)
        .select([`${this.#table}.id`, 'title',`${this.#table}.description`, 'url_file', 'users.avatar_url', 'users.name_user'])
        .leftJoin('users', 'users.id', '=', `${this.#table}.id_user`)
        return await data
    }

    async getPostsUserAll(id_user: string){
        const data = this.#database.table(this.#table)
        .select('id','url_file')
        .where('id_user', '=', id_user)
        return await data
    }

    async countPostsUser(id_user: string){
        const data = this.#database.table(this.#table)
        .where('id_user', '=', id_user)
        .count('id as total')
        .first()
        return await data
    }

}