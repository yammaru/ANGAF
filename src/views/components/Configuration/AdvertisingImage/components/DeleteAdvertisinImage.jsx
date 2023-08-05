import { connect, useDispatch } from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AdvertisingImageContext } from "./AdvertisingImageProvider";
import { errorGlobal, success, warning } from '../../../../handle/Notification/Notification';
import { deleteAdvertisingImageById , fetchAllAdvertisingImage  } from '../../../../../redux/actions/Configuration/AdvertisingImageAction';

const DeleteChannel = ({ dispatchDeleteAdvertisingImageAction, dispatchFetchAllAdvertisingImageAction}) => {

	const { advertisingImage } = useContext(AdvertisingImageContext);

	const [ id ] = useState(advertisingImage.id);

	const dispatch = useDispatch();

  	function cancel() {
		warning('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>

	const executeResponse = () => {
		success('Imagen eliminada con éxito');
		dispatch(fetchAllAdvertisingImage());
	};
	const deleteAdvertisinImage = () => {
		dispatch(deleteAdvertisingImageById(id, executeResponse,(message) => errorGlobal(`Error: ${message}`)));
	};

	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar la imagen?` }
					onConfirm={deleteAdvertisinImage}
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
	dispatchDeleteAdvertisingImageAction: (id, onSuccess, onError) => 
		dispatch(deleteAdvertisingImageById(id, onSuccess, onError)),
	dispatchFetchAllAdvertisingImageAction: () => dispatch(fetchAllAdvertisingImage())
})

export default connect(null, mapDispatchToProps)(DeleteChannel);