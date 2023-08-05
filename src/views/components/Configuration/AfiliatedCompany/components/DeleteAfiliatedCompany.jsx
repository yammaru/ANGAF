import { connect } from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AfiliatedCompanyContext } from "./AfiliatedCompanyProvider";
import { errorGlobal, success } from '../../../../handle/Notification/Notification';
import { deleteAfiliatedCompanyById, fetchAllAfiliatedCompany } from '../../../../../redux/actions/Configuration/AfiliatedCompanyAction';


const DeleteAfiliatedCompany = ({ dispatchDeleteAfiliatedCompanyAction, dispatchFetchAllAfiliatedCompanyAction }) => {

	const { afiliatedCompany } = useContext(AfiliatedCompanyContext);
	const [ id ] = useState(afiliatedCompany.id);

	function cancel() {
		errorGlobal('Operación cancelada');
	}

	const textDelete = <span style={{ color: '#6A6963' }}>Eliminar</span>
	const deleteAfiliatedCompany = () => {
		dispatchDeleteAfiliatedCompanyAction(id, (dispatch) => {
			success('Empresa afiliada eliminada con éxito');
			dispatch(dispatchFetchAllAfiliatedCompanyAction());
		}, (message) => errorGlobal(`Error: ${message}`))
	}
	return (
		<>
			<Tooltip placement="left" color='#ffffff' title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar la empresa ${afiliatedCompany.name}? `}
					onConfirm={deleteAfiliatedCompany}
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
	dispatchDeleteAfiliatedCompanyAction: (id, onSuccess, onError) =>
		dispatch(deleteAfiliatedCompanyById(id, onSuccess, onError)),
	dispatchFetchAllAfiliatedCompanyAction: () => dispatch(fetchAllAfiliatedCompany())
})

export default connect(null, mapDispatchToProps)(DeleteAfiliatedCompany);