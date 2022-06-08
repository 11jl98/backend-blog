import { asClass, asValue, createContainer, InjectionMode } from 'awilix'
import Emittery from 'emittery'


import { UserRepo } from './repositories/UserRepository'
import { CommentsRepo } from './repositories/CommentsRepository'
import { PostsRepo } from './repositories/PostsRepository'
import { FollowersRepo } from './repositories/FollowersRepository'
import { FollowingRepo } from './repositories/FollowingsRepository'

import { UserService } from './services/UserService'
import { CommentsService } from './services/CommentsService'
import { PostsService } from './services/PostsService'
import { FollowersService } from './services/FollowersService'
import { FollowingService } from './services/FollowingsService'

import { database } from './utils/config/database'
import { CryptoHash } from './utils/hash'

const definition = {
    database: asValue(database),
    hash: asClass(CryptoHash).singleton(),
    emittery: asClass(Emittery).singleton(),

    userRepo: asClass(UserRepo).singleton(),
    commentsRepo: asClass(CommentsRepo).singleton(),
    postsRepo: asClass(PostsRepo).singleton(),
    followersRepo: asClass(FollowersRepo).singleton(),
    followingRepo: asClass(FollowingRepo).singleton(),

    userService: asClass(UserService).singleton(),
    commentsService: asClass(CommentsService).singleton(),
    postsService: asClass(PostsService).singleton(),
    followersService: asClass(FollowersService).singleton(),
    followingService: asClass(FollowingService).singleton(),
}

const container = createContainer({
    injectionMode: InjectionMode.PROXY
})

container.register(definition)

export default container