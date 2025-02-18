interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose }) => {
if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose}
        >
            <div className="relative bg-bgColor p-6 rounded-lg shadow-lg w-96 text-center">
                {/* Close Button (X) - Now correctly positioned inside the modal */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-6 text-white text-2xl font-bold hover:text-gray-300"
                >
                    ✕
                </button>

                <div className="my-4">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-gray-400">{description}</p>
                </div>
                

                <button 
                    onClick={onClose} 
                    className="mt-4 bg-neonHotPinkRed text-white px-4 py-2 rounded font-bold hover:bg-pink-700"
                >
                    CLOSE
                </button>
            </div>
        </div>
    );
};

export default Modal;
