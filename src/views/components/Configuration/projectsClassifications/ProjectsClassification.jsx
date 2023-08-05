import React, { useState } from "react";
import { Button, Table } from "antd";

import * as constants from "../../../../redux/constants";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { validatePermission } from "../../../handle/PermissionMethods/PermissionMethods";
import { fetchAllProjectsClassification, updateStateProjectsClassificationById } from "../../../../redux/actions/Configuration/ProjectsClassificationsAction";
import { useDispatch, useSelector } from "react-redux";



import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Card from "../../Card/Card";
import { useEffect } from "react";
import { errorGlobal, success } from "../../../handle/Notification/Notification";
import TootipInfo from "../../TooltipInfoComponent/TootipInfo";
import { getColumnSearchProps, noWhiteWindow } from "../../../handle/HandleFilterTable/handleFilterTable";

import DeleteProjectsClassification from "./components/DeleteProjectsClassification";
import { ProjectsClassificationProvider } from "./components/ProjectsClassificationProvider";
import RegisterFormComponent from "./components/ProjectsClassificationRegister";
import ProjectsClassificationUpdate from "./components/ProjectsClassificationUpdate";
import { handleSearch, nubeListaElementos, resetFilter } from "../../../handle/InputSearch/HandleSearch";
import InputSearch from "../../../handle/InputSearch/InputSerch";


const ProjectsClassification = () => {
    const dispatch = useDispatch();
	const projectsClassification = useSelector(state => state?.projectsClassification._payload);

	const [filteredData, setFilteredData] = useState(projectsClassification);
	useEffect(() =>{
			dispatch(fetchAllProjectsClassification())
	},[dispatch]);

	const searchProjectsClassification = (record) => {
		for (let index = 0; index < projectsClassification.length; index++) {
			if (projectsClassification[index].id === record.id) {
				return projectsClassification[index];
			}
		}
	}

	const updateStateProjectsClassification = (id) => {
	
		dispatch(
			updateStateProjectsClassificationById(id, async (response) => {
				const res = await response;
				if (res.error) {
 
					errorGlobal("¡UPS!, Ha ocurrido un error");
				} else {
					success("Clasificacion de proyecto actualizada");
				}
				dispatch(fetchAllProjectsClassification());
			}),
		)
	};

	const getActions = (record) => {
		return <>
			<ProjectsClassificationProvider projectsClassification={searchProjectsClassification(record)}>
			
					<ProjectsClassificationUpdate size="small" footer={false} title="Actualizar perfil"/>
				
				{"  "}
				
					<DeleteProjectsClassification size="small" title="Empresa afiliada"/>
			
				{"  "}
				<TootipInfo created_at={record.created_at} name={record.name} updated_at={record.updated_at}/>
			</ProjectsClassificationProvider>
		</>
	}

	const getButtonStateAfiliated = (state, id) => {
		if (state) {
			return <Button 
						onClick={() => updateStateProjectsClassification(id)}
						icon={
								<CheckOutlined 
								style={{
									fontSize: '18px', 
									color: '#0D6B04'
								}}/>
							} 
						size="small" 
						type='text'
			/>
		} else {
			return <Button onClick={() => updateStateProjectsClassification(id)} size="small" type='text'
										 icon={<CloseOutlined style={{fontSize: '18px', color: '#f5222d'}}/>}/>
		}
	}

	const columns = [
		{
			title: '#',
			width: 40,
			dataIndex: 'id',
			key: 'id',
			render: (_,record)=>{
				return projectsClassification.indexOf(record)+1;
			 }
		},
		{
			title: 'Nombre',
			width: 100,
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
			...noWhiteWindow,
			sorter: true,
		},
		{
			title: 'Activo',
			width: 40,
			dataIndex: 'state',
			key: 'state',
			align:'center',
			render: (_, record) => getButtonStateAfiliated(record.state, record.id)
		},
		{
			title: 'Acciones',
			key: 'actions',
			fixed: 'right',
			width: 30,
			render: (_, record) => getActions(record),
		},
	];

	if (!validatePermission(constants.PROJECTS_CLASSIFICATIONS_SUBMODULE)) {
		return <Redirect to={constants.DEFAULT_ROUTE}/>;
	}
	const nubeDatosConsulta = nubeListaElementos([

		"Nombre de Clasificasion",
		
	]);

	const handleSearchFilter = (value) => {
		setFilteredData(
			handleSearch(value, projectsClassification, [
				"name",
				
			])
		);
	};

	const handleResetFilter = () => {
		setFilteredData(resetFilter(projectsClassification));
	};
	return (
		<>
			<Card
				title="Clasificasion de proyectos"
				table={<Table columns={columns} dataSource={(filteredData?filteredData:projectsClassification)} y={300}/>}
				modal={
				<><InputSearch
				title={nubeDatosConsulta}
				handleSearch={handleSearchFilter}
				resetFilter={handleResetFilter}
			/>
				<RegisterFormComponent/>
				</>
				}
			/>
		</>
	);

};

export default ProjectsClassification;
