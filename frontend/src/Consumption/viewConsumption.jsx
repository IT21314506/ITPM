import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import AddConsumption from './addConsumption';

const ConsumptionTable = () => {
    const [consumption, setConsumption] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [totalConsumption, setTotalConsumption] = useState(0);

    useEffect(() => {
        fetchConsumption();
    }, []);

    const fetchConsumption = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/consumption');
            // Ensure each item has a totalPrice, calculate it if missing
            const consumptionWithTotal = response.data.map(item => ({
                ...item,
                totalPrice: item.totalPrice || (item.quantity * (item.inventoryItemId?.Price || 0))
            }));
            setConsumption(consumptionWithTotal);
            // Calculate total consumption value
            const total = consumptionWithTotal.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
            setTotalConsumption(total);
            setError('');
        } catch (error) {
            console.error('Error fetching consumption records:', error);
            setError('Failed to load consumption records');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this consumption record?')) {
            try {
                await axios.delete(`http://localhost:3000/api/consumption/${id}`);
                const updatedConsumption = consumption.filter(item => item._id !== id);
                setConsumption(updatedConsumption);
                // Recalculate total after deletion
                const newTotal = updatedConsumption.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
                setTotalConsumption(newTotal);
                setError('');
            } catch (error) {
                console.error('Error deleting consumption record:', error);
                setError('Failed to delete consumption record');
            }
        }
    };

    const handleAddSuccess = () => {
        setShowAddForm(false);
        fetchConsumption();
    };

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-600">Loading consumption records...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Consumption Records</h2>
                    <p className="text-gray-600 mt-1">
                        Total Consumption Value: ${totalConsumption.toFixed(2)}
                    </p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Record
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {showAddForm ? (
                <AddConsumption onAddSuccess={handleAddSuccess} />
            ) : consumption && consumption.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Item</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Quantity</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Total Price</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Notes</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {consumption.map(item => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm text-gray-900">{item.item}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{item.quantity}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{item.category}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">
                                        {new Date(item.date).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-900">
                                        ${(item.totalPrice || 0).toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{item.notes}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex space-x-3">
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
                    <p className="text-gray-600">No consumption records available.</p>
                </div>
            )}
        </div>
    );
};

export default ConsumptionTable; 