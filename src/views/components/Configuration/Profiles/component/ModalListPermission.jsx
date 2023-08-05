
import React from "react";
import { Form, Modal } from "antd";
import PermissionList from "./PermissionList";


const ListOfPermission = (props) => {

	const [form] = Form.useForm();

	const onReset = () => {
		form.resetFields();
	}
	const onFinish = () => {
		onReset()
	}

	const onClose = () => {
		props.onClose(false);
	}
	
	return (
		<>
			<Modal
				title={`Permisos para el perfil ${props.data.name}`}
				visible={true}
				onCancel={onClose}
				footer={false}
				width="100%"
				height= '90%'
			>
				<Form
					name="nest-messages"
					layout="horizontal"
					style={{height: '100%', width: "100%"}}
					onFinish={onFinish}
					form={form}
				>
					<PermissionList profileId={props.data.id} closed={onClose}/>
				</Form>
			</Modal>
		</>
	);
};
export default ListOfPermission;