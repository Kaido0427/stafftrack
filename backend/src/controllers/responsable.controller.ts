import type { Context } from 'hono'
import User from '../models/user.model.js'
import Position from '../models/position.model.js'

export class ResponsableController {

    // Voir tous les agents de sa direction avec leurs positions
    static async getMyAgents(c: Context) {
        try {
            const userId = c.get('user').id

            // Récupérer le responsable pour connaître sa direction
            const responsable = await User.findById(userId)
            if (!responsable || !responsable.direction) {
                return c.json({ error: 'Direction non trouvée' }, 404)
            }

            // Récupérer tous les agents de la même direction
            const agents = await User.find({
                direction: responsable.direction,
                _id: { $ne: userId } // Exclure le responsable lui-même
            }).select('-password').populate('direction', 'code libelle').lean()

            // Pour chaque agent, récupérer ses positions
            const agentsWithPositions = await Promise.all(
                agents.map(async (agent) => {
                    const positions = await Position.find({ agent: agent._id })
                        .sort({ date_debut: -1 })
                        .limit(10) // Limiter aux 10 dernières positions

                    return {
                        ...agent,
                        positions: positions,
                        totalPositions: positions.length
                    }
                })
            )

            return c.json({
                direction: responsable.direction,
                total: agentsWithPositions.length,
                agents: agentsWithPositions
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la récupération des agents', details: error.message }, 500)
        }
    }

    // Voir un agent spécifique de sa direction avec toutes ses positions
    static async getAgentById(c: Context) {
        try {
            const userId = c.get('user').id
            const agentId = c.req.param('id')

            // Récupérer le responsable
            const responsable = await User.findById(userId)
            if (!responsable || !responsable.direction) {
                return c.json({ error: 'Direction non trouvée' }, 404)
            }

            // Récupérer l'agent et vérifier qu'il est dans la même direction
            const agent = await User.findOne({
                _id: agentId,
                direction: responsable.direction
            }).select('-password').populate('direction', 'code libelle').lean()

            if (!agent) {
                return c.json({ error: 'Agent non trouvé dans votre direction' }, 404)
            }

            // Récupérer toutes les positions de l'agent
            const positions = await Position.find({ agent: agentId })
                .sort({ date_debut: -1 })

            return c.json({
                agent: {
                    ...agent,
                    positions: positions,
                    totalPositions: positions.length
                }
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la récupération de l\'agent', details: error.message }, 500)
        }
    }

    // Voir toutes les positions d'un agent de sa direction
    static async getAgentPositions(c: Context) {
        try {
            const userId = c.get('user').id
            const agentId = c.req.param('id')

            // Récupérer le responsable
            const responsable = await User.findById(userId)
            if (!responsable || !responsable.direction) {
                return c.json({ error: 'Direction non trouvée' }, 404)
            }

            // Vérifier que l'agent est dans la même direction
            const agent = await User.findOne({
                _id: agentId,
                direction: responsable.direction
            })

            if (!agent) {
                return c.json({ error: 'Agent non trouvé dans votre direction' }, 404)
            }

            // Récupérer toutes les positions de l'agent
            const positions = await Position.find({ agent: agentId })
                .populate('agent', 'nom prenoms matricule')
                .sort({ date_debut: -1 })

            return c.json({
                agent: {
                    id: agent._id,
                    nom: agent.nom,
                    prenoms: agent.prenoms,
                    matricule: agent.matricule
                },
                total: positions.length,
                positions
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la récupération des positions', details: error.message }, 500)
        }
    }


}