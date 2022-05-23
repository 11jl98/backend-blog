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
}
export { UserRepo }