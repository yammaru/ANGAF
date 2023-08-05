import { useDispatch} from "react-redux";
import { ModuleContext } from "./ModuleProvider";
import React, {useContext, useState} from "react";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {error, success} from "../../../../handle/Notification/Notification";
import { deleteModuleById , fetchAllModule  } from '../../../../../redux/actions/Configuration/ModuleAction';

const ModuleDelete = () => {

	const { module } = useContext(ModuleContext);
	const [ id ] = useState(module.id);
	const dispatch = useDispatch();

  	const cancel = () => {
	  error('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>

  	const deleteProfile = () => {
		dispatch(deleteModuleById(id, function () {
			success('Módulo eliminado con éxito');
			dispatch(fetchAllModule());
		}, (message) => message.error(`Error: ${message}`)));
	}
	
	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar el lugar de atención ${module.name}? `}
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


export default ModuleDelete;