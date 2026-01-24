import { Hono } from 'hono'
import { AuthController } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const authRoutes = new Hono()

// Routes publiques
authRoutes.post('/register', AuthController.register)
authRoutes.post('/login', AuthController.login)
authRoutes.post('/seed-admin', AuthController.seedAdmin)

// Routes protégées (nécessitent authentification)
authRoutes.post('/logout', authMiddleware, AuthController.logout)
authRoutes.put('/update-password', authMiddleware, AuthController.updatePassword)
authRoutes.put('/update-profile', authMiddleware, AuthController.updateProfile)

export default authRoutes