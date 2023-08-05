import { useDispatch } from "react-redux";
import React, {useContext, useState } from "react";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { RegisterTypeContext } from "./RegisterTypeProvider";
import {error, success} from "../../../../handle/Notification/Notification";
import { deleteRegisterTypeById , fetchAllRegisterType  } from '../../../../../redux/actions/Configuration/RegisterTypeAction';

const ActivityTypeDelete = () => {

	const { registerType } = useContext(RegisterTypeContext);
	const [ id ] = useState(registerType.id);
	const dispatch = useDispatch();

  	const cancel = () => {
		error('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>
  const deleteProfile = () =>{
	  dispatch(deleteRegisterTypeById(id, function (){
		  success('Tipo registro eliminado con éxito');
		  dispatch(fetchAllRegisterType());
	  }));
	}
	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿ Desea eliminar el tipo de registro ${registerType.name} ? `}
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


export default ActivityTypeDelete;