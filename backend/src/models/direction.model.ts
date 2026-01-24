import mongoose, { Schema, Document } from 'mongoose'

export interface IDirection extends Document {
  code: string
  libelle: string
  responsable?: mongoose.Types.ObjectId // Optionnel avec ?
  createdAt: Date
  updatedAt: Date
}

const DirectionSchema = new Schema<IDirection>(
  {
    code: { type: String, required: true, unique: true },
    libelle: { type: String, required: true },
    responsable: { type: Schema.Types.ObjectId, ref: 'User', required: false } // required: false
  },
  { timestamps: true }
)

export default mongoose.model<IDirection>('Direction', DirectionSchema)