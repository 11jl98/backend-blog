import { loadControllers, scopePerRequest } from 'awilix-express'
import cors from 'cors'
import Express from 'express'
import 'dotenv/config'
import  container  from './container'

const app = Express()

app.use(cors())
app.use(Express.json())

app.disable('x-powered-by')
app.use(scopePerRequest(container))
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }))

app.listen(3000, ()=> console.log("http://localhost:3000"))
