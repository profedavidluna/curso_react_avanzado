import React, { useState } from 'react';
import ModalNew from '@/commons/components/ModalNew';

function DemoModalNew() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      <ModalNew isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalNew.Header>
          Título del Modal
        </ModalNew.Header>
        <ModalNew.Body>
          <p>Este es el contenido del modal.</p>
        </ModalNew.Body>
        <ModalNew.Footer>
          <button onClick={() => setIsOpen(false)}>Cerrar</button>
        </ModalNew.Footer>
      </ModalNew>
    </div>
  );
}

export default DemoModalNew;