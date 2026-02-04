import type { Context } from 'hono'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { UserRole } from '../models/user.model.js'
import { generateToken } from '../utils/jwt.js'
import { generateMatricule } from '../utils/matricule.js'
import Direction from '../models/direction.model.js'

export class AuthController {

    // 1. Register (CORRECTION)
    static async register(c: Context) {
        try {
            const { nom, prenoms, email, password, direction, poste, role } = await c.req.json()

            // Vérifier si l'email existe déjà
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return c.json({ error: 'Cet email est déjà utilisé' }, 400)
            }

            // Vérifier que la direction existe (sauf pour ADMIN)
            if (role !== UserRole.ADMIN) {
                if (!direction) {
                    return c.json({ error: 'La direction est obligatoire pour ce rôle' }, 400)
                }

                const directionExists = await Direction.findById(direction)
                if (!directionExists) {
                    return c.json({ error: 'Direction non trouvée' }, 404)
                }
            }

            // Générer automatiquement le matricule
            const matricule = await generateMatricule()

            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10)

            // Créer l'utilisateur
            const user = await User.create({
                matricule,
                nom,
                prenoms,
                email,
                password: hashedPassword,
                direction: role === UserRole.ADMIN ? undefined : direction,
                poste,
                role: role || UserRole.AGENT
            })

            const token = generateToken(user._id.toString())

            return c.json({
                message: 'Inscription réussie',
                token,
                user: {
                    id: user._id,
                    matricule: user.matricule,
                    nom: user.nom,
                    prenoms: user.prenoms,
                    email: user.email,
                    role: user.role,
                    direction: user.direction
                }
            }, 201)

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de l\'inscription', details: error.message }, 500)
        }
    }
    // 2. Login
    static async login(c: Context) {
        try {
            const { email, password } = await c.req.json()

            // Vérifier si l'utilisateur existe
            const user = await User.findOne({ email }).populate('direction')
            if (!user) {
                return c.json({ error: 'Email ou mot de passe incorrect' }, 401)
            }

            // Vérifier le mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return c.json({ error: 'Email ou mot de passe incorrect' }, 401)
            }

            const token = generateToken(user._id.toString())

            return c.json({
                message: 'Connexion réussie',
                token,
                user: {
                    id: user._id,
                    matricule: user.matricule,
                    nom: user.nom,
                    prenoms: user.prenoms,
                    email: user.email,
                    role: user.role,
                    direction: user.direction
                }
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la connexion', details: error.message }, 500)
        }
    }

    // 3. Logout (côté client principalement)
    static async logout(c: Context) {
        return c.json({ message: 'Déconnexion réussie' })
    }

    // 4. Update Password
    static async updatePassword(c: Context) {
        try {
            const userId = c.get('user').id
            const { currentPassword, newPassword } = await c.req.json()

            // Récupérer l'utilisateur
            const user = await User.findById(userId)
            if (!user) {
                return c.json({ error: 'Utilisateur non trouvé' }, 404)
            }

            // Vérifier l'ancien mot de passe
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
            if (!isPasswordValid) {
                return c.json({ error: 'Mot de passe actuel incorrect' }, 401)
            }

            // Hasher et mettre à jour le nouveau mot de passe
            user.password = await bcrypt.hash(newPassword, 10)
            await user.save()

            return c.json({ message: 'Mot de passe mis à jour avec succès' })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la mise à jour du mot de passe', details: error.message }, 500)
        }
    }

    // 5. Update Profile
    static async updateProfile(c: Context) {
        try {
            const userId = c.get('user').id
            const { nom, prenoms, email, poste } = await c.req.json()

            // Construire l'objet de mise à jour dynamiquement
            const updateData: any = {}

            if (nom !== undefined) updateData.nom = nom
            if (prenoms !== undefined) updateData.prenoms = prenoms
            if (poste !== undefined) updateData.poste = poste

            // Vérifier l'email uniquement s'il est fourni
            if (email !== undefined) {
                const existingUser = await User.findOne({ email, _id: { $ne: userId } })
                if (existingUser) {
                    return c.json({ error: 'Cet email est déjà utilisé' }, 400)
                }
                updateData.email = email
            }

            // Vérifier qu'au moins un champ est fourni
            if (Object.keys(updateData).length === 0) {
                return c.json({ error: 'Aucune donnée à mettre à jour' }, 400)
            }

            // Mettre à jour l'utilisateur
            const user = await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            ).populate('direction')

            if (!user) {
                return c.json({ error: 'Utilisateur non trouvé' }, 404)
            }

            return c.json({
                message: 'Profil mis à jour avec succès',
                user: {
                    id: user._id,
                    matricule: user.matricule,
                    nom: user.nom,
                    prenoms: user.prenoms,
                    email: user.email,
                    poste: user.poste,
                    role: user.role,
                    direction: user.direction
                }
            })

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la mise à jour du profil', details: error.message }, 500)
        }
    }
    // 6. Seed Admin
    static async seedAdmin(c: Context) {
        try {
            // Vérifier si un admin existe déjà
            const existingAdmin = await User.findOne({ role: UserRole.ADMIN })
            if (existingAdmin) {
                return c.json({ message: 'Un administrateur existe déjà' }, 400)
            }

            const hashedPassword = await bcrypt.hash('admin123', 10)

            const admin = await User.create({
                matricule: 'ADMIN001',
                nom: 'Admin',
                prenoms: 'System',
                email: 'admin@stafftrack.com',
                password: hashedPassword,
                poste: 'Administrateur',
                role: UserRole.ADMIN
            })

            return c.json({
                message: 'Admin créé avec succès',
                credentials: {
                    email: 'admin@stafftrack.com',
                    password: 'admin123'
                }
            }, 201)

        } catch (error: any) {
            return c.json({ error: 'Erreur lors de la création de l\'admin', details: error.message }, 500)
        }
    }
}