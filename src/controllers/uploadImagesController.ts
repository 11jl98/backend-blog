import { POST, route, GET, before, PUT } from 'awilix-express'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { PostsService } from '../services/PostsService'
import { UploadImagesMiddlewares } from '../utils/middlewares/UploadImagesUserMiddlewares'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'
import { UploadImagesPostMiddlewares } from '../utils/middlewares/UploadImagesPostMiddlewares'
import { UploadImagesCapaUserMiddlewares } from '../utils/middlewares/UploadImagesCapaUserMiddlewares'
import path from 'path'
import fs from "fs"
@route('/upload')
export class uploadImagesController {
    #userService: UserService
    #postsService: PostsService

    constructor ({ userService, postsService }) {
        this.#userService = userService
        this.#postsService = postsService
      }

@route('/avatar-user')
@POST()
@before([authMiddlewares, UploadImagesMiddlewares.single('image')])
  async uploadLogoUser (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    await this.#userService.update({...user, avatar_url: `${process.env.BASE_URL}user/${request.file.filename}`}, user.id)

    if(request.file) return response.status(201).json({
        url: request.file.filename
    })
  }

@route('/avatar-user')
@GET()
@before([authMiddlewares])
  async getLogoUser (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    if(user.avatar_url) {
      const x = fs.readFileSync(path.resolve(__dirname + '../../../','uploads/user', user.avatar_url), "base64" )
      return response.status(201).json({base64: x})
    }

    return response.sendStatus(404)
  }

@route('/post-file/:id')
@PUT()
@before([authMiddlewares, UploadImagesPostMiddlewares.single('image')])
  async uploadLogoPost (request: Request, response: Response) {
    
    const post = await this.#postsService.findById(request.params.id)

    await this.#postsService.update({...post, url_file: `${process.env.BASE_URL}imagePosts/${request.file.filename}`}, post.id)

    if(request.file) return response.status(201).json({
        url: request.file.filename
    })
  }


@route('/post-file/:id')
@GET()
@before([authMiddlewares])
  async getLogoPostAllUser (request: Request, response: Response) {
    
    const post = await this.#postsService.findById(request.params.id)

    if(post.url_file) {
      const x = fs.readFileSync(path.resolve(__dirname + '../../../','uploads/imagePosts', post.url_file), "base64" )
      return response.status(201).json({base64: x})
    }

    return response.sendStatus(404)
  }

@route('/post-file')
@GET()
@before([authMiddlewares])
  async getLogoPost (request: Request, response: Response) {
    
    const posts = await this.#postsService.getPostsUserAll(request.id_user)

    if(!posts) return response.status(404).json([])


    return response.status(201).json(posts)
  }


@route('/capa-file')
@POST()
@before([authMiddlewares, UploadImagesCapaUserMiddlewares.single('image')])
async uploadCapaPost (request: Request, response: Response) {
    
  const user = await this.#userService.findById(request.id_user)

  await this.#userService.update({...user, url_capa: `${process.env.BASE_URL}user/capa/${request.file.filename}`}, user.id)

  if(request.file) return response.status(201).json({
      url: request.file.filename
  })
}

@route('/capa-file')
@GET()
@before([authMiddlewares])
  async getCapa (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    if(user.url_capa) {
      const x = fs.readFileSync(path.resolve(__dirname + '../../../','uploads/user/capa', user.url_capa), "base64" )
      return response.status(201).json({base64: x})
    }

    return response.sendStatus(404)
  }

}

