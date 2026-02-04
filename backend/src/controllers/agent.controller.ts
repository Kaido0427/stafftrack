import type { Context } from 'hono'
import Position from '../models/position.model.js'

export class AgentController {

    // Créer une position administrative
    static async createPosition(c: Context) {
        try {
            const userId = c.get('user').id
            const { type, date_debut, date_fin, lieu, motif, document_url } = await c.req.json()

            // Vérifier que date_fin >= date_debut
            if (new Date(date_fin) < new Date(date_debut)) {
                return c.json({ error: 'La date de fin doit être supérieure ou égale à la date de début' }, 400)
            }

            const position = await Position.create({
                agent: userId,
                type,
                date_debut,
                date_fin,
                lieu,
                motif,
                document_url
            })

            const populatedPosition = await Position.findById(position._id)
                .populate('agent', 'nom prenoms matricule')

            return c.json({
                message: 'Position administrative créée avec succès',
                position: populatedPosition
            }, 201)

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la création de la position', details: error.message }, 500)
        }
    }

    // Voir toutes mes positions
    static async getMyPositions(c: Context) {
        try {
            const userId = c.get('user').id

            const positions = await Position.find({ agent: userId })
                .populate('agent', 'nom prenoms matricule')
                .sort({ date_debut: -1 })

            return c.json({
                total: positions.length,
                positions
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la récupération des positions', details: error.message }, 500)
        }
    }

    // Voir une position spécifique
    static async getPositionById(c: Context) {
        try {
            const userId = c.get('user').id
            const positionId = c.req.param('id')

            const position = await Position.findOne({
                _id: positionId,
                agent: userId
            }).populate('agent', 'nom prenoms matricule')

            if (!position) {
                return c.json({ error: 'Position non trouvée' }, 404)
            }

            return c.json({ position })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la récupération de la position', details: error.message }, 500)
        }
    }

    // Modifier une position (seulement si statut = EN_ATTENTE)
    static async updatePosition(c: Context) {
        try {
            const userId = c.get('user').id
            const positionId = c.req.param('id')
            const { type, date_debut, date_fin, lieu, motif, document_url } = await c.req.json()

            // Vérifier que la position appartient à l'agent
            const position = await Position.findOne({
                _id: positionId,
                agent: userId
            })

            if (!position) {
                return c.json({ error: 'Position non trouvée' }, 404)
            }

            // Vérifier que la position est encore en attente
            if (position.statut !== 'EN_ATTENTE') {
                return c.json({ error: 'Vous ne pouvez modifier que les positions en attente' }, 403)
            }

            // Construire l'objet de mise à jour
            const updateData: any = {}
            if (type !== undefined) updateData.type = type
            if (date_debut !== undefined) updateData.date_debut = date_debut
            if (date_fin !== undefined) updateData.date_fin = date_fin
            if (lieu !== undefined) updateData.lieu = lieu
            if (motif !== undefined) updateData.motif = motif
            if (document_url !== undefined) updateData.document_url = document_url

            // Vérifier les dates si elles sont modifiées
            const finalDateDebut = date_debut || position.date_debut
            const finalDateFin = date_fin || position.date_fin

            if (new Date(finalDateFin) < new Date(finalDateDebut)) {
                return c.json({ error: 'La date de fin doit être supérieure ou égale à la date de début' }, 400)
            }

            const updatedPosition = await Position.findByIdAndUpdate(
                positionId,
                updateData,
                { new: true }
            ).populate('agent', 'nom prenoms matricule')

            return c.json({
                message: 'Position mise à jour avec succès',
                position: updatedPosition
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la mise à jour de la position', details: error.message }, 500)
        }
    }

    // Supprimer une position (seulement si statut = EN_ATTENTE)
    static async deletePosition(c: Context) {
        try {
            const userId = c.get('user').id
            const positionId = c.req.param('id')

            const position = await Position.findOne({
                _id: positionId,
                agent: userId
            })

            if (!position) {
                return c.json({ error: 'Position non trouvée' }, 404)
            }

            // Vérifier que la position est encore en attente
            if (position.statut !== 'EN_ATTENTE') {
                return c.json({ error: 'Vous ne pouvez supprimer que les positions en attente' }, 403)
            }

            await Position.findByIdAndDelete(positionId)

            return c.json({
                message: 'Position supprimée avec succès'
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la suppression de la position', details: error.message }, 500)
        }
    }
}