import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ShoppingListView() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/shopping-list');
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleEdit = (id) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/shopping-list/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete item');
                }
                // Refresh the list after deletion
                fetchItems();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto mt-8 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Shopping List</h2>
                <button
                    onClick={() => navigate('/add')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add New Item
                </button>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.item}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.Quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${item.Price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${item.Total.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleEdit(item._id)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Edit"
                                        >
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                        >
                                            <FaTrash className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShoppingListView;