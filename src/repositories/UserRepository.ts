import { Knex } from 'knex'
import { RepositoryBase } from './RepositoryBase'
import { UserEntity } from '../entities/UserEntity'

class UserRepo extends RepositoryBase<UserEntity>{
    #database: Knex
    #table: string

    constructor ({ database }: any ) {
      super('users', database)
      this.#table = 'users'
      this.#database = database
    }

    async findByEmailAndPassword (email: string, password: string) {
      const data = this.#database.table(this.#table)
        .select('*')
        .where('email', '=', email)
        .first()
      return await data
    }
    async getUsersSearch(queryParams: string, id_user: string){
      const data = this.#database.table(this.#table)
        .select(['name_user', 'avatar_url', 'users.id'])
        .where('name_user', 'like', `%${queryParams}%`)
        .andWhere('users.id', '<>', id_user)

      return await data
    }
}
export { UserRepo }