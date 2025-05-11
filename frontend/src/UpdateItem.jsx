import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        item: "",
        Quantity: "",
        Price: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/shopping-list/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item');
                }
                const data = await response.json();
                setFormData({
                    item: data.item,
                    Quantity: data.Quantity,
                    Price: data.Price
                });
            } catch (error) {
                setError(error.message);
            }
        };
        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:3000/api/shopping-list/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item: formData.item,
                    Quantity: parseInt(formData.Quantity),
                    Price: parseFloat(formData.Price)
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update item');
            }

            // Navigate back to the list view after successful update
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="text-red-500 text-center mt-8">{error}</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Shopping List Item</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="item" className="block text-sm font-medium text-gray-700">
                        Item Name
                    </label>
                    <input
                        type="text"
                        id="item"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="Quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="Quantity"
                        name="Quantity"
                        value={formData.Quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        min="1"
                    />
                </div>

                <div>
                    <label htmlFor="Price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="Price"
                        name="Price"
                        value={formData.Price}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Item'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateItem; 