import { useDispatch } from "react-redux";
import { UsersContext } from "./UserProvider";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { errorGlobal, success, warning } from '../../../../handle/Notification/Notification';
import { deleteUserById, fetchAllUsers } from '../../../../../redux/actions/Configuration/usersAction';

const UserDelete = () => {


	const dispatch = useDispatch();
	const { users } = useContext(UsersContext);
	const [id] = useState(users.id);

	const cancel = () => {
		warning('Operación cancelada');
	}

	const textDelete = <span style={{ color: '#6A6963' }}>Eliminar</span>

	const deleteProfile = () => {
		dispatch(deleteUserById(id, () => {
			success('Usuario eliminado exitosamente');
			dispatch(fetchAllUsers());
		}, (message) => errorGlobal(`Error: ${message}`)));
	}
	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar este usuario ${users.name}?`}
					onConfirm={deleteProfile}
					onCancel={cancel}
					okText="Si"
					cancelText="No"
					icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
				>
					<Button icon={<DeleteOutlined/>} type='primary' size='small' danger/>
				</Popconfirm>
			</Tooltip>
		</>
	);
}


export default UserDelete;