import { POST, route, GET, PUT, before } from 'awilix-express'
import {Request, response, Response } from 'express'
import { CommentsService } from '../services/CommentsService'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'

@route('/comments')
export class UserController {
    #commentsService: CommentsService

    constructor ({ commentsService }) {
        this.#commentsService = commentsService
      }

      @POST()
      @before([authMiddlewares])
      async save(request: Request, response: Response){
        const data = request.body
        const { id_user } = request
        const id = await this.#commentsService.save({...data, id_user})
        return response.status(201).json({id})
      }

      @GET()
      async findByComments(request: Request, response: Response){
        const data = await this.#commentsService.findByComments()
        return response.status(201).json(data)
      }
      
    }