import { randomUUID } from "crypto"
import bcrypt from 'bcryptjs'

class UserEntity{
    id: string
    id_user: string
    id_post: string
    date: string

    constructor(body: Omit<UserEntity, 'id'>, id = randomUUID()){
        this.id = id
        this.id_user = body.id_user
        this.id_post = body.id_post
        this.date = body.date
    }
}

export { UserEntity }