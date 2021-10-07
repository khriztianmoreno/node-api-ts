import express, { Application } from 'express'
import cors from 'cors'

export default function (app: Application) {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}
