import mongoose, { Schema, Document } from 'mongoose'

export enum UserRole {
  AGENT = 'AGENT',
  RESPONSABLE = 'RESPONSABLE',
  ADMIN = 'ADMIN'
}

export interface IUser extends Document {
  matricule: string
  nom: string
  prenoms: string
  email: string
  password: string
  direction: mongoose.Types.ObjectId
  poste: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    matricule: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    prenoms: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    direction: { type: Schema.Types.ObjectId, ref: 'Direction', required: true },
    poste: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.AGENT }
  },
  { timestamps: true }
)

export default mongoose.model<IUser>('User', UserSchema)