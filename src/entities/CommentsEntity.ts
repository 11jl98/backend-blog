import { randomUUID } from "crypto"

class CommentsEntity{
    id: string
    id_user: string
    id_post: string
    id_comments_ref?: string
    description: string

    constructor(body: Omit<CommentsEntity, 'id'>, id = randomUUID()){
        this.id = id
        this.id_user = body.id_user
        this.id_post = body.id_post
        this.id_comments_ref = body.id_comments_ref
        this.description = body.description
    }
}

export { CommentsEntity }