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

    async destroy(id_followers: string, id_user: string){
        return await this.#followersRepo.destroy(id_followers, id_user)
         
    }

    async countFollowersPerUser(id_user: string){
        const follower = await this.#followersRepo.countFollowersPerUser(id_user)
        return follower
    }

    async findById(id_followers: string, id_user: string ){
        const follower = await this.#followersRepo.findByIds(id_followers, id_user)
        return follower?.id
    }
}


export {FollowersService}