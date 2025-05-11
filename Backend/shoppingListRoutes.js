const express = require('express');
const router = express.Router();
const shoppingListController = require('./ShoppingListController')
// Create a new shopping list item
router.post('/', shoppingListController.createItem);

// Get all shopping list items
router.get('/', shoppingListController.getAllItems);

// Get a single shopping list item by ID
router.get('/:id', shoppingListController.getItemById);

// Update a shopping list item
router.put('/:id', shoppingListController.updateItem);

// Delete a shopping list item
router.delete('/:id', shoppingListController.deleteItem);

module.exports = router; 