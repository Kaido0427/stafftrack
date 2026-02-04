import User from '../models/user.model.js'

export async function generateMatricule(): Promise<string> {
  const prefix = 'MAT'
  const year = new Date().getFullYear().toString().slice(-2) // 2 derniers chiffres de l'année
  
  // Compter le nombre d'utilisateurs pour générer le numéro séquentiel
  const count = await User.countDocuments()
  const sequence = (count + 1).toString().padStart(4, '0') // 4 chiffres avec zéros devant
  
  return `${prefix}${year}${sequence}` // Exemple: MAT250001, MAT250002...
}