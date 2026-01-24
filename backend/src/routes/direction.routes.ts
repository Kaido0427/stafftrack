import { Hono } from 'hono'
import { DirectionController } from '../controllers/direction.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const directionRoutes = new Hono()

// Toutes les routes nécessitent authentification
directionRoutes.use('/*', authMiddleware)

// CRUD complet
directionRoutes.post('/', DirectionController.createDirection)                    // Créer
directionRoutes.get('/', DirectionController.getAllDirections)                   // Lire toutes
directionRoutes.get('/:id', DirectionController.getDirectionById)                // Lire une
directionRoutes.put('/:id', DirectionController.updateDirection)                 // Mettre à jour
directionRoutes.delete('/:id', DirectionController.deleteDirection)              // Supprimer
directionRoutes.put('/:id/assign-responsable', DirectionController.assignResponsable) // Assigner responsable

export default directionRoutes