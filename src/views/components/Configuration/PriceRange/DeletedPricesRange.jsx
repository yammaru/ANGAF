import { connect } from "react-redux";
import { Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useState } from "react";
import { PricesRangeContext } from "./PricesRangeProvider";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { error, success } from "../../../handle/Notification/Notification";
import { deletePricesRangeById , fetchAllPricesRange  } from '../../../../redux/actions/Configuration/PricesRangeAction';

const DeletedPricesRange = ({ dispatchDeletePricesRangeAction, dispatchFetchAllPricesRangeAction}) => {

	const { pricesRange } = useContext(PricesRangeContext);
	const [ id ] = useState(pricesRange.id);

  	const cancel = () => {
	  error('Operación cancelada');
	}

	const textDelete= <span	style={{color:'#6A6963'}}>Eliminar</span>
  const deleteProfile = () =>{
		dispatchDeletePricesRangeAction(id, (dispatch) => {
			success('Rango de precios eliminado con éxito');
			dispatch(dispatchFetchAllPricesRangeAction());
		}, (message) => message.error(`Error: ${message}`))
	}
	return(
    <>
      <Tooltip placement="left" color='#ffffff'  title={textDelete} >
				<Popconfirm
					title={`¿Desea eliminar el rango de precios ${pricesRange.name}? ` }
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
	dispatchDeletePricesRangeAction: (id, onSuccess, onError) => 
		dispatch(deletePricesRangeById(id, onSuccess, onError)),
	dispatchFetchAllPricesRangeAction: () => dispatch(fetchAllPricesRange())
})

export default connect(null, mapDispatchToProps)(DeletedPricesRange);