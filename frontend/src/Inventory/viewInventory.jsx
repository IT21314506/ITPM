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
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-600">Loading inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Inventory Management</h2>
                <a 
                    href="/addinventory" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Item
                </a>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
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
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Item</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Quantity</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Total</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inventory.map(item => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-900">{item.item}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{item.Quantity}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">${item.Price.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{item.Category}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">${item.Total.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setEditingItem(item)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                title="Edit"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
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
                <div className="text-center py-8 bg-white rounded-lg shadow">
                    <p className="text-gray-600">No inventory items available.</p>
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
