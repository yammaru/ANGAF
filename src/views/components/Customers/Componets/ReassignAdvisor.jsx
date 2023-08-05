import { connect } from "react-redux";
import React, { useState, useContext } from "react";
import { useCustomers } from './Hooks/UseCustomers';
import { UserAddOutlined } from '@ant-design/icons';
import { CustomerContext } from "./CustomerProvider";
import { success, error } from "../../../handle/Notification/Notification";
import { Form, Input, Button, DatePicker, Select, Modal, Tooltip } from 'antd';
import { dateFormat, validateDateGreaterThanCurrentDate } from "../../../handle/HandleDatePicker/HandleDate";
import { reassignmentAssessorCustomerById, fetchAllCustomer } from '../../../../redux/actions/Customer/CustomerAction';

const ReassignAdvisor = ({dispatchReassignmentAssessorCustomerAction,  dispatchFetchAllCustomerAction}) => {

  const validateMessages = {
	  // eslint-disable-next-line no-template-curly-in-string
    required: '${label} es requerido',
  };

  const [form] = Form.useForm();
  const { request } = useContext(CustomerContext);

  const {
    visible, setVisible
  } = useCustomers();

  const [currentAdviser] = useState(request.customer.adviserName);
  const [newAdviser, setNewAdviser] = useState('');
  const [date, setDate] = useState('');

  const reassignAdvisorData = {
    assessor : newAdviser,
    reassignment_date: date
  };
  

  const showModal = () => {
    setVisible(true);
  };

  const captureDate = (date) => {
    if (date != null) {
      setDate(date.format(dateFormat));
    }
    
  }

  const sendData = () => {
    dispatchReassignmentAssessorCustomerAction(request.customer.id, reassignAdvisorData, (response) => {
      if(response.error){
        error(response.message);
      }else{
        success('Reasignacion de Asesor Actualizada');
        setVisible(false);
      }
      dispatchFetchAllCustomerAction();
    });
  };

  const textReassignAdvisor = <span style={{ color: '#6A6963' }}>Reasignar asesor</span>
  return (

    <>
      <Tooltip placement="left" color='#ffffff' title={textReassignAdvisor}>
        <Button type='primary' size='small' onClick={showModal} icon={<UserAddOutlined/>}/>
      </Tooltip>
      <Modal
        title={'Reasignar asesores'}
        centered
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
      >
        <Form
          name="nest-messages"
          layout="vertical"
          form={form}
          onFinish={sendData}
          style={{ height: '100%', width: "100%" }}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Anterior Asesor:"
            name="currentAdviser"
            
          >
            <Input defaultValue={currentAdviser} disabled={true} />
          </Form.Item>
          <Form.Item
            name='newAdviser'
            label='Asesor'
            rules={[{ required: true }]}
          >
            <Select
              onChange={setNewAdviser}
              placeholder="Elija un asesor"
              style={{ width: '100%' }}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="">Seleccione...</Select.Option>
              {
                request.selectAsessorOptions.map(item => (
                  <Select.Option key={item?.id+item?.name+item?.id} value={item.id}>{item.name}</Select.Option>
                ))
              }
            </Select>

          </Form.Item>
          <Form.Item
            name='date'
            label="Fecha de Expiracion"
            rules={[
              {
                required: true
              },
              () => ({
                validator(_, value) {
                  return validateDateGreaterThanCurrentDate(value);
                },
              }),
            ]}
          >
            <DatePicker
              value={date}
              format={dateFormat}
              onChange={(value) => captureDate(value)}
              style={{ width: '100%' }}
              placeholder="Ingrese la fecha de expiracion"
            />
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
  dispatchReassignmentAssessorCustomerAction: (id, reassignAdvisorData, onSuccess, onError) =>
    dispatch(reassignmentAssessorCustomerById(id, reassignAdvisorData, onSuccess, onError)),
  dispatchFetchAllCustomerAction: () => dispatch(fetchAllCustomer()),
});

export default connect(null, mapDispatchToProps)(ReassignAdvisor);
