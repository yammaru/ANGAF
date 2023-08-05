import { connect } from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AttentionPlacesContext } from "./AttentionPlacesProvider";
import { error, success } from "../../../../handle/Notification/Notification";
import { deleteAttentionPlacesById , fetchAllAttentionPlaces  } from '../../../../../redux/actions/Configuration/AttentionPlacesAction';

const DeleteAttentionPlaces = ({ dispatchDeleteAttentionPlacesAction, dispatchFetchAllAttentionPlacesAction}) => {

	const { attentionPlaces } = useContext(AttentionPlacesContext);
	const [ id ] = useState(attentionPlaces.id);

  const cancel = () => {
	  error('Operación cancelada')
  }

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>
  const deleteProfile = () =>{
		dispatchDeleteAttentionPlacesAction(id, (dispatch) => {
			success('Lugar de atención eliminado con éxito');
			dispatch(dispatchFetchAllAttentionPlacesAction());
		}, (message) => message.error(`Error: ${message}`))
	}
	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar el lugar de atención ${attentionPlaces.name}? `}
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

const mapDispatchToProps = dispatch => ({
	dispatchDeleteAttentionPlacesAction: (id, onSuccess, onError) => 
		dispatch(deleteAttentionPlacesById(id, onSuccess, onError)),
	dispatchFetchAllAttentionPlacesAction: () => dispatch(fetchAllAttentionPlaces())
})

export default connect(null, mapDispatchToProps)(DeleteAttentionPlaces);