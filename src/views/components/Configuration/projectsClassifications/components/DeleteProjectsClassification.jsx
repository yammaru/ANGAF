import { connect } from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ProjectsClassificationContext } from "./ProjectsClassificationProvider";
import { errorGlobal, success } from '../../../../handle/Notification/Notification';
import { deleteProjectsClassificationById, fetchAllProjectsClassification } from '../../../../../redux/actions/Configuration/ProjectsClassificationsAction';


const DeleteProjectsClassification = ({ dispatchDeleteProjectsClassificationAction, dispatchFetchAllProjectsClassificationAction }) => {

	const { projectsClassification } = useContext(ProjectsClassificationContext);
	const [ id ] = useState(projectsClassification.id);

	function cancel() {
		errorGlobal('Operación cancelada');
	}

	const textDelete = <span style={{ color: '#6A6963' }}>Eliminar</span>
	const deleteProjectsClassification = () => {
		dispatchDeleteProjectsClassificationAction(id, (dispatch) => {
			success('Clasificacion de proyecto eliminada con éxito');
			dispatch(dispatchFetchAllProjectsClassificationAction());
		}, (message) => errorGlobal(`Error: ${message}`))
	}
	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar la clasificacion ${projectsClassification.name}? `}
					onConfirm={deleteProjectsClassification}
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
	dispatchDeleteProjectsClassificationAction: (id, onSuccess, onError) =>
		dispatch(deleteProjectsClassificationById(id, onSuccess, onError)),
	dispatchFetchAllProjectsClassificationAction: () => dispatch(fetchAllProjectsClassification())
})

export default connect(null, mapDispatchToProps)(DeleteProjectsClassification);