import { connect } from "react-redux";
import React, {useContext, useState} from "react";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ProfileContext } from "./ProfileProvider";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { success, errorGlobal, error } from "../../../../handle/Notification/Notification";
import { deleteProfileById , fetchAllProfile  } from '../../../../../redux/actions/Configuration/ProfileAction';

const ConfirmationDeleteProfile = ({ dispatchDeleteProfileAction, dispatchFetchAllProfileAction}) => {

	const { profile } = useContext(ProfileContext);
	const [ id ] = useState(profile.id);

  	const cancel = () => {
	  	error('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>
  const deleteProfile = () =>{
		dispatchDeleteProfileAction(id, (dispatch) => {
			success('Perfil eliminado con exito');
			dispatch(dispatchFetchAllProfileAction());
		}, () => errorGlobal(`O¡UPS!, Ha ocurrido un error`))
	}
	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿ Desea eliminar el perfil ${profile.name} ? `	}
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
	dispatchDeleteProfileAction: (id, onSuccess, onError) => 
		dispatch(deleteProfileById(id, onSuccess, onError)),
	dispatchFetchAllProfileAction: () => dispatch(fetchAllProfile())
})

export default connect(null, mapDispatchToProps)(ConfirmationDeleteProfile);