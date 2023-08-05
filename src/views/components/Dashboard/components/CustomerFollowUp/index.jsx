import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import TableComponent from "../../../Table/Table";
import {fetchAllCustomerActivity} from "../../../../../redux/actions/Customer/CustomerActivityAction";

const CustomerFollowUp = () => {
	const [loading,setLoading]=useState(true);
	const [customer,setCustomer] = useState()
	const dispatch = useDispatch()
	useEffect(()=>{
		setLoading(true);
		dispatch(fetchAllCustomerActivity(async (response)=>{
			const res = await response
			setCustomer(res._payload)
			setLoading(false);
		}))

	},[])
	return <TableComponent data={customer} loading={loading} y={400}/>
}

export default CustomerFollowUp