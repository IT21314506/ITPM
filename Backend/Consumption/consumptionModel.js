const mongoose = require('mongoose');

const ConsumptionSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    totalPrice: {
        type: Number,
        required: true
    },
    inventoryItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventory',
        required: true
    }
});

module.exports = mongoose.model('consumption', ConsumptionSchema);
