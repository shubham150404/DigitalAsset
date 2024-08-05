const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DigitalAssetschema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true }, // e.g., image, video, document, etc.
    url: { type: String, required: true }, // URL or path to access the asset
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user who uploaded the asset
    uploadedAt: { type: Date, default: Date.now },
    metadata: { type: String } // Additional metadata (optional)
  })

const DigitalAsset = mongoose.model('DigitalAsset',DigitalAssetschema)

module.exports = DigitalAsset