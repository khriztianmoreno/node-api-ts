import express, { Request, Response, NextFunction} from 'express'
import { createServer } from 'http'
import dotEnv from 'dotEnv'

dotEnv.config()

import expressConfig from './config/express'
import connectDB from './database'

// setup server
const app = express()
const server = createServer(app)

expressConfig(app)
connectDB()

function startServer() {
  const PORT = process.env.PORT as string || 3000
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} ...`)
  })
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Working')
})

setImmediate(startServer)
