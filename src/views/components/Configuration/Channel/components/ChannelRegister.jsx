import React, { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { connect, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import * as constants from "../../../../../redux/constants";
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import {validatePermission} from "../../../../handle/PermissionMethods/PermissionMethods";
import { createAllChannel, fetchAllChannel } from '../../../../../redux/actions/Configuration/ChannelAction';

const Channel = ({ dispatchCreateChannelAction, dispatchFetchAllChannelAction }) => {

  const [name, setName] = useState('');
  const [state, setState] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  }

  const onClose = () => {
    setIsModalVisible(false);
  }

  const onReset = () => {
    form.resetFields();
  }

  const validateMessages = {
	  // eslint-disable-next-line no-template-curly-in-string
    required: '${label} es requerido',
  };

  const sendData = async () => {

	  const values = await form.validateFields();
	  values.state = state;
	  dispatch(
		  createAllChannel(values, async (response) => {
			  const res = await response;
			  if (res.error) {
				  errorGlobal("¡UPS!, Ha ocurrido un error");
			  } else {
				  success("Se ha registrado con éxito");
				  onReset();
				  onClose();
				  dispatch(fetchAllChannel());
			  }
		  }, async (error) => {
			  errorGlobal(error);
		  })
	  );
  }
  
	if (!validatePermission(constants.CREATE_CHANNEL_PERMISSION)) {
		return null;
	}
  return (
    <>
      <Button
        type="primary" onClick={showModal} icon={<PlusOutlined />}
      >
        Nuevo
      </Button>
      <Modal
        title="Nuevo ¿Cómo se enteró?"
        centered
        visible={isModalVisible}
        footer={false}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          style={{ height: '100%', width: "100%" }}
          onFinish={sendData}
          validateMessages={validateMessages}
		  form={form}
        >
          <Form.Item
            label="Nombre:"
            name="name"
            rules={[
              {
                required: true,
                min: 3,
                max: 100,
                validator: async (_) => {
					let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
					let spaces = /^(?!\s)/;
                  if (name !== '') {
                    if (name.length < 3) {
                      return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
                    } else if (!chars.test(name)) {
                      return Promise.reject(new Error('El nombre no puede contener caracteres especiales.'));
                    } else if (!spaces.test(name)) {
                      return Promise.reject(new Error('Nombre no válido'));
                    } 
                  }else{
                    return Promise.reject(new Error('Nombre vacío.'));
                  }
                }
              }
            ]}
          >
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}

            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              name="state"
              onChange={(e) => setState(e.target.checked)}
            >Activo</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ position: 'absolute', right: 1, top: 20 }}>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchCreateChannelAction: (channel, onSuccess, onError) =>
    dispatch(createAllChannel(channel, onSuccess, onError)),
  dispatchFetchAllChannelAction: () => dispatch(fetchAllChannel())
})
export default connect(null, mapDispatchToProps)(Channel);