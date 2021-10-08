/**
 * Main application routes
 */
import { Application } from 'express'

import user from './api/user'

export default function (app: Application) {
  app.use('/api/users', user)
}
