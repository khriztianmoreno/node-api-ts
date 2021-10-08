import express, { Application } from 'express'
import cors from 'cors'

import { requestLogger } from '../logger'

export default function (app: Application) {
  app.use(cors())
  app.use(express.json())
  app.use(requestLogger)
  app.use(express.urlencoded({ extended: false }))
}
