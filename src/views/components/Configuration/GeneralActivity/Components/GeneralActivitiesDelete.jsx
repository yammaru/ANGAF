import React from "react";
import {useDispatch} from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { errorGlobal, warning, success } from "../../../../handle/Notification/Notification";
import { deleteGeneralActivityById } from '../../../../../redux/actions/Configuration/GeneralActivityAction';



const GeneralActivitiesDelete = ({id}) => {
	const dispatch = useDispatch();

	const cancel = () => {
		warning('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>
	const deleteGeneralActivity = () =>{
		dispatch(
			deleteGeneralActivityById(id, async (response) => {
				const res = await response;
				if (res.error) {
					errorGlobal(res['message']);
				} else {
					success(res['message']);
				}
			})
		);
	}
	return(
		<>
			<Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar esta acitivdad? `}
					onConfirm={deleteGeneralActivity}
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

export default GeneralActivitiesDelete;