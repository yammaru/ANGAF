import { useContext } from "react";
import { connect } from 'react-redux';
import React, { useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import { AttentionPlacesContext } from './AttentionPlacesProvider';
import { Form, Input, Button, Checkbox, Tooltip, Modal, notification } from 'antd';
import { updateAttentionPlacesById, fetchAllAttentionPlaces } from '../../../../../redux/actions/Configuration/AttentionPlacesAction';

const AttentionPlacesUpdated = ({ dispatchUpdateAttentionPlacesAction, dispatchFetchAllattentionPlacesAction }) => {

  const [form] = Form.useForm();
  const { attentionPlaces } = useContext(AttentionPlacesContext);
  const [name, setName] = useState(attentionPlaces.name);
  const [state, setState] = useState(attentionPlaces.state);
  const [id, setId] = useState(attentionPlaces.id);

  const textEditar = <span style={{ color: '#6A6963' }}> Editar </span>
  const errors = [];

  const validateMessages = {
	  // eslint-disable-next-line no-template-curly-in-string
    required: '${label} es requerido',
  };

  const afilitedCompany = {
    name,
    state
  };

  const [isModalVisible, setIsModalVisible] = useState();

  const onClose = () => {
    setIsModalVisible(false);
    form.resetFields();
  }

  const showModal = () => {
    setIsModalVisible(true);
    updateStateAfiliatedCompany();
  };

  const updateStateAfiliatedCompany = () => {
    setState(attentionPlaces.state);
    setName(attentionPlaces.name);
    setId(attentionPlaces.id);
  }

  const fillFields = () => {
    form.setFieldsValue({
      name: name,
    });
  }

  const onReset = () => form.resetFields();


  const onFinish = () => {
    dispatchUpdateAttentionPlacesAction(id, afilitedCompany, (response) => {
      if (response.error) {
        error(response.message);
      }
      else {
        success('Lugar de atencion Actualizado');
      }
    });
    dispatchFetchAllattentionPlacesAction();
  };

  const success = (response) => {
    openNotificationWithIcon('success', response);
    onClose();
    onReset();
    dispatchFetchAllattentionPlacesAction();
  }

  const error = (response) => {
    for (let key in response) {
      errors.push(`${response[key][0]}`);
    }
    openNotificationWithIcon('error', errors);
    onClose();
    onReset();
  }

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: `${type}:`,
      description:
        `${message.toString()}`
    });
  };

  return (
    <>
      <Tooltip placement="left" color='#ffffff' title={textEditar}>
        <Button
           type="primary"
          style={{ backgroundColor: '#ffa247', borderColor: '#ffa247' }}
          size='small'
          onClick={() => {fillFields();showModal()}} icon={<EditOutlined size='small' />}>
        </Button>
      </Tooltip>
      <Modal
        title='Editar lugar de atención'
        centered
        visible={isModalVisible}
        footer={false}
        onCancel={onClose}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          onFinish={onFinish}
          style={{ height: '100%', width: "100%" }}
          form={form}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Nombre:"
            name="name"
            rules={[{
              required: true,
              validator: async (_, name) => {
                let chars =/^[a-zA-Z\u00C0-\u017F\s]+$/;
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
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              name="state"
              checked={state}
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
  dispatchUpdateAttentionPlacesAction: (id, afilitedCompany, onSuccess, onError) =>
    dispatch(updateAttentionPlacesById(id, afilitedCompany, onSuccess, onError)),
  dispatchFetchAllattentionPlacesAction: () => dispatch(fetchAllAttentionPlaces())

})

export default connect(null, mapDispatchToProps)(AttentionPlacesUpdated);