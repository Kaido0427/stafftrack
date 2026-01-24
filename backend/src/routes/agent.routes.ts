import { Hono } from 'hono'
import { AgentController } from '../controllers/agent.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const agentRoutes = new Hono()

// Toutes les routes nécessitent authentification
agentRoutes.use('/*', authMiddleware)

// CRUD des positions administratives
agentRoutes.post('/positions', AgentController.createPosition)
agentRoutes.get('/positions', AgentController.getMyPositions)
agentRoutes.get('/positions/:id', AgentController.getPositionById)
agentRoutes.put('/positions/:id', AgentController.updatePosition)
agentRoutes.delete('/positions/:id', AgentController.deletePosition)

export default agentRoutes