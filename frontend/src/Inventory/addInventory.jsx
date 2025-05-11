/*
import React, { useState } from 'react';
import axios from 'axios';

const InventoryAddForm = ({ onAddSuccess }) => {
    const [formData, setFormData] = useState({
        item: '',
        Quantity: '',
        Price: '',
        Category: ''
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
            const response = await axios.post('http://localhost:3000/api/inventory', {
                ...formData,
                Quantity: parseInt(formData.Quantity),
                Price: parseFloat(formData.Price)
            });
            setFormData({ item: '', Quantity: '', Price: '', Category: '' });
            setError('');
            if (onAddSuccess) onAddSuccess(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding inventory item');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Inventory Item</h2>
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
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InventoryAddForm;
*/

import React, { useState } from 'react';
import axios from 'axios';

const InventoryAddForm = ({ onAddSuccess }) => {
    const [formData, setFormData] = useState({
        item: '',
        Quantity: '',
        Price: '',
        Category: ''
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
            const response = await axios.post('http://localhost:3000/api/inventory', {
                ...formData,
                Quantity: parseInt(formData.Quantity),
                Price: parseFloat(formData.Price)
            });
            setFormData({ item: '', Quantity: '', Price: '', Category: '' });
            setError('');
            if (onAddSuccess) onAddSuccess(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding inventory item');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg bg-gray-100 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-cyan-800">Add New Inventory Item</h2>
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-pulse">
                    {error}
                </div>
            )}
            <div className="bg-white p-8 rounded-lg shadow-md border border-cyan-200 transition-transform hover:scale-[1.02]">
                <div>
                    <div className="mb-5">
                        <label className="block text-cyan-700 text-sm font-semibold mb-2" htmlFor="item">
                            Item Name
                        </label>
                        <input
                            type="text"
                            name="item"
                            id="item"
                            value={formData.item}
                            onChange={handleChange}
                            className="w-full py-3 px-4 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter item name"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-cyan-700 text-sm font-semibold mb-2" htmlFor="Quantity">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="Quantity"
                            id="Quantity"
                            value={formData.Quantity}
                            onChange={handleChange}
                            className="w-full py-3 px-4 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter quantity"
                            required
                            min="0"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-cyan-700 text-sm font-semibold mb-2" htmlFor="Price">
                            Price
                        </label>
                        <input
                            type="number"
                            name="Price"
                            id="Price"
                            value={formData.Price}
                            onChange={handleChange}
                            className="w-full py-3 px-4 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter price"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-cyan-700 text-sm font-semibold mb-2" htmlFor="Category">
                            Category
                        </label>
                        <input
                            type="text"
                            name="Category"
                            id="Category"
                            value={formData.Category}
                            onChange={handleChange}
                            className="w-full py-3 px-4 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter category"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryAddForm;