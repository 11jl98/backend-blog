import { POST, route, GET, PUT, before } from 'awilix-express'
import {Request, response, Response } from 'express'
import { PostsService } from '../services/PostsService'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'
import { AclMiddlewares } from '../utils/middlewares/AclMiddlewares'

@route('/posts')
export class UserController {
    #postsService: PostsService

    constructor ({ postsService }) {
        this.#postsService = postsService
      }

      @POST()
      @before([authMiddlewares])
      async save(request: Request, response: Response){
        const data = request.body
        const { id_user } = request
        const id = await this.#postsService.save({...data, id_user})
        return response.status(201).json({id})
      }

      @route('/:id')
      @PUT()
      @before([authMiddlewares])
      async update(request: Request, response: Response){
          const data = request.body
          const { id_user } = request
          const { id } = request.params
        await this.#postsService.update({...data, id_user}, id)

        return response.status(201).json({})
      }

      @GET()
      async getPosts(request: Request, response: Response){
        const data = await this.#postsService.getPosts()
        return response.status(201).json(data)
      }
      
    }