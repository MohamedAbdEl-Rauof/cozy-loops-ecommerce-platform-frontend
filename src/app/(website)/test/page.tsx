'use client';

import { useEffect } from 'react';
import { useCategoryStore } from '@/store/categoryStore';

export default function CategoryList() {
    const {
        categories,
        loading,
        error,
        fetchCategories
    } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-lg">Loading categories...</div>
        </div>
    );
    
    if (error) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-red-500 text-lg">Error: {error}</div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Categories</h1>
            
            {categories.length === 0 ? (
                <div className="text-center text-gray-500">No categories found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div 
                            key={category._id} 
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Category Image */}
                            {category.image && (
                                <div className="relative h-48 w-full">
                                    <img 
                                        src={category.image} 
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {category.featured && (
                                        <div className="absolute top-2 right-2">
                                            <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded">
                                                Featured
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {/* Category Content */}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {category.name}
                                </h3>
                                
                                {category.description && (
                                    <p className="text-gray-600 mb-3 text-sm line-clamp-3">
                                        {category.description}
                                    </p>
                                )}
                                
                                {/* Category Stats */}
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                                    <span>Products: {category.productCount}</span>
                                    <span>Level: {category.level}</span>
                                </div>
                                
                                {/* Category Button */}
                                {category.buttonText && (
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200">
                                        {category.buttonText}
                                    </button>
                                )}
                                
                                {/* Category Status */}
                                <div className="flex gap-2 mt-3">
                                    <span className={`px-2 py-1 text-xs rounded ${
                                        category.isActive 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {category.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                    
                                    {category.featured && (
                                        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                                            Featured
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Debug Info */}
            <div className="mt-8 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Debug Info:</h3>
                <p>Total Categories: {categories.length}</p>
                <p>Featured Categories: {categories.filter(cat => cat.featured).length}</p>
                <p>Active Categories: {categories.filter(cat => cat.isActive).length}</p>
            </div>
        </div>
    );
}