import React from 'react';
import RealEstateForm from './RealEstateForm';

function RealEstateModal({ realEstate, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Edit Real Estate</h3>
        <RealEstateForm
          initialData={realEstate}
          onSuccess={onSave}
          isEditing={true}
        />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RealEstateModal;
