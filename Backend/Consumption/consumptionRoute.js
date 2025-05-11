const express = require('express');
const {
    createConsumption,
    getAllConsumption,
    getConsumptionById,
    updateConsumption,
    deleteConsumption
} = require('./consumptionController');

const router = express.Router();

// Create new consumption record
router.post('/', createConsumption);

// Get all consumption records
router.get('/', getAllConsumption);

// Get single consumption record
router.get('/:id', getConsumptionById);

// Update consumption record
router.put('/:id', updateConsumption);

// Delete consumption record
router.delete('/:id', deleteConsumption);

module.exports = router; 