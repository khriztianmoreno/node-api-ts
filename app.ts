import express from 'express'
import { createServer } from 'http'
import dotEnv from 'dotEnv'

dotEnv.config()

import log from './logger';
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
    log.info(`Servidor corriendo en el puerto ${PORT} ...`)

    // connect to database
    connectDB()

    // routes
    routes(app)
  })
}

setImmediate(startServer)
