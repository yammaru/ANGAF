
import { connect } from 'react-redux';
import UserDelete from './UserDelete';
import React, { useEffect } from 'react';
import { Button, Tooltip, Table } from "antd";
import UpdateUserForm from "./UpdateUserForm";
import { UsersProvider } from './UserProvider';
import * as constants from "../../../../../redux/constants";
import { success, error, warning } from "../../../../handle/Notification/Notification";
import { CloseOutlined, InfoOutlined, CheckOutlined } from '@ant-design/icons';
import { validatePermission } from "../../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllUsers, updateStateUserById } from '../../../../../redux/actions/Configuration/usersAction';
import { getColumnSearchProps, convertAllMapDataState, noWhiteWindow } from "../../../../handle/HandleFilterTable/handleFilterTable";

const TableUser = ({users, dispatchFetchAllUsersAction, dispatchUpdateStateUserAction,filteredData}) => {
	useEffect(() => dispatchFetchAllUsersAction(), [dispatchFetchAllUsersAction]);
	const element = [];
	for (const key in users) {
		if (key === "_payload") {
			
			const usuario = users[key];
			
			for (let index = 0; index < usuario.length; index++) {
				element.push(usuario[index]);
			}
		}
	}

	const searchUsers = (record) => {
		for (let index = 0; index < element.length; index++) {
			if (element[index].id === record.id) {
				return element[index];
			}
		}
	}
	const formatDate = (date) => {
		const formatDate = Date.parse(date);
		let dt = new Date(formatDate);
		dt = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
		return dt;
	}
	const getActions = (record) => {
		
		let createdAt = formatDate(record.created_at);
		let updatedAt = formatDate(record.updated_at);
		const text = <span style={{color: '#6A6963'}}> 
										{record.name}
										<hr/> Creado: {createdAt} <br/>  
										Modificado: {updatedAt} 
								</span>
		return (
			<>
				<UsersProvider users={searchUsers(record)}>
					{validatePermission(constants.UPDATE_USER_PERMISSION) ? (
						<UpdateUserForm/>
					) : null}
					{"  "}
					{validatePermission(constants.DELETE_USER_PERMISSION) ? (
						<UserDelete/>
					) : null}
					{"  "}
					<Tooltip placement="left" color='#ffffff' title={text}>
						<Button size="small" type="primary">
							<InfoOutlined/>
						</Button>
					</Tooltip>
				</UsersProvider>
			</>
		);
	};
	const updateStateProfile = (id) => {
		validatePermission(constants.UPDATE_USER_PERMISSION) ?	
		dispatchUpdateStateUserAction(id, (response) => {
			response.error ? error(response.message) : success('Asesor Actualizado');
			dispatchFetchAllUsersAction();
		})
		:warning('no tiene permisos para editar el estado')
	
	};
	const getButtonStateUser = (state, id) => {
		if (state) {
			return <Button size="small" onClick={ () => updateStateProfile(id)} type='text'
										 icon={<CheckOutlined style={{fontSize: '18px', color: '#0D6B04'}}/>}/>
		} else {
			return <Button size="small" onClick={ () => updateStateProfile(id)} type='text'
										 icon={<CloseOutlined style={{fontSize: '18px', color: '#f5222d'}}/>}/>
		}
	}
	
	const columns = [
		{
			title: '#',
			width: 20,
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Nombre',
			width: 50,
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
			...noWhiteWindow
		},
		{
			title: 'Email',
			width: 50,
			dataIndex: 'email',
			key: 'email',
			...getColumnSearchProps('email'),
			...noWhiteWindow
		},
		{
			title: 'Perfil',
			width: 40,
			dataIndex: 'profile',
			key: 'profile',
			...getColumnSearchProps('profile'),
			...noWhiteWindow
		},
		{
			title: 'Empresas asociadas',
			dataIndex: 'affiliated_company',
			width: 60,
			key: 'affiliated_company',
			...getColumnSearchProps('affiliated_company'),
			...noWhiteWindow,
			render: (_, record) => record.affiliated_company==0?"Todas":record?.affiliated_company
		},
		{
			title: 'Activo',
			dataIndex: 'state',
			key: 'state',
			width: 30,
			render: (_, record) => getButtonStateUser(record.state, record.id)
		},
		{
			title: 'Acciones',
			key: 'actions',
			width: 40,
			fixed: 'right',
			render: (_, record) => getActions(record)
		},
	];

	
	return (
		<Table
			columns={columns}
			dataSource={convertAllMapDataState(filteredData?filteredData:element)}
			scroll={{x: 1000, y: 300}}
			size='small'
			bordered={true}
			loading={false}
		/>
	);
}
const mapStateToProps = state => ({
	users: state.users,
})

const mapDispatchToProps = dispatch => ({
	dispatchUpdateStateUserAction: (id, onSuccess, onError) =>
		dispatch(updateStateUserById(id, onSuccess, onError)),
	dispatchFetchAllUsersAction: () => dispatch(fetchAllUsers())
});
export default connect(mapStateToProps, mapDispatchToProps)(TableUser);