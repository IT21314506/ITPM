import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddConsumption = ({ onAddSuccess }) => {
    const [formData, setFormData] = useState({
        item: '',
        quantity: '',
        category: '',
        notes: '',
        inventoryItemId: ''
    });
    const [inventoryItems, setInventoryItems] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    const fetchInventoryItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/inventory');
            setInventoryItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            setError('Failed to load inventory items');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // If inventory item is selected, update the form with its details
        if (name === 'inventoryItemId') {
            const selectedItem = inventoryItems.find(item => item._id === value);
            if (selectedItem) {
                setFormData(prev => ({
                    ...prev,
                    item: selectedItem.item,
                    category: selectedItem.Category
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/consumption', {
                ...formData,
                quantity: parseInt(formData.quantity)
            });
            setFormData({
                item: '',
                quantity: '',
                category: '',
                notes: '',
                inventoryItemId: ''
            });
            setError('');
            if (onAddSuccess) onAddSuccess(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding consumption record');
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading inventory items...</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Consumption Record</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inventoryItemId">
                            Select Item
                        </label>
                        <select
                            name="inventoryItemId"
                            id="inventoryItemId"
                            value={formData.inventoryItemId}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select an item</option>
                            {inventoryItems.map(item => (
                                <option key={item._id} value={item._id}>
                                    {item.item} (Available: {item.Quantity})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            id="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            min="1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            id="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="3"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Consumption Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddConsumption; 