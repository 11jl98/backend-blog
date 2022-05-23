import { randomUUID } from "crypto"

class PostsEntity{
    id: string
    id_user: string
    title: string
    description: string
    url_file: string

    constructor(body: Omit<PostsEntity, 'id'>, id = randomUUID()){
        this.id = id
        this.id_user = body.id_user
        this.title = body.title
        this.description = body.description
        this.url_file = body.url_file
    }
}

export { PostsEntity }