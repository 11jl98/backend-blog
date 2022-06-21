import { POST, route, GET, PUT, before, DELETE } from 'awilix-express'
import { Request, Response } from 'express'
import { FollowersService } from '../services/FollowersService'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'

@route('/followers')
export class FollowersController {
    #followersService: FollowersService

    constructor ({ followersService }) {
        this.#followersService = followersService
      }
    
@POST()
@before([authMiddlewares])
async save (request: Request, response: Response) {
    const data = request.body
    const { id_user } = request
    const id = await this.#followersService.save({...data, id_user})
    return response.status(201).json({ id })
}

@route('/:id')
@PUT()
@before([authMiddlewares])
async update (request: Request, response: Response){
    const data = request.body
    const { id } = request.params
    
    await this.#followersService.update(data, id)
    return response.status(201).json({ })
    
}

@route('/:id_followers')
@DELETE()
@before([authMiddlewares])
async destroy (request: Request, response: Response){
    const { id_user } = request
    const { id_followers } = request.params
    await this.#followersService.destroy(id_followers, id_user)
    return response.status(201).json({ })
    
}

@GET()
@before([authMiddlewares])
async countFollowersPerUser(request: Request, response: Response){
    const { id_user } = request
    
    const totals = await this.#followersService.countFollowersPerUser(id_user)
    return response.status(201).json({totals: totals})

}


@route('/:id_followers')
@GET()
@before([authMiddlewares])
async findByIds(request: Request, response: Response){
    const { id_user } = request
    const { id_followers } = request.params
    const data = await this.#followersService.findById(id_followers, id_user)
    return response.status(201).json(data)

}
}
