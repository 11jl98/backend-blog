import { Knex } from 'knex'
import { RepositoryBase } from './RepositoryBase'
import { FollowingEntity } from '../entities/FollowingEntity'

class FollowingRepo extends RepositoryBase<FollowingEntity>{
    #database: Knex
    #table: string

    constructor ({ database }: any ) {
      super('following', database)
      this.#table = 'following'
      this.#database = database
    }

    async countFollowingPerUser (id_user) {
        const data = this.#database.table(this.#table)
          .where('id_user', '=', id_user)
          .count('id as total')
          .first()
        return await data
        
      }
}
export { FollowingRepo }