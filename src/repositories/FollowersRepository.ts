import { Knex } from 'knex'
import { RepositoryBase } from './RepositoryBase'
import { FollowersEntity } from '../entities/FollowersEntity'

class FollowersRepo extends RepositoryBase<FollowersEntity>{
    #database: Knex
    #table: string

    constructor ({ database }: any ) {
      super('followers', database)
      this.#table = 'followers'
      this.#database = database
    }

    async countFollowersPerUser (id_user) {
        const data = this.#database.table(this.#table)
          .where('id_user', '=', id_user)
          .count('id as total')
          .first()
        return await data
        
      }
}
export { FollowersRepo }