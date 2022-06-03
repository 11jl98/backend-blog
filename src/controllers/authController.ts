import { POST, route, GET } from 'awilix-express'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

@route('/auth')
export class UserController {
    #userService: UserService

    constructor ({ userService }) {
        this.#userService = userService
      }

@POST()
  async findById (request: Request, response: Response) {
    const {email, password} = request.body
    const user = await this.#userService.findByEmailAndPassword(email, password)
    
    if(!user) return response.sendStatus(401)

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword) return response.sendStatus(401)

    const token = jwt.sign({id: user.id, rule: user.rule}, process.env.PASSWORD_JWT, { expiresIn: '1d'})
    console.log('aquiiiiii')
    return response.json({token})
  }
}
