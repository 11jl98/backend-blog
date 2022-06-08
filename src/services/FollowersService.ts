import { FollowersEntity } from '../entities/FollowersEntity'
import { FollowersRepo } from '../repositories/FollowersRepository'


class FollowersService{
    #followersRepo: FollowersRepo
    constructor({followersRepo}){

        this.#followersRepo = followersRepo
    }

    async save(body : FollowersEntity){
        const follower = new FollowersEntity({...body})
        await this.#followersRepo.save(follower)
        return follower.id
    }

    async update(body : FollowersEntity, id: string){
        const follower = new FollowersEntity({...body}, id)
        await this.#followersRepo.update(follower, id)
        return follower.id
    }

    async countFollowersPerUser(id_user: string){
        const follower = await this.#followersRepo.countFollowersPerUser(id_user)
        return follower
    }
}

export {FollowersService}