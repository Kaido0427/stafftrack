import type { Context } from 'hono'
import Direction from '../models/direction.model.js'

export class DirectionController {

    // Créer une direction (ADMIN uniquement)
    static async createDirection(c: Context) {
        try {
            const { code, libelle } = await c.req.json()

            const existingDirection = await Direction.findOne({ code })
            if (existingDirection) {
                return c.json({ error: 'Ce code de direction existe déjà' }, 400)
            }

            const direction = await Direction.create({
                code,
                libelle
            })

            return c.json({
                message: 'Direction créée avec succès',
                direction: {
                    id: direction._id,
                    code: direction.code,
                    libelle: direction.libelle
                }
            }, 201)

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la création de la direction', details: error.message }, 500)
        }
    }

    // Récupérer toutes les directions
    static async getAllDirections(c: Context) {
        try {
            const directions = await Direction.find().populate('responsable', 'nom prenoms email matricule')

            return c.json({
                directions
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la récupération des directions', details: error.message }, 500)
        }
    }

    // Récupérer une direction par ID
    static async getDirectionById(c: Context) {
        try {
            const directionId = c.req.param('id')

            const direction = await Direction.findById(directionId).populate('responsable', 'nom prenoms email matricule')

            if (!direction) {
                return c.json({ error: 'Direction non trouvée' }, 404)
            }

            return c.json({ direction })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la récupération de la direction', details: error.message }, 500)
        }
    }

    // Mettre à jour une direction (ADMIN uniquement)
    static async updateDirection(c: Context) {
        try {
            const directionId = c.req.param('id')
            const { code, libelle } = await c.req.json()

            // Construire l'objet de mise à jour dynamiquement
            const updateData: any = {}

            if (code !== undefined) {
                // Vérifier si le nouveau code existe déjà
                const existingDirection = await Direction.findOne({ code, _id: { $ne: directionId } })
                if (existingDirection) {
                    return c.json({ error: 'Ce code de direction existe déjà' }, 400)
                }
                updateData.code = code
            }

            if (libelle !== undefined) updateData.libelle = libelle

            // Vérifier qu'au moins un champ est fourni
            if (Object.keys(updateData).length === 0) {
                return c.json({ error: 'Aucune donnée à mettre à jour' }, 400)
            }

            const direction = await Direction.findByIdAndUpdate(
                directionId,
                updateData,
                { new: true, runValidators: true }
            ).populate('responsable', 'nom prenoms email matricule')

            if (!direction) {
                return c.json({ error: 'Direction non trouvée' }, 404)
            }

            return c.json({
                message: 'Direction mise à jour avec succès',
                direction
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la mise à jour de la direction', details: error.message }, 500)
        }
    }

    // Assigner un responsable à une direction (ADMIN uniquement)
    static async assignResponsable(c: Context) {
        try {
            const directionId = c.req.param('id')
            const { responsable_id } = await c.req.json()

            const direction = await Direction.findByIdAndUpdate(
                directionId,
                { responsable: responsable_id },
                { new: true }
            ).populate('responsable', 'nom prenoms email matricule')

            if (!direction) {
                return c.json({ error: 'Direction non trouvée' }, 404)
            }

            return c.json({
                message: 'Responsable assigné avec succès',
                direction
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de l\'assignation du responsable', details: error.message }, 500)
        }
    }

    // Supprimer une direction (ADMIN uniquement)
    static async deleteDirection(c: Context) {
        try {
            const directionId = c.req.param('id')

            const direction = await Direction.findByIdAndDelete(directionId)

            if (!direction) {
                return c.json({ error: 'Direction non trouvée' }, 404)
            }

            return c.json({
                message: 'Direction supprimée avec succès'
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la suppression de la direction', details: error.message }, 500)
        }
    }
}