import React, { createContext, useContext } from 'react';

// Contexto para compartir la acción de cerrar entre los subcomponentes del Modal
const ModalContext = createContext(null);

export function ModalNew({ isOpen = true, onClose, children }) {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div className="modal-overlay" onClick={onClose || undefined}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

// Subcomponente Cabecera
function ModalHeader({ children }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal.Header debe usarse dentro de <Modal>');

  return (
    <div className="modal-header">
      <h2 className="modal-title">{children}</h2>
      {context.onClose && (
        <button className="modal-close" onClick={context.onClose}>
          &times;
        </button>
      )}
    </div>
  );
}

// Subcomponente Cuerpo
function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
}

// Subcomponente Pie de página (botones de acción)
function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
}

// Vinculación de subcomponentes al objeto principal (Compound Components)
ModalNew.Header = ModalHeader;
ModalNew.Body = ModalBody;
ModalNew.Footer = ModalFooter;

export default ModalNew;
