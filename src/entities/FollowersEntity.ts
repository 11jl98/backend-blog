import { randomUUID } from "crypto"

class FollowersEntity{
    id: string
    id_user: string
    id_followers: string
    date: string

    constructor(body: Omit<FollowersEntity, 'id'>, id = randomUUID()){
        this.id = id
        this.id_user = body.id_user
        this.id_followers = body.id_followers
        this.date = body.date
    }
}

export { FollowersEntity }