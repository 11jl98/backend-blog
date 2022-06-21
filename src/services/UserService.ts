import { UserEntity } from '../entities/UserEntity'
import { UserRepo } from '../repositories/UserRepository'


class UserService{
    #userRepo: UserRepo
    constructor({userRepo}){

        this.#userRepo = userRepo
    }

    async save(body : UserEntity){
        const user = new UserEntity({...body})
        await this.#userRepo.save(user)
        return user.id
    }

    async update(body : UserEntity, id: string){
        const user = new UserEntity({...body}, id)
        await this.#userRepo.update(user, id)
        return user.id
    }

    async findByEmailAndPassword(email : string, password: string){
        const user = await this.#userRepo.findByEmailAndPassword(email, password)
        return user
    }
    async findById(id: string){
        const user = await this.#userRepo.findById(id)
        return user
    }
    async getUserSearch(queryParams: string, id_user: string){
        const users = await this.#userRepo.getUsersSearch(queryParams, id_user)
        return users
    }
}

export {UserService}