import React, { useState } from 'react';
import { Modal, Button, Tooltip } from 'antd';

const ModalComponent = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  }
	
  return (
    <>
		<Tooltip placement="left" color='#ffffff' title={props?.textEditar}>
			<Button type="primary" style={{ backgroundColor: props.backgroundColor }} size={props.size} onClick={showModal} icon={ props.icon }>{ props.text }</Button>
		</Tooltip>
      <Modal 
				title={props.title} 
				centered
				visible={isModalVisible} 
				footer={false} 
				onCancel={() => closeModal()} 
				width={props.width}
			>
        { props.form  }
      </Modal>
    </>
  );
};

export default ModalComponent;