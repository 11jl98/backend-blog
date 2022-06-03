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

    const isValidPassword = await bcrypt.compareSync(password, user.password)

    // if(!isValidPassword) return response.status(401).json({message: 'Senha invalida'})

    const token = jwt.sign({id: user.id, rule: user.rule}, process.env.PASSWORD_JWT, { expiresIn: '1d'})
    return response.json({token})
  }
}
