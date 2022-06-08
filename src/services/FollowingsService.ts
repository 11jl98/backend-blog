import { FollowingEntity } from '../entities/FollowingEntity'
import { FollowingRepo } from '../repositories/FollowingsRepository'


class FollowingService{
    #followingRepo: FollowingRepo
    constructor({followingRepo}){

        this.#followingRepo = followingRepo
    }

    async save(body : FollowingEntity){
        const following = new FollowingEntity({...body})
        await this.#followingRepo.save(following)
        return following.id
    }

    async update(body : FollowingEntity, id: string){
        const following = new FollowingEntity({...body}, id)
        await this.#followingRepo.update(following, id)
        return following.id
    }

    async countFollowingsPerUser(id_user: string){
        const following = await this.#followingRepo.countFollowingPerUser(id_user)
        return following
    }
}

export {FollowingService}