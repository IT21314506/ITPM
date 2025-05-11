const ConsumptionModel = require('./consumptionModel');
const InventoryModel = require('../Invenorty/inventoryModel');

// Create new consumption record
const createConsumption = async (req, res) => {
    try {
        const { item, quantity, category, notes, inventoryItemId } = req.body;

        // Find the inventory item
        const inventoryItem = await InventoryModel.findById(inventoryItemId);
        if (!inventoryItem) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        // Check if there's enough quantity
        if (inventoryItem.Quantity < quantity) {
            return res.status(400).json({ message: "Not enough items in inventory" });
        }

        // Calculate total price
        const totalPrice = quantity * inventoryItem.Price;

        // Create consumption record
        const newConsumption = new ConsumptionModel({
            item,
            quantity,
            category,
            notes,
            inventoryItemId,
            totalPrice
        });

        // Update inventory quantity
        inventoryItem.Quantity -= quantity;
        inventoryItem.Total = inventoryItem.Quantity * inventoryItem.Price;
        await inventoryItem.save();

        // Save consumption record
        const savedConsumption = await newConsumption.save();
        res.status(201).json(savedConsumption);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all consumption records
const getAllConsumption = async (req, res) => {
    try {
        const consumption = await ConsumptionModel.find()
            .populate('inventoryItemId', 'item Quantity Price Category Total');
        res.status(200).json(consumption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single consumption record
const getConsumptionById = async (req, res) => {
    try {
        const consumption = await ConsumptionModel.findById(req.params.id)
            .populate('inventoryItemId', 'item Quantity Price Category Total');
        if (!consumption) {
            return res.status(404).json({ message: "Consumption record not found" });
        }
        res.status(200).json(consumption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update consumption record
const updateConsumption = async (req, res) => {
    try {
        const { item, quantity, category, notes, inventoryItemId } = req.body;
        const consumption = await ConsumptionModel.findById(req.params.id);
        
        if (!consumption) {
            return res.status(404).json({ message: "Consumption record not found" });
        }

        // Find the inventory item
        const inventoryItem = await InventoryModel.findById(inventoryItemId);
        if (!inventoryItem) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        // Calculate quantity difference
        const quantityDifference = quantity - consumption.quantity;

        // Check if there's enough quantity for the update
        if (inventoryItem.Quantity < quantityDifference) {
            return res.status(400).json({ message: "Not enough items in inventory for this update" });
        }

        // Calculate new total price
        const totalPrice = quantity * inventoryItem.Price;

        // Update inventory quantity
        inventoryItem.Quantity -= quantityDifference;
        inventoryItem.Total = inventoryItem.Quantity * inventoryItem.Price;
        await inventoryItem.save();

        // Update consumption record
        const updatedConsumption = await ConsumptionModel.findByIdAndUpdate(
            req.params.id,
            { item, quantity, category, notes, inventoryItemId, totalPrice },
            { new: true }
        );

        res.status(200).json(updatedConsumption);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete consumption record
const deleteConsumption = async (req, res) => {
    try {
        const consumption = await ConsumptionModel.findById(req.params.id);
        if (!consumption) {
            return res.status(404).json({ message: "Consumption record not found" });
        }

        // Find the inventory item
        const inventoryItem = await InventoryModel.findById(consumption.inventoryItemId);
        if (!inventoryItem) {
            return res.status(404).json({ message: "Inventory item not found" });
        }

        // Restore quantity to inventory
        inventoryItem.Quantity += consumption.quantity;
        inventoryItem.Total = inventoryItem.Quantity * inventoryItem.Price;
        await inventoryItem.save();

        // Delete consumption record
        await ConsumptionModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Consumption record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createConsumption,
    getAllConsumption,
    getConsumptionById,
    updateConsumption,
    deleteConsumption
}; 