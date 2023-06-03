import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
app.use(cors())

//parser
app.use(express.json())
//application route
app.use('/api/v1/users/', usersRouter)
app.use(express.urlencoded({ extended: true }))

//testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
