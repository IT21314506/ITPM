const ShoppingList = require('./shoppingListModel');

// Create a new shopping list item
exports.createItem = async (req, res) => {
    try {
        const { item, Quantity, Price } = req.body;
        const Total = Quantity * Price;

        const newItem = new ShoppingList({
            item,
            Quantity,
            Price,
            Total
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all shopping list items
exports.getAllItems = async (req, res) => {
    try {
        const items = await ShoppingList.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single shopping list item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await ShoppingList.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a shopping list item
exports.updateItem = async (req, res) => {
    try {
        const { item, Quantity, Price } = req.body;
        const Total = Quantity * Price;

        const updatedItem = await ShoppingList.findByIdAndUpdate(
            req.params.id,
            { item, Quantity, Price, Total },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a shopping list item
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await ShoppingList.findByIdAndDelete(req.params.id);
        
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

