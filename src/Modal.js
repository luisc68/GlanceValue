import React, { useEffect } from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="container">
        <div className="toggle" onClick={onClose}>
          <input type="checkbox" />
          <span className="button"></span>
          <span className="label">🔙</span>
        </div>
      </div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
