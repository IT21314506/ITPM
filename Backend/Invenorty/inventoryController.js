const inventorymodel = require("./inventoryModel");

// Create new inventory item
const createInventory = async (req, res) => {
    try {
        const { item, Quantity, Price, Category } = req.body;
        const Total = Quantity * Price;
        
        const newInventory = new inventorymodel({
            item,
            Quantity,
            Price,
            Category,
            Total
        });

        const savedInventory = await newInventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all inventory items
const getAllInventory = async (req, res) => {
    try {
        const inventory = await inventorymodel.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single inventory item
const getInventoryById = async (req, res) => {
    try {
        const inventory = await inventorymodel.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update inventory item
const updateInventory = async (req, res) => {
    try {
        const { item, Quantity, Price, Category } = req.body;
        const Total = Quantity * Price;

        const updatedInventory = await inventorymodel.findByIdAndUpdate(
            req.params.id,
            { item, Quantity, Price, Category, Total },
            { new: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json(updatedInventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete inventory item
const deleteInventory = async (req, res) => {
    try {
        const deletedInventory = await inventorymodel.findByIdAndDelete(req.params.id);
        if (!deletedInventory) {
            return res.status(404).json({ message: "Inventory item not found" });
        }
        res.status(200).json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};