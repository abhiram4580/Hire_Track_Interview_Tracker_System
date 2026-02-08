import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "User confirmation needed",
  message = "You sure you want to delete this item?",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {/* Header */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#374151", margin: 0 }}>
                    {title}
                </h3>
            </div>

            {/* Body */}
            <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: "16px", color: "#4b5563", margin: 0 }}>
                    {message}
                </p>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", display: "flex", justifyContent: "flex-end", gap: "12px", background: "#f9fafb" }}>
                <button
                    onClick={onClose}
                    style={{
                        padding: "8px 16px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#374151",
                        background: "white",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f3f4f6";
                        e.currentTarget.style.borderColor = "#9ca3af";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
                    style={{
                        padding: "8px 24px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "white",
                        background: "#ef4444", // Red based on screenshot OK button color
                        border: "1px solid #dc2626",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.15s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#dc2626"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#ef4444"}
                >
                    OK
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
