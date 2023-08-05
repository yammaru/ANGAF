import { connect } from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { AdviserContext } from './AdviserProvider';
import React, { useContext, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { errorGlobal, success, warning } from '../../../handle/Notification/Notification';
import { deleteAssessorById, fetchAllAssessor } from '../../../../redux/actions/Configuration/AssesorAction';

const DeleteAdviser = ({ dispatchDeleteAdviserAction, dispatchFetchAllAdviserAction }) => {

	const { adviser } = useContext(AdviserContext);
	const [ id ] = useState(adviser.id)

	function cancel() {
		warning('Operación cancelada');
	}

	const textDelete = <span style={{ color: '#6A6963' }}>Eliminar</span>
	const deleteAdviser = () => {
		dispatchDeleteAdviserAction(id, (dispatch) => {
			success('Asesor eliminado con éxito');
			dispatch(dispatchFetchAllAdviserAction());
		}, (message) => errorGlobal(`Error: ${message}`))
	}
	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar el asesor ${adviser.name}?`}
					onConfirm={deleteAdviser}
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

const mapDispatchToProps = dispatch => ({
	dispatchDeleteAdviserAction: (id, onSuccess, onError) =>
		dispatch(deleteAssessorById(id, onSuccess, onError)),
	dispatchFetchAllAdviserAction: () => dispatch(fetchAllAssessor())
})

export default connect(null, mapDispatchToProps)(DeleteAdviser);