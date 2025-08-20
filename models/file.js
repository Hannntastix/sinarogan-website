import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    }
});

export default mongoose.models.File || mongoose.model('File', FileSchema);