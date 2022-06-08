import { loadControllers, scopePerRequest } from 'awilix-express'
import cors from 'cors'
import Express from 'express'
import 'dotenv/config'
import  container  from './container'
import path, { join } from 'path';

const app = Express()

app.use(cors())
app.use(Express.json())

app.disable('x-powered-by')
app.use(scopePerRequest(container))
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }))
app.use('/static', Express.static(path.resolve( './uploads')));

app.listen(3001, ()=> console.log(path.resolve( './uploads')))
