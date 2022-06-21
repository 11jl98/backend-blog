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

    async findById(id: string){
        const post = await this.#postsRepo.findById(id)
        return post
    }

    async getPosts(id_user: string, perPage: string, page: string){
        const posts = await this.#postsRepo.getPosts(id_user, perPage, page)
        return posts
    }

    async getPostsUserAll(id_user: string){
        const posts = await this.#postsRepo.getPostsUserAll(id_user)
        return posts
    }

    async countPostsUser(id_user: string){
        const posts = await this.#postsRepo.countPostsUser(id_user)
        return posts
    }
}