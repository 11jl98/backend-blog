import { randomUUID } from "crypto"
import bcrypt from 'bcryptjs'

class UserEntity{
    id: string
    email: string
    name_user: string
    avatar_url: string
    url_capa : string
    description: string
    password: string
    rule: string

    constructor(body: Omit<UserEntity, 'id'>, id = randomUUID()){
        this.id = id
        this.email = body.email
        this.name_user = body.name_user
        this.avatar_url = body.avatar_url
        this.url_capa = body.url_capa
        this.description = body.description
        this.rule = body.rule
        this.password = bcrypt.hashSync(body.password, 8)
    }
}

export { UserEntity }