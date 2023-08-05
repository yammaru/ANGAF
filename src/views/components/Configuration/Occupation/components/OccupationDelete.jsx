import { connect } from "react-redux";
import React, {useContext, useState} from "react";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { OccupationContext } from "./OccupationProvider";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { error, success } from "../../../../handle/Notification/Notification";
import { deleteOccupationById , fetchAllOccupation  } from '../../../../../redux/actions/Configuration/OccupationAction';

const DeleteOcupation = ({ dispatchDeleteOccupationAction, dispatchFetchAllOccupationAction}) => {

	const { Occupation } = useContext(OccupationContext);
	const [ id ] = useState(Occupation.id);
    
  function cancel() {
	  error('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>
  const deleteOccupation = () =>{
                dispatchDeleteOccupationAction(id, (dispatch) => {
			success('Ocupación eliminada con éxito');
			dispatch(dispatchFetchAllOccupationAction());
		}, (message) => message.error(`Error: ${message}`))
	}
	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar la ocupación ${Occupation.name}? `}
					onConfirm={deleteOccupation}
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
	dispatchDeleteOccupationAction: (id, onSuccess, onError) => 
	    dispatch(deleteOccupationById(id, onSuccess, onError)),
    dispatchFetchAllOccupationAction: () => dispatch(fetchAllOccupation())
})

export default connect(null, mapDispatchToProps)(DeleteOcupation);