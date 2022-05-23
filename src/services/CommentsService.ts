import { CommentsEntity } from '../entities/CommentsEntity'
import { CommentsRepo } from '../repositories/CommentsRepository'


class CommentsService{
    #commentsRepo: CommentsRepo
    constructor({commentsRepo}){

        this.#commentsRepo = commentsRepo
    }

    async save(body : CommentsEntity){
        const user = new CommentsEntity({...body})
        await this.#commentsRepo.save(user)
        return user.id
    }

    async update(body : CommentsEntity, id: string){
        const user = new CommentsEntity({...body}, id)
        await this.#commentsRepo.update(user, id)
        return user.id
    }

    async findByComments(){
        const user = await this.#commentsRepo.GetComments()
        return user
    }
}

export {CommentsService}