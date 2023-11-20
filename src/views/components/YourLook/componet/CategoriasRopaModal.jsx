import React, { useState } from 'react';
import { Modal, Button, Radio } from 'antd';

const CategoriasRopaModal = ({ visible, onClose, onCategoriaSeleccionada }) => {
  const [categoria, setCategoria] = useState(null);

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleAceptar = () => {
    if (categoria) {
      onCategoriaSeleccionada(categoria);
      onClose();
    }
  };

  const handleCancelar = () => {
    onClose();
  };

  return (
    
    <Modal
      title="Seleccionar Categoría de Ropa"
      visible={visible}
      onOk={handleAceptar}
      onCancel={handleCancelar}
    >
      <Radio.Group onChange={handleCategoriaChange} value={categoria}>
      <Radio value="">Todas</Radio>
        <Radio value="camisetas">Camisetas</Radio>
        <Radio value="pantalones">Pantalones</Radio>
        <Radio value="vestidos">Vestidos</Radio>
        {/* Agrega más opciones según tus categorías */}
      </Radio.Group>
    </Modal>
  );
};
export default CategoriasRopaModal;