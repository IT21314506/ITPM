/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import InventoryUpdateForm from './updateInventory';

const InventoryTable = ({ inventory, setInventory }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/inventory');
            setInventory(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching inventory:', error);
            setError('Failed to load inventory items');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:3000/api/inventory/${id}`);
                setInventory(inventory.filter(item => item._id !== id));
                setError('');
            } catch (error) {
                console.error('Error deleting item:', error);
                setError('Failed to delete item');
            }
        }
    };

    const handleUpdateSuccess = (updatedItem) => {
        setInventory(inventory.map(item => item._id === updatedItem._id ? updatedItem : item));
        setEditingItem(null);
        setError('');
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-cyan-700 animate-pulse">Loading inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cyan-800">HomeStock Inventory Management</h2>
                <a
                    href="/addinventory"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    Add New Item
                </a>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-pulse">
                    {error}
                </div>
            )}

            {editingItem ? (
                <InventoryUpdateForm
                    itemData={editingItem}
                    onUpdateSuccess={handleUpdateSuccess}
                    onCancel={handleCancelEdit}
                />
            ) : inventory && inventory.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-cyan-200">
                    <table className="min-w-full">
                        <thead className="bg-cyan-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Item</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Quantity</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Price</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Category</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Total</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cyan-100">
                            {inventory.map(item => (
                                <tr key={item._id} className="hover:bg-cyan-50 transition-all duration-200">
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.item}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.Quantity}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">${item.Price.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.Category}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">${item.Total.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setEditingItem(item)}
                                                className="text-cyan-600 hover:text-cyan-800 transition-colors duration-200"
                                                title="Edit"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                title="Delete"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-md border border-cyan-200">
                    <p className="text-cyan-700 text-lg">No inventory items available.</p>
                </div>
            )}
        </div>
    );
};

const InventoryView = () => {
    const [inventory, setInventory] = useState([]);
    return <InventoryTable inventory={inventory} setInventory={setInventory} />;
};

export default InventoryView;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import InventoryUpdateForm from './updateInventory';

const InventoryTable = ({ inventory, setInventory }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Static exchange rate: 1 USD = 300 LKR (adjust as needed or fetch from an API)
    const exchangeRate = 300;

    const convertToLKR = (usd) => {
        return (usd * exchangeRate).toFixed(2);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/inventory');
            setInventory(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching inventory:', error);
            setError(error.response?.data?.message || 'Failed to load inventory items');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:3000/api/inventory/${id}`);
                setInventory(inventory.filter(item => item._id !== id));
                setError('');
            } catch (error) {
                console.error('Error deleting item:', error);
                // Provide specific error message based on API response
                const errorMessage = error.response?.data?.message || 
                    error.response?.status === 404 ? 'Item not found' :
                    error.response?.status === 403 ? 'You are not authorized to delete this item' :
                    'Failed to delete item. Please try again.';
                setError(errorMessage);
                // Optional: Clear error after 5 seconds
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    const handleUpdateSuccess = (updatedItem) => {
        setInventory(inventory.map(item => item._id === updatedItem._id ? updatedItem : item));
        setEditingItem(null);
        setError('');
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
    };

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-cyan-700 animate-pulse">Loading inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cyan-800">HomeStock Inventory Management</h2>
                <a
                    href="/addinventory"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    Add New Item
                </a>
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-pulse">
                    {error}
                </div>
            )}

            {editingItem ? (
                <InventoryUpdateForm
                    itemData={editingItem}
                    onUpdateSuccess={handleUpdateSuccess}
                    onCancel={handleCancelEdit}
                />
            ) : inventory && inventory.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-cyan-200">
                    <table className="min-w-full">
                        <thead className="bg-cyan-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Item</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Quantity</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Price (LKR)</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Category</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Total (LKR)</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cyan-100">
                            {inventory.map(item => (
                                <tr key={item._id} className="hover:bg-cyan-50 transition-all duration-200">
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.item}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.Quantity}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">LKR {convertToLKR(item.Price)}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.Category}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">LKR {convertToLKR(item.Total)}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setEditingItem(item)}
                                                className="text-cyan-600 hover:text-cyan-800 transition-colors duration-200"
                                                title="Edit"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                title="Delete"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-md border border-cyan-200">
                    <p className="text-cyan-700 text-lg">No inventory items available.</p>
                </div>
            )}
        </div>
    );
};

const InventoryView = () => {
    const [inventory, setInventory] = useState([]);
    return <InventoryTable inventory={inventory} setInventory={setInventory} />;
};

export default InventoryView;