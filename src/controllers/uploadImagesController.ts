import { POST, route, GET, before } from 'awilix-express'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { UploadImagesMiddlewares } from '../utils/middlewares/UploadImagesUserMiddlewares'
import { authMiddlewares } from '../utils/middlewares/AuthMiddlewares'
import { UploadImagesPostMiddlewares } from '../utils/middlewares/UploadImagesPostMiddlewares'
import { UploadImagesCapaUserMiddlewares } from '../utils/middlewares/UploadImagesCapaUserMiddlewares'
import path from 'path'
import fs from "fs"
@route('/upload')
export class uploadImagesController {
    #userService: UserService

    constructor ({ userService }) {
        this.#userService = userService
      }

@route('/avatar-user')
@POST()
@before([authMiddlewares, UploadImagesMiddlewares.single('image')])
  async uploadLogoUser (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    await this.#userService.update({...user, avatar_url: request.file.filename}, user.id)

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

@route('/post-file')
@POST()
@before([authMiddlewares, UploadImagesPostMiddlewares.single('image')])
  async uploadLogoPost (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    await this.#userService.update({...user, avatar_url: request.file.filename}, user.id)

    if(request.file) return response.status(201).json({
        url: request.file.filename
    })
  }

@route('/post-file')
@GET()
@before([authMiddlewares])
  async getLogoPost (request: Request, response: Response) {
    
    const user = await this.#userService.findById(request.id_user)

    console.log(path.resolve(__dirname + '../../../', 'uploads/posts', user.avatar_url))

    if(user.avatar_url) return response.status(201).sendFile(path.resolve(__dirname + '../../../','uploads/posts', user.avatar_url))

    return response.sendStatus(404)
  }


@route('/capa-file')
@POST()
@before([authMiddlewares, UploadImagesCapaUserMiddlewares.single('image')])
async uploadCapaPost (request: Request, response: Response) {
    
  const user = await this.#userService.findById(request.id_user)

  await this.#userService.update({...user, url_capa: request.file.filename}, user.id)

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

