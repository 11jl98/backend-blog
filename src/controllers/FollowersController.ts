import { POST, route, GET, PUT, before } from 'awilix-express'
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
async save (request: Request, response: Response) {
    const data = request.body
    const id = await this.#followersService.save(data)
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

@GET()
@before([authMiddlewares])
async countFollowersPerUser(request: Request, response: Response){
    const { id_user } = request
    
    const totals = await this.#followersService.countFollowersPerUser(id_user)
    return response.status(201).json({totals})

}
}
