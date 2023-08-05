import { connect } from 'react-redux';
import {EditOutlined} from '@ant-design/icons';
import React,{ useState , useContext } from "react";
import {OccupationContext}  from './OccupationProvider';
import { Form, Input, Button,Modal,Tooltip,Checkbox , notification} from 'antd';
import { updateOccupationById , fetchAllOccupation  } from '../../../../../redux/actions/Configuration/OccupationAction';

const OccupationUpdate = ({dispatchUpdateOccupationAction,dispatchFetchAllOccupationAction}) => {

	const [form] = Form.useForm();
  const {Occupation} = useContext(OccupationContext);
  const [id, setId] = useState(Occupation.id);
  const [name, setName] = useState(Occupation.name);
  const [state, setState] = useState(Occupation.state);
  const [isModalVisible, setIsModalVisible] = useState(false);

	// eslint-disable-next-line no-template-curly-in-string
  const validateMessages = { required: '${label} es requerido'};
  const textEditar= <span	style={{color:'#6A6963'}}>Editar</span>
  const errors = [];

  const occupationUpdateData = (
    {
      name: name,
		  state: state
    }
		
  )

  const onClose = () =>{ 
    setIsModalVisible(false);
  };

  const onReset = () => form.resetFields();

  const updateStateModule = () =>{
    setName(Occupation.name);
    setState(Occupation.state);
    setId(Occupation.id);
  };

  const showModal = () =>{
    setIsModalVisible(true);
    updateStateModule();
  };

  const fillFields = () =>{
    form.setFieldsValue({
      name: name
    });
  };
  const onFinish = () => {
    dispatchUpdateOccupationAction(id,occupationUpdateData, (response) => {
      if (response.error) {
        error(response.message);
      }
      else {
        success('Ocupación actualizada');
      }
    });
    dispatchFetchAllOccupationAction();
  };

  const success = (response) => {
    openNotificationWithIcon('success', response);
    onClose();
    onReset();
    dispatchFetchAllOccupationAction();
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
          <Button onClick={() => {fillFields();showModal()}} 
           type="primary" 
           style={{ backgroundColor: '#ffa247',borderColor: '#ffa247'}}
           size={'small'}
           icon={<EditOutlined /> }>
           
           </Button>
      </Tooltip>
      <Modal
        title={'Actualizar ocupación'} 
				centered
				visible={isModalVisible} 
				footer={false} 
				onCancel={onClose}
      >
        <Form 
          layout="vertical" 
          onFinish={onFinish} 
          style={{ height: '100%', width: "100%" }}
          form={form}
          validateMessages={validateMessages}
        >
			    <Form.Item 
            label="Nombre:"
            name="name"
            rules={[{ required: true}]}
          >
				    <Input
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="state"           
          >
				    <Checkbox            
            checked={state}
            onChange={(e) => setState( e.target.checked )}
            >
              Activo
            </Checkbox>
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
    
    dispatchUpdateOccupationAction: (id,occupationUpdateData, onSuccess, onError) => 
    
      dispatch(updateOccupationById(id,occupationUpdateData,onSuccess,onError)),
    dispatchFetchAllOccupationAction: () => dispatch(fetchAllOccupation())
  })

  

export default connect(null,mapDispatchToProps)(OccupationUpdate);