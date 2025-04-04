interface ModalProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children }) => {
if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            // onClick={onClose}
        >
            <div className="relative bg-secondaryBg p-6 rounded-lg shadow-lg w-96 text-center">
                {/* Close Button (X) - Now correctly positioned inside the modal */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-6 text-white text-2xl font-bold hover:text-gray-300"
                >
                    ✕
                </button>

                <div className="my-4">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-captionColor font-semibold tracking-wider">{description}</p>
                </div>
                <div> {children} </div>
                <button 
                    onClick={onClose} 
                    className="mt-4 bg-ctaColor text-black font-bold tracking-wider px-4 py-2 rounded hover:opacity-80"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
