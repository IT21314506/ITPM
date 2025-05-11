/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import InventoryUpdateForm from './updateInventory';
import Navbar from '../Navbar';

const InventoryTable = ({ inventory, setInventory }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchName, setSearchName] = useState('');
    const [filteredInventory, setFilteredInventory] = useState(inventory);
    const [reportFormat, setReportFormat] = useState('pdf');

    const exchangeRate = 300;
    const convertToRs = (usd) => (usd * exchangeRate).toFixed(2);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/inventory');
            setInventory(response.data);
            setFilteredInventory(response.data);
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
                setFilteredInventory(filteredInventory.filter(item => item._id !== id));
                setError('');
            } catch (error) {
                console.error('Error deleting item:', error);
                const errorMessage = error.response?.data?.message ||
                    error.response?.status === 404 ? 'Item not found' :
                    error.response?.status === 403 ? 'You are not authorized to delete this item' :
                    'Failed to delete item. Please try again.';
                setError(errorMessage);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    const handleSearchByName = () => {
        if (!searchName) {
            setFilteredInventory(inventory);
            setError('');
            return;
        }
        const results = inventory.filter(item =>
            item.item.toLowerCase().includes(searchName.toLowerCase())
        );
        if (results.length > 0) {
            setFilteredInventory(results);
            setError('');
        } else {
            setFilteredInventory([]);
            setError('No items found with that name');
            setTimeout(() => setError(''), 5000);
        }
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Inventory Report', 14, 22);
        doc.setFontSize(11);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        const tableColumn = ["Item", "Quantity", "Price (Rs.)", "Category", "Total (Rs.)"];
        const tableRows = filteredInventory.map(item => [
            item.item,
            item.Quantity,
            `Rs ${convertToRs(item.Price)}`,
            item.Category,
            `Rs ${convertToRs(item.Price * item.Quantity)}`
        ]);

        doc.autoTable({
            startY: 40,
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [0, 105, 148], textColor: [255, 255, 255] },
            theme: 'grid',
            margin: { top: 40 }
        });

        doc.save('inventory_report.pdf');
    };

    const generateCSVReport = () => {
        const headers = ["Item,Quantity,Price (Rs.),Category,Total (Rs.)"];
        const rows = filteredInventory.map(item =>
            `${item.item},${item.Quantity},${convertToRs(item.Price)},${item.Category},${convertToRs(item.Price * item.Quantity)}`
        );
        const csvContent = [...headers, ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'inventory_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleGenerateReport = () => {
        if (reportFormat === 'pdf') {
            generatePDFReport();
        } else {
            generateCSVReport();
        }
    };

    const handleUpdateSuccess = (updatedItem) => {
        setInventory(inventory.map(item => item._id === updatedItem._id ? updatedItem : item));
        setFilteredInventory(filteredInventory.map(item => item._id === updatedItem._id ? updatedItem : item));
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
        <div>
            <Navbar/>        <div className="container mx-auto p-6 bg-gray-100 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-cyan-800"></h2>
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                        <select
                            value={reportFormat}
                            onChange={(e) => setReportFormat(e.target.value)}
                            className="py-3 px-4 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 text-cyan-900"
                        >
                            <option value="pdf">PDF</option>
                            <option value="csv">CSV</option>
                        </select>
                        <button
                            onClick={handleGenerateReport}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Generate Report
                        </button>
                    </div>
                    <a
                        href="/addinventory"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Add New Item
                    </a>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-cyan-700 text-sm font-semibold mb-2" htmlFor="searchName">
                    Search by Item Name
                </label>
                <div className="flex max-w-md">
                    <input
                        type="text"
                        id="searchName"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full py-3 px-4 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 text-cyan-900 placeholder-gray-400 transition-all duration-300"
                        placeholder="Enter item name"
                    />
                    <button
                        onClick={handleSearchByName}
                        className="ml-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                    >
                        Search
                    </button>
                </div>
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
            ) : filteredInventory && filteredInventory.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-cyan-200">
                    <table className="min-w-full">
                        <thead className="bg-cyan-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Item</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Quantity</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Price (Rs)</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Category</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Total (Rs)</th>
                                <th className="py-3 px-4 text-left text-sm font-semibold text-cyan-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cyan-100">
                            {filteredInventory.map(item => (
                                <tr key={item._id} className="hover:bg-cyan-50 transition-all duration-200">
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.item}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.Quantity}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">Rs {convertToRs(item.Price)}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">{item.Category}</td>
                                    <td className="py-3 px-4 text-sm text-cyan-900">Rs {convertToRs(item.Price * item.Quantity)}</td>
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import InventoryUpdateForm from './updateInventory';
import Navbar from '../Navbar';

const InventoryTable = ({ inventory, setInventory }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchName, setSearchName] = useState('');
    const [filteredInventory, setFilteredInventory] = useState(inventory);
    const [reportFormat, setReportFormat] = useState('pdf');

    const exchangeRate = 300;
    const convertToRs = (usd) => (usd * exchangeRate).toFixed(2);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/inventory');
            setInventory(response.data);
            setFilteredInventory(response.data);
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
                setFilteredInventory(filteredInventory.filter(item => item._id !== id));
                setError('');
            } catch (error) {
                console.error('Error deleting item:', error);
                const errorMessage = error.response?.data?.message ||
                    error.response?.status === 404 ? 'Item not found' :
                    error.response?.status === 403 ? 'You are not authorized to delete this item' :
                    'Failed to delete item. Please try again.';
                setError(errorMessage);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    const handleSearchByName = () => {
        if (!searchName) {
            setFilteredInventory(inventory);
            setError('');
            return;
        }
        const results = inventory.filter(item =>
            item.item.toLowerCase().includes(searchName.toLowerCase())
        );
        if (results.length > 0) {
            setFilteredInventory(results);
            setError('');
        } else {
            setFilteredInventory([]);
            setError('No items found with that name');
            setTimeout(() => setError(''), 5000);
        }
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Inventory Report', 14, 22);
        doc.setFontSize(11);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        const tableColumn = ["Item", "Quantity", "Price (Rs.)", "Category", "Total (Rs.)"];
        const tableRows = filteredInventory.map(item => [
            item.item,
            item.Quantity,
            `Rs ${convertToRs(item.Price)}`,
            item.Category,
            `Rs ${convertToRs(item.Price * item.Quantity)}`
        ]);

        doc.autoTable({
            startY: 40,
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [0, 105, 148], textColor: [255, 255, 255] },
            theme: 'grid',
            margin: { top: 40 }
        });

        doc.save('inventory_report.pdf');
    };

    const generateCSVReport = () => {
        const headers = ["Item,Quantity,Price (Rs.),Category,Total (Rs.)"];
        const rows = filteredInventory.map(item =>
            `${item.item},${item.Quantity},${convertToRs(item.Price)},${item.Category},${convertToRs(item.Price * item.Quantity)}`
        );
        const csvContent = [...headers, ...rows].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'inventory_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleGenerateReport = () => {
        if (reportFormat === 'pdf') {
            generatePDFReport();
        } else {
            generateCSVReport();
        }
    };

    const handleUpdateSuccess = (updatedItem) => {
        setInventory(inventory.map(item => item._id === updatedItem._id ? updatedItem : item));
        setFilteredInventory(filteredInventory.map(item => item._id === updatedItem._id ? updatedItem : item));
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
                    <p className="text-xl text-blue-700 animate-pulse">Loading inventory...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6 bg-gray-100 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-blue-800"></h2>
                    <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                            <select
                                value={reportFormat}
                                onChange={(e) => setReportFormat(e.target.value)}
                                className="py-3 px-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-blue-900"
                            >
                                <option value="pdf">PDF</option>
                                <option value="csv">CSV</option>
                            </select>
                            <button
                                onClick={handleGenerateReport}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Generate Report
                            </button>
                        </div>
                        <a
                            href="/addinventory"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Add New Item
                        </a>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-blue-700 text-sm font-semibold mb-2" htmlFor="searchName">
                        Search by Item Name
                    </label>
                    <div className="flex max-w-md">
                        <input
                            type="text"
                            id="searchName"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            className="w-full py-3 px-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-blue-900 placeholder-gray-400 transition-all duration-300"
                            placeholder="Enter item name"
                        />
                        <button
                            onClick={handleSearchByName}
                            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                        >
                            Search
                        </button>
                    </div>
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
                ) : filteredInventory && filteredInventory.length > 0 ? (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-blue-200">
                        <table className="min-w-full">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700">Item</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700">Quantity</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700">Price (Rs)</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700">Category</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700">Total (Rs)</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-blue-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-100">
                                {filteredInventory.map(item => (
                                    <tr key={item._id} className="hover:bg-blue-50 transition-all duration-200">
                                        <td className="py-3 px-4 text-sm text-blue-900">{item.item}</td>
                                        <td className="py-3 px-4 text-sm text-blue-900">{item.Quantity}</td>
                                        <td className="py-3 px-4 text-sm text-blue-900">Rs {convertToRs(item.Price)}</td>
                                        <td className="py-3 px-4 text-sm text-blue-900">{item.Category}</td>
                                        <td className="py-3 px-4 text-sm text-blue-900">Rs {convertToRs(item.Price * item.Quantity)}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => setEditingItem(item)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
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
                    <div className="text-center py-8 bg-white rounded-lg shadow-md border border-blue-200">
                        <p className="text-blue-700 text-lg">No inventory items available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const InventoryView = () => {
    const [inventory, setInventory] = useState([]);
    return <InventoryTable inventory={inventory} setInventory={setInventory} />;
};

export default InventoryView;