import { Hono } from 'hono'
import { ResponsableController } from '../controllers/responsable.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const responsableRoutes = new Hono()

// Toutes les routes nécessitent authentification
responsableRoutes.use('/*', authMiddleware)

// Gestion des agents de sa direction
responsableRoutes.get('/agents', ResponsableController.getMyAgents)
responsableRoutes.get('/agents/:id', ResponsableController.getAgentById)
responsableRoutes.get('/agents/:id/positions', ResponsableController.getAgentPositions)



export default responsableRoutes