import { Knex } from 'knex'
import { RepositoryBase } from './RepositoryBase'
import { CommentsEntity } from '../entities/CommentsEntity'

class CommentsRepo extends RepositoryBase<CommentsEntity>{
    #database: Knex
    #table: string

    constructor ({ database }: any ) {
      super('comments', database)
      this.#table = 'comments'
      this.#database = database
    }

    async GetComments (){
        const data = this.#database.table(this.#table)
          .select(['id','id_user', 'id_comments_ref', 'description'])
        return await data
      }

}
export { CommentsRepo }