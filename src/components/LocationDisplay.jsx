import React from 'react';

export const LocationDisplay = ({ onRequestLocation }) => (
    <button
        onClick={onRequestLocation}
        className="text-white hover:text-green-400 font-medium text-sm md:text-base border border-transparent hover:border-green-400 px-3 py-1 rounded-md transition-colors"
    >
        Set Location
    </button>
);
