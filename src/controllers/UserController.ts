import { POST, route, GET, PUT, before } from 'awilix-express'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'

@route('/users')
export class UserController {
    #userService: UserService

    constructor ({ userService }) {
        this.#userService = userService
      }
    
@POST()
async save (request: Request, response: Response) {
    const data = request.body
    const id = await this.#userService.save(data)
    return response.status(201).json({ id })
}

@route('/:id')
@PUT()
@before([authMiddlewares])
async update (request: Request, response: Response){
    const data = request.body
    const { id } = request.params
    
    await this.#userService.update(data, id)
    return response.status(201).json({ })
    
}

@GET()
@before([authMiddlewares])
async findById(request: Request, response: Response){
    const { id_user } = request
    const data = await this.#userService.findById(id_user)
    
    return response.status(201).json(data)
}

@route('/search')
@GET()
@before([authMiddlewares])
async searchUsers(request: Request, response: Response){
    const { q } = request.query
    const { id_user } = request
    const data = await this.#userService.getUserSearch(q as string, id_user)
    
    return response.status(201).json(data)
}

}
