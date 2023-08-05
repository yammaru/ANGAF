import React, { useState } from "react";
import { PageHeader, Card } from "antd";
import UserForm from "./Component/UserForm";
import TableUser from "./Component/TableUser";
import * as constants from "../../../../redux/constants";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { validateModule } from "../../../handle/PermissionMethods/PermissionMethods";
import { useSelector } from "react-redux";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";

const User = () => {
	const user = useSelector((state) => state?.users._payload);
	const [filteredData, setFilteredData] = useState(user);
	if (!validateModule(constants.USERS_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE} />;
	}
	const nubeDatosConsulta = nubeListaElementos(["Nombre del usuario","Email","Telefono"]);
	const handleSearchFilter = (value) => {
		setFilteredData(handleSearch(value,user,["name","email","phone_number"]));
	};
	const handleResetFilter=()=>{
		setFilteredData(resetFilter(user));
	}
	return (
		<Card>
			<PageHeader
				style={{ border: "1px solid rgb(235, 237, 240);" }}
				title={"Usuarios"}
				extra={[
					<>
					<InputSearch
						title={nubeDatosConsulta}
						handleSearch={handleSearchFilter}
						resetFilter={handleResetFilter}
					/>
					<UserForm />
					</>
				
			]}
			/>
			<TableUser filteredData={filteredData}/>
		</Card>
	);
};

export default User;
