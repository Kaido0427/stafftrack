import mongoose, { Schema, Document } from 'mongoose'

export interface IValidation extends Document {
    position: mongoose.Types.ObjectId
    responsable: mongoose.Types.ObjectId
    statut: string
    commentaire?: string
    validatedAt: Date
}

const ValidationSchema = new Schema<IValidation>(
    {
        position: { type: Schema.Types.ObjectId, ref: 'Position', required: true },
        responsable: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        statut: { type: String, required: true },
        commentaire: { type: String },
        validatedAt: { type: Date, default: Date.now }
    },
    { timestamps: false }
)

export default mongoose.model<IValidation>('Validation', ValidationSchema)