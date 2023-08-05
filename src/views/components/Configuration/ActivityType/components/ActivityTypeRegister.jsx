
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import * as constants from "../../../../../redux/constants";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { errorGlobal, success } from "../../../../handle/Notification/Notification";
import {validatePermission} from "../../../../handle/PermissionMethods/PermissionMethods";
import { createActivityType, fetchAllActivityType } from '../../../../../redux/actions/Configuration/ActivityTypeAction';

const RegisterType = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState();
  const [refresh, refreshPage] = useState();

  useEffect(() => {
	  refreshPage({})
	  form.setFieldsValue({ name: '', state: false })
  }, [])

  useEffect(() => {
    form.submit()

  }, [refresh])

  const onReset = () => {
    form.resetFields();
  }

  const onClose = () => {
    onReset()
    setIsModalVisible(false);

  }

  const showModal = () => {
    setIsModalVisible(true);
  }

  const validateMessages = {
	  // eslint-disable-next-line no-template-curly-in-string
    required: '${label} es requerido',
  };


  const sendData = (values) => {
  
    dispatch(createActivityType(values, async (response) => {
      const res = await response;
      if (res.error) {
 
        errorGlobal('¡UPS! Ocurrió un error mientras se registraba');
        onClose();
        onReset();
        dispatch(fetchAllActivityType());
      }
      else {
        success('Tipo de actividad registrado');
        onClose();
        onReset();
      }
    }));
    dispatch(fetchAllActivityType());

  }
	if (!validatePermission(constants.CREATE_ACTIVITY_TYPE_PERMISSION)) {
		return null;
	}
  return (
    <>
      <Button
        type="primary" onClick={showModal} icon={<PlusOutlined />}
      > Nuevo
      </Button>
      <Modal
        title="Nuevo Tipo de actividad"
        centered
        visible={isModalVisible}
        footer={false}
        onCancel={onClose}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          style={{ height: '100%', width: "100%" }}
          onFinish={(values) => sendData(values)}
          form={form}
          validateMessages={validateMessages}
         
        >
          <Form.Item
            label="Nombre:"
            name="name"
            rules={[{
              required: true,
              min: 5,
              max: 40,
              validator: async (_, value) => {
                let spaces = /^(?!\s)/;

                if (value.length < 5) {
                  return Promise.reject(new Error('El nombre debe tener al menos 5 caracteres.'));
                } else if (!spaces.test(value)) {
                  return Promise.reject(new Error('Nombre no válido'));
                }
              }
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="state" valuePropName="checked"> 
            <Checkbox>Activo</Checkbox>
          </Form.Item>
          <Form.Item>
          <Button
                type="primary"
                htmlType="submit"
                style={{ position: 'absolute', right: 1, top: 20 }}
                
              >
                Guardar
              </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterType;