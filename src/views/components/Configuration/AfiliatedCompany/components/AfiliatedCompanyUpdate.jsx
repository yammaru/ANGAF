import { useContext } from "react";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Tooltip, Modal } from 'antd';
import { AfiliatedCompanyContext } from './AfiliatedCompanyProvider';
import { success, errorGlobal } from '../../../../handle/Notification/Notification';
import { updateAfiliatedCompanyById, fetchAllAfiliatedCompany } from '../../../../../redux/actions/Configuration/AfiliatedCompanyAction';

const AfiliatedCompanyUpdate = () => {

	const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { afiliatedCompany } = useContext(AfiliatedCompanyContext);
  const [name, setName] = useState((afiliatedCompany.name == null)?'':afiliatedCompany.name);
  const [state, setState] = useState(true);
  const [id, setId] = useState(afiliatedCompany.id);

  const textEditar = <span style={{ color: '#6A6963' }}> Editar </span>

  const validateMessages = {
	  // eslint-disable-next-line no-template-curly-in-string
    required: '${label} es requerido',
  };

  const [isModalVisible, setIsModalVisible] = useState();

  const onClose = () => {
    setIsModalVisible(false);
    onReset();
  }

  const showModal = () => {
    setIsModalVisible(true);
    updateStateAfiliatedCompany();
  };

  const onReset = () => form.resetFields();

  const updateStateAfiliatedCompany = () => {
    setState(afiliatedCompany.state);
    setName(afiliatedCompany.name);
    setId(afiliatedCompany.id);
  }

  const fillFields = () => {
    form.setFieldsValue({
      name: name,
    });
  }

	const sendData = async () => {
		let values = await form.validateFields();
		values.state = state;
		try {
			dispatch(
				updateAfiliatedCompanyById(id, values, async (response) => {
					const res = await response;
					if (res.error) {
 
						errorGlobal("¡UPS!, Ha ocurrido un error");
					} else {
						success("Empresa afiliada actualizada");
					}
					onClose();
					dispatch(fetchAllAfiliatedCompany());
				}),
			);
		} catch (e) {
		}
  }

  return (
    <>
      <Tooltip placement="left" color='#ffffff' title={textEditar}>
        <Button
         type="primary"
          style={{ backgroundColor: '#ffa247', borderColor: '#ffa247' }}
          size='small'
          onClick={() => {showModal();fillFields()}} icon={<EditOutlined size='small' />}>
        </Button>
      </Tooltip>
      <Modal
        title='Editar empresa afiliada'
        centered
        visible={isModalVisible}
        footer={false}
        onCancel={onClose}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={sendData}
          style={{ height: '100%', width: "100%" }}
          form={form}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Nombre:"
            name="name"
            rules={[{
              required: true, validator: async (_, name) => {
                
                let chars = /^[a-zA-Z\u00C0-\u017F\s]+$/;
                let spaces = /^(?!\s)/;
                if (name.length < 3) {
                  return Promise.reject(new Error('El nombre debe tener al menos 3 caracteres.'));
                } else if (!chars.test(name)) {
                  return Promise.reject(new Error('El nombre no puede contener números.'));
                } else if (!spaces.test(name)) {
                  return Promise.reject(new Error('Nombre no válido'));
                } else {
                  setName(name);
                }
              }
            }]}>
            <Input
              value={name}
            />
          </Form.Item>
          <Form.Item name="state" >
            <Checkbox checked={state} onChange={(e) => setState(e.target.checked)} >Activo</Checkbox>
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

export default AfiliatedCompanyUpdate;