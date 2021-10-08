import express, { Request, Response, NextFunction} from 'express'
import { createServer } from 'http'
import dotEnv from 'dotEnv'

dotEnv.config()

import expressConfig from './config/express'
import connectDB from './database'
import routes from './routes';

// setup server
const app = express()
const server = createServer(app)

// setup express
expressConfig(app)

function startServer() {
  const PORT = process.env.PORT as string || 3000
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} ...`)

    // connect to database
    connectDB()

    // routes
    routes(app)
  })
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Working')
})

setImmediate(startServer)
