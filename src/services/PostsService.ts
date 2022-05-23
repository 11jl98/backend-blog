import { PostsRepo } from "../repositories/PostsRepository"
import { PostsEntity } from "../entities/PostsEntity"

export class PostsService{
    #postsRepo: PostsRepo

    constructor({ postsRepo }){
        this.#postsRepo = postsRepo
    }
    async save(body : PostsEntity){
        const post = new PostsEntity({...body})
        await this.#postsRepo.save(post)
        return post.id
    }

    async update(body : PostsEntity, id: string){
        const post = new PostsEntity({...body}, id)
        await this.#postsRepo.update(post, id)
        return post.id
    }
    async getPosts(){
        const posts = await this.#postsRepo.getPosts()
        return posts
    }
}