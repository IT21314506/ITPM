import React, { useState } from 'react';
import axios from 'axios';

const InventoryUpdateForm = ({ itemData, onUpdateSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        item: itemData.item || '',
        Quantity: itemData.Quantity || '',
        Price: itemData.Price || '',
        Category: itemData.Category || ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/inventory/${itemData._id}`, {
                ...formData,
                Quantity: parseInt(formData.Quantity),
                Price: parseFloat(formData.Price)
            });
            setError('');
            if (onUpdateSuccess) onUpdateSuccess(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating inventory item');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Update Inventory Item</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item">
                            Item Name
                        </label>
                        <input
                            type="text"
                            name="item"
                            id="item"
                            value={formData.item}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Quantity">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="Quantity"
                            id="Quantity"
                            value={formData.Quantity}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            min="0"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Price">
                            Price
                        </label>
                        <input
                            type="number"
                            name="Price"
                            id="Price"
                            value={formData.Price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Category">
                            Category
                        </label>
                        <input
                            type="text"
                            name="Category"
                            id="Category"
                            value={formData.Category}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InventoryUpdateForm;