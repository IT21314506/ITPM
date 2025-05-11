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
*/

import React, { useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

const InventoryAddForm = ({ onAddSuccess }) => {
    const [formData, setFormData] = useState({
        item: '',
        Quantity: '',
        Price: '',
        Category: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Item name validation
        if (!formData.item.trim()) {
            newErrors.item = 'Item name is required';
        } else if (formData.item.length < 2) {
            newErrors.item = 'Item name must be at least 2 characters';
        } else if (formData.item.length > 50) {
            newErrors.item = 'Item name must be less than 50 characters';
        }

        // Quantity validation
        if (!formData.Quantity) {
            newErrors.Quantity = 'Quantity is required';
        } else if (isNaN(formData.Quantity) || parseInt(formData.Quantity) < 0) {
            newErrors.Quantity = 'Quantity must be a non-negative number';
        } else if (parseInt(formData.Quantity) > 10000) {
            newErrors.Quantity = 'Quantity cannot exceed 10,000';
        }

        // Price validation
        if (!formData.Price) {
            newErrors.Price = 'Price is required';
        } else if (isNaN(formData.Price) || parseFloat(formData.Price) < 0) {
            newErrors.Price = 'Price must be a non-negative number';
        } else if (parseFloat(formData.Price) > 1000000) {
            newErrors.Price = 'Price cannot exceed $1,000,000';
        } else if (!/^\d+(\.\d{1,2})?$/.test(formData.Price)) {
            newErrors.Price = 'Price must have at most 2 decimal places';
        }

        // Category validation
        if (!formData.Category.trim()) {
            newErrors.Category = 'Category is required';
        } else if (formData.Category.length < 2) {
            newErrors.Category = 'Category must be at least 2 characters';
        } else if (formData.Category.length > 30) {
            newErrors.Category = 'Category must be less than 30 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Real-time validation
        const newErrors = { ...errors };
        if (value && errors[name]) {
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3000/api/inventory', {
                ...formData,
                Quantity: parseInt(formData.Quantity),
                Price: parseFloat(formData.Price)
            });
            setFormData({ item: '', Quantity: '', Price: '', Category: '' });
            setErrors({});
            if (onAddSuccess) onAddSuccess(response.data);
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Error adding inventory item' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar/>
        <div className="container mx-auto p-6 max-w-lg bg-gray-100 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-cyan-800">Add New Inventory Item</h2>
            {errors.submit && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-pulse">
                    {errors.submit}
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
                            className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300 ${
                                errors.item ? 'border-red-500 focus:ring-red-500' : 'border-cyan-300 focus:ring-cyan-500'
                            }`}
                            placeholder="Enter item name"
                            required
                        />
                        {errors.item && (
                            <p className="text-red-500 text-xs mt-1">{errors.item}</p>
                        )}
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
                            className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300 ${
                                errors.Quantity ? 'border-red-500 focus:ring-red-500' : 'border-cyan-300 focus:ring-cyan-500'
                            }`}
                            placeholder="Enter quantity"
                            required
                            min="0"
                        />
                        {errors.Quantity && (
                            <p className="text-red-500 text-xs mt-1">{errors.Quantity}</p>
                        )}
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
                            className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300 ${
                                errors.Price ? 'border-red-500 focus:ring-red-500' : 'border-cyan-300 focus:ring-cyan-500'
                            }`}
                            placeholder="Enter price"
                            required
                            min="0"
                            step="0.01"
                        />
                        {errors.Price && (
                            <p className="text-red-500 text-xs mt-1">{errors.Price}</p>
                        )}
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
                            className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300 ${
                                errors.Category ? 'border-red-500 focus:ring-red-500' : 'border-cyan-300 focus:ring-cyan-500'
                            }`}
                            placeholder="Enter category"
                            required
                        />
                        {errors.Category && (
                            <p className="text-red-500 text-xs mt-1">{errors.Category}</p>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105 ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-700'
                            }`}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Item'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default InventoryAddForm;