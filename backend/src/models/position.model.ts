import mongoose, { Schema, Document } from 'mongoose'

export enum PositionType {
    MISSION_EXTERIEUR = 'MISSION_EXTERIEUR',
    MISSION_INTERIEUR = 'MISSION_INTERIEUR',
    CONGE = 'CONGE',
    PERMISSION = 'PERMISSION',
    DEPLACEMENT_FORMATION = 'DEPLACEMENT_FORMATION',
    DEPLACEMENT_REUNION = 'DEPLACEMENT_REUNION',
    MOTIF_PRIVE = 'MOTIF_PRIVE',
    MALADIE = 'MALADIE'
}

export enum PositionStatut {
    EN_ATTENTE = 'EN_ATTENTE',
    VALIDE = 'VALIDE',
    REJETE = 'REJETE'
}

export interface IPosition extends Document {
    agent: mongoose.Types.ObjectId
    type: PositionType
    date_debut: Date
    date_fin: Date
    lieu?: string
    motif: string
    statut: PositionStatut
    document_url?: string
    createdAt: Date
    updatedAt: Date
}

const PositionSchema = new Schema<IPosition>(
    {
        agent: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: Object.values(PositionType), required: true },
        date_debut: { type: Date, required: true },
        date_fin: { type: Date, required: true },
        lieu: { type: String },
        motif: { type: String, required: true },
        statut: { type: String, enum: Object.values(PositionStatut), default: PositionStatut.EN_ATTENTE },
        document_url: { type: String }
    },
    { timestamps: true }
)

export default mongoose.model<IPosition>('Position', PositionSchema)