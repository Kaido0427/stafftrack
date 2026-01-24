import mongoose, { Schema, Document as MongoDocument } from 'mongoose'

export interface IDocument extends MongoDocument {
    position: mongoose.Types.ObjectId
    filename: string
    filepath: string
    type: string
    uploadedAt: Date
}

const DocumentSchema = new Schema<IDocument>(
    {
        position: { type: Schema.Types.ObjectId, ref: 'Position', required: true },
        filename: { type: String, required: true },
        filepath: { type: String, required: true },
        type: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now }
    },
    { timestamps: false }
)

export default mongoose.model<IDocument>('Document', DocumentSchema)