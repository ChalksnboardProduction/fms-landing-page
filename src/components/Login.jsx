import React from 'react';

const Login = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-[60000] flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <p className="text-gray-600 mb-6">Dummy login modal for testing</p>
                <button onClick={onClose} className="w-full bg-[#3645B9] text-white py-2 rounded-md hover:bg-[#2b3366]">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Login;
