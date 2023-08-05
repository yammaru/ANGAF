import { connect } from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ConsignmentConceptContext } from "./ConsignmentConceptProvider";
import { errorGlobal, success } from '../../../../handle/Notification/Notification';
import { deleteConsignmentConceptById, fetchAllConsignmentConcept } from '../../../../../redux/actions/Configuration/ConsignmentConceptAction';


const DeleteConsignmentConcept = ({ dispatchDeleteConsignmentConceptAction, dispatchFetchAllConsignmentConceptAction }) => {

	const { consignmentConcept } = useContext(ConsignmentConceptContext);
	const [ id ] = useState(consignmentConcept.id);

	function cancel() {
		errorGlobal('Operación cancelada');
	}

	const textDelete = <span style={{ color: '#6A6963' }}>Eliminar</span>
	const deleteConsignmentConcept = () => {
		dispatchDeleteConsignmentConceptAction(id, (dispatch) => {
			success('Clasificacion de proyecto eliminada con éxito');
			dispatch(dispatchFetchAllConsignmentConceptAction());
		}, (message) => errorGlobal(`Error: ${message}`))
	}
	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar la clasificacion ${consignmentConcept.name}? `}
					onConfirm={deleteConsignmentConcept}
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
	dispatchDeleteConsignmentConceptAction: (id, onSuccess, onError) =>
		dispatch(deleteConsignmentConceptById(id, onSuccess, onError)),
	dispatchFetchAllConsignmentConceptAction: () => dispatch(fetchAllConsignmentConcept())
})

export default connect(null, mapDispatchToProps)(DeleteConsignmentConcept);