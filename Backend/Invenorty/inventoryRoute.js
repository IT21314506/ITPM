const express = require('express');
const { 
    createInventory, 
    getAllInventory, 
    getInventoryById, 
    updateInventory, 
    deleteInventory 
} = require('./inventoryController');

const router = express.Router();

// Create new inventory item
router.post('/', createInventory);

// Get all inventory items
router.get('/', getAllInventory);

// Get single inventory item
router.get('/:id', getInventoryById);

// Update inventory item
router.put('/:id', updateInventory);

// Delete inventory item
router.delete('/:id', deleteInventory);

module.exports = router;
