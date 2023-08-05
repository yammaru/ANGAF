import { connect } from "react-redux";
import React, {useContext, useState} from "react";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ChannelContext } from "./ChannelProvider";
import { QuestionCircleOutlined } from '@ant-design/icons';
import {error, success} from "../../../../handle/Notification/Notification";
import { deleteChannelById , fetchAllChannel  } from '../../../../../redux/actions/Configuration/ChannelAction';

const DeleteChannel = ({ dispatchDeleteChannelAction, dispatchFetchAllChannelAction}) => {

	const { channel } = useContext(ChannelContext);
	const [ id ] = useState(channel.id);

  function cancel() {
	  error('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>
  const deleteProfile = () =>{
		dispatchDeleteChannelAction(id, (dispatch) => {
			success('Medio eliminado con éxito');
			dispatch(dispatchFetchAllChannelAction());
		}, (message) => message.error(`Error: ${message}`))
	}
	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar el medio ${channel.name}?` }
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
	dispatchDeleteChannelAction: (id, onSuccess, onError) => 
		dispatch(deleteChannelById(id, onSuccess, onError)),
	dispatchFetchAllChannelAction: () => dispatch(fetchAllChannel())
})

export default connect(null, mapDispatchToProps)(DeleteChannel);