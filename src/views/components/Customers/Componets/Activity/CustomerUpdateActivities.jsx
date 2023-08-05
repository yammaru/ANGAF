import moment from 'moment';
import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { success } from '../../../../handle/Notification/Notification';
import { Form, Input, Button, Modal, Tooltip, Row, Col, Checkbox } from 'antd';
import { updateCustomerActivityById } from '../../../../../redux/actions/Customer/CustomerActivityAction';

const CustomerUpdateActvities = (props) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [commentary, setCommentary] = useState("");
    const [activityPerformed] = useState(moment().format("YYYY-MM-DD"));
    const [ setpostponedByCustomer] = useState("");
    const textEditar = <span style={{ color: '#6A6963' }}>Reportar Actividad</span>
    const [visible, setVisible] = useState(false);

    const validateMessages = {
		// eslint-disable-next-line no-template-curly-in-string
        required: '${label} es requerido',
      };

    const { TextArea } = Input;

    const customerUpdateActivity = {
        commentary,
        done: activityPerformed
    };

    const showModal = () => setVisible(true);

    const onClose = () => setVisible(false);

    const onFinish = () => {
        dispatch(updateCustomerActivityById(props.id,customerUpdateActivity));
        updateTabla();
        onClose();
        success('Ha sido agregado con éxito');
        updateTabla();
    };

    const updateTabla = () => { props.myClick()}

    return (
        <>
            <Tooltip placement="left" color='#ffffff' title={textEditar}>
                <Button
    type="primary"
    style={{backgroundColor: '#ffa247', borderColor: '#ffa247'}}
    size={'small'}
    onClick={showModal}
    icon={<EditOutlined/>}/>
            </Tooltip>

            <Modal
                title={'Actualizar perfil'}
                centered
                visible={visible}
                footer={false}
                width={500}
                onCancel={onClose}
            >
                <Form
                    name="nest-messages"
                    layout="vertical"
                    style={{ height: '100%', width: "100%" }}
                    form={form}
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                            <Form.Item
                                label="Comentario"
                                rules={[
                                    { required: true },
                                ]}>
                                <TextArea
                                    value={commentary}
                                    onChange={(e) => setCommentary(e.target.value)}
                                    rows={3}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Checkbox
                            name="postponedByCustomer"
                            onChange={(e) => setpostponedByCustomer(e.target.checked)}
                        >Aplazada por el cliente</Checkbox>
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
}

export default CustomerUpdateActvities;