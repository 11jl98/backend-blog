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

    async findByIds(id_followers:string, id_user: string) {
      const data = this.#database.table(this.#table)
      .select('id')
      .where('id_user', '=', id_user)
      .where('id_followers', '=', id_followers)
      .first()
      return await data
    }

    async destroy (id_followers: string, id_user:string) {
      await this.#database.table(this.#table)
        .delete()
        .where('id_followers', '=', id_followers)
        .andWhere('id_user', '=', id_user)
    }
}
export { FollowersRepo }