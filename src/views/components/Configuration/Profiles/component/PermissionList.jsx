import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Spinner from "../../../../handle/Spinner/Spinner";
import { Button, Card, Checkbox, Col, notification, Row, Spin } from "antd";
import { fetchAllProfile } from "../../../../../redux/actions/Configuration/ProfileAction";
import {
	fetchAllPermission,
	fetchProfilePermission,
	fetchSavePermissions,
} from "../../../../../redux/actions/Configuration/PermissionAction";

function PermissionList(props) {
	const [profilePermissions, setProfilePermissions] = useState([]);
	const [permissions, setPermissions] = useState([]);
	const [checkedValues, setCheckedValues] = useState([]);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const listPermission = [
		{
			module_id: 34,
			module_name: "Abonos Directo / Fiducia",
			permissions: [
				{
					id: "123",
					name: "Listar",
				},
				{
					id: "124",
					name: "Crear",
				},
				{
					id: "127",
					name: "Verificar",
				},
				{
					id: "125",
					name: "Ajustar",
				},
				{
					id: "129",
					name: "Listar Recaudos Fiduciarios",
				},
				{
					id: "130",
					name: "Agregar Recaudo Fiduciario",
				},
				{
					id: "131",
					name: "Ajustar Recaudo Fiducia",
				},
				{
					id: "128",
					name: "Enviar Correo a Cliente",
				},
			],
		},
		{
			module_id: 54,
			module_name: "Actas aprobación Comisiones",
			permissions: [
				{
					id: "158",
					name: "Listar",
				},
				{
					id: "158",
					name: "Crear",
				},
			],
		},
		/*	
		{
			module_id: 23,
			module_name: "Configuraciones Generales",
			permissions: [
				{
					id: "65",
					name: "Listar",
				},
				{
					id: "66",
					name: "Crear",
				},
				{
					id: "67",
					name: "Editar",
				},
				{
					id: "68",
					name: "Borrar",
				},
			],
		}
		*/
		{
			module_id: 27,
			module_name: "Actividades Asesores",
			permissions: [
				{
					id: "82",
					name: "Listar",
				},
				{
					id: "83",
					name: "Crear",
				},
				{
					id: "84",
					name: "Editar",
				},
				{
					id: "85",
					name: "Listar tipos de actividades",
				},
			],
		},
		{
			module_id: 11,
			module_name: "Actividades Generales",
			permissions: [
				{
					id: "17",
					name: "Listar",
				},
				{
					id: "18",
					name: "Crear",
				},
				{
					id: "19",
					name: "Editar",
				},
				{
					id: "20",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 10,
			module_name: "Asesor",
			permissions: [
				{
					id: "13",
					name: "Listar",
				},
				{
					id: "14",
					name: "Crear",
				},
				{
					id: "15",
					name: "Editar",
				},
				{
					id: "16",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 21,
			module_name: "Auditoría del Sistema",
			permissions: [
				{
					id: "57",
					name: "Listar",
				} /*
				{
					id: "58",
					name: "Crear",
				},
				{
					id: "59",
					name: "Editar",
				},
				{
					id: "60",
					name: "Borrar",
				},*/,
			],
		},
		{
			module_id: 26,
			module_name: "Clientes",
			permissions: [
				{
					id: "77",
					name: "Listar",
				},
				{
					id: "78",
					name: "Crear",
				},
				{
					id: "79",
					name: "Editar",
				},
				{
					id: "80",
					name: "Borrar",
				},
				{
					id: "81",
					name: "Reasignar asesor",
				},
				{
					id: "82",
					name: "Listar seguimiento",
				},
				{
					id: "83",
					name: "Crear seguimiento",
				},
				{
					id: "84",
					name: "Editar seguimiento",
				},
				{
					id: "85",
					name: "Borrar seguimiento",
				},
			],
		},
		{
			module_id: 14,
			module_name: "¿Cómo se Enteró?",
			permissions: [
				{
					id: "29",
					name: "Listar",
				},
				{
					id: "30",
					name: "Crear",
				},
				{
					id: "31",
					name: "Editar",
				},
				{
					id: "32",
					name: "Borrar",
				},
			],
		},

		//confi
		{
			module_id: 28,
			module_name: "Configs",
			permissions: [
				{
					id: "65",
					name: "Listar",
				},
				{
					id: "67",
					name: "Editar",
				},
				{
					id: "68",
					name: "delete_caches",
				},
			],
		},
		{
			module_id: 25,
			module_name: "Control Competencias",
			permissions: [
				{
					id: "73",
					name: "Listar",
				},
				{
					id: "74",
					name: "Crear",
				},
				{
					id: "75",
					name: "Editar",
				},
				{
					id: "76",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 28,
			module_name: "Cotizaciones",
			permissions: [
				{
					id: "86",
					name: "Listar",
				},
				{
					id: "92",
					name: "Crear",
				},
				{
					id: "91",
					name: "Editar",
				},
				{
					id: "93",
					name: "Separar Unidad",
				},

				{
					id: "88",
					name: "Comprar unidad",
				},
				/*{
					id: "89",
					name: "Descargar",
				},*/
				{
					id: "87",
					name: "Imprimir",
				},
				{
					id: "90",
					name: "Enviar email",
				},
			],
		},
		{
			module_id: 33,
			module_name: "Cupones",
			permissions: [
				{
					id: "117",
					name: "Listar",
				},
				{
					id: "118",
					name: "Crear",
				},
				{
					id: "119",
					name: "Editar",
				},
				{
					id: "120",
					name: "Borrar",
				},
				{
					id: "121",
					name: "Imprimir",
				},
				{
					id: "122",
					name: "Enviar cupón",
				},
			],
		},

		//dates
		{
			module_id: 12,
			module_name: "Dates",
			permissions: [
				{
					id: "21",
					name: "getDate",
				},
			],
		},
		{
			module_id: 12,
			module_name: "Empresas Asociadas",
			permissions: [
				{
					id: "21",
					name: "Listar",
				},
				{
					id: "22",
					name: "Crear",
				},
				{
					id: "23",
					name: "Editar",
				},
				{
					id: "24",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 22,
			module_name: "ErrorCatch",
			permissions: [
				{
					id: "61",
					name: "Listar",
				} /*
				{
					id: "62",
					name: "Crear",
				},
				{
					id: "63",
					name: "Editar",
				},
				{
					id: "64",
					name: "Borrar",
				},*/,
			],
		},

		//filtro
		{
			module_id: 22,
			module_name: "Filtros",
			permissions: [
				{
					id: "62",
					name: "Filtro por Asesor",
				},
				{
					id: "63",
					name: "Filtro por Empresa",
				},
			],
		},
		{
			module_id: 19,
			module_name: "Imágenes Publicitarias",
			permissions: [
				{
					id: "49",
					name: "Listar",
				},
				{
					id: "50",
					name: "Crear",
				},
				{
					id: "51",
					name: "Editar",
				},
				{
					id: "52",
					name: "Borrar",
				},
			],
		},

		//info

		{
			module_id: 58,
			module_name: "Informes",
			permissions: [
				{
					id: "135",
					name: "Informe de Ventas",
				},
				{
					id: "136",
					name: "Plan de Ventas",
				},
				{
					id: "137",
					name: "Informe Competencia",
				},
				{
					id: "138",
					name: "Informe de Reformas",
				},
				{
					id: "139",
					name: "Seguimiento de Actividades",
				},
				{
					id: "140",
					name: "Clientes Potenciales",
				},
				{
					id: "141",
					name: "Informe Estado de Cuenta",
				},
				{
					id: "142",
					name: "Informe de Legalización y Escrituración",
				},
				{
					id: "143",
					name: "Informe de Seguimiento de Cartera",
				},
				{
					id: "144",
					name: "Informe de Comisiones",
				},
				{
					id: "145",
					name: "Informe de Flujo de Recaudo",
				},
				{
					id: "146",
					name: "Informe Gral de Gestión Comercial",
				},
				{
					id: "147",
					name: "Informe Gestion Asesores",
				},
				{
					id: "148",
					name: "Informe Efectividad en Publicidad",
				},
				{
					id: "149",
					name: "Base de Datos Compradores",
				},
				{
					id: "150",
					name: "Base de Datos Clientes Potenciales",
				},
				{
					id: "151",
					name: "Informe General del Proyecto",
				},
				{
					id: "152",
					name: "Informe Auditoría",
				},
				{
					id: "158",
					name: "Verificación comisiones",
				},
			],
		},
		{
			module_id: 13,
			module_name: "Lugares de Atención",
			permissions: [
				{
					id: "25",
					name: "Listar",
				},
				{
					id: "26",
					name: "Crear",
				},
				{
					id: "27",
					name: "Editar",
				},
				{
					id: "28",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 20,
			module_name: "Módulos",
			permissions: [
				{
					id: "53",
					name: "Listar",
				},
				{
					id: "54",
					name: "Crear",
				},
				{
					id: "55",
					name: "Editar",
				},
				{
					id: "56",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 17,
			module_name: "Ocupaciones",
			permissions: [
				{
					id: "41",
					name: "Listar",
				},
				{
					id: "42",
					name: "Crear",
				},
				{
					id: "43",
					name: "Editar",
				},
				{
					id: "44",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 8,
			module_name: "Perfiles",
			permissions: [
				{
					id: "4",
					name: "Asignar Permisos",
				},
				{
					id: "5",
					name: "Borrar",
				},
				{
					id: "6",
					name: "Editar",
				},
				{
					id: "7",
					name: "Crear",
				},
				{
					id: "8",
					name: "Listar",
				},
			],
		},
		{
			module_id: 32,
			module_name: "Postventas",
			permissions: [
				{
					id: "113",
					name: "Listar",
				},
				{
					id: "114",
					name: "Crear",
				},
				{
					id: "115",
					name: "Editar",
				},
				{
					id: "116",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 24,
			module_name: "Proyectos",
			permissions: [
				{
					id: "69",
					name: "Listar",
				},
				{
					id: "70",
					name: "Crear",
				},
				{
					id: "71",
					name: "Editar",
				},
				{
					id: "72",
					name: "Borrar",
				},
				{
					id: "160",
					name: "Listado de tipos",
				},
				{
					id: "159",
					name: "Cambiar Unidad Separada a Disponible",
				},
			],
		},
		{
			module_id: 18,
			module_name: "Rangos",
			permissions: [
				{
					id: "45",
					name: "Listar",
				},
				{
					id: "46",
					name: "Crear",
				},
				{
					id: "47",
					name: "Editar",
				},
				{
					id: "48",
					name: "Borrar",
				},
			],
		},

		///referido
		{
			module_id: 18,
			module_name: "Referidos",
			permissions: [
				{
					id: "45",
					name: "Listar",
				},
				{
					id: "46",
					name: "Crear",
				},
				{
					id: "47",
					name: "Editar",
				},
				{
					id: "48",
					name: "Borrar",
				},
			],
		},

		{
			module_id: 31,
			module_name: "Solicitudes de Reforma",
			permissions: [
				{
					id: "106",
					name: "Listar",
				},
				{
					id: "107",
					name: "Solicitud cliente",
				},
				{
					id: "108",
					name: "Gestión técnica",
				},
				{
					id: "109",
					name: "Gestión  del cliente",
				},
				{
					id: "110",
					name: "Editar",
				},
				{
					id: "111",
					name: "Crear",
				},
				{
					id: "112",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 16,
			module_name: "Tipo de Actividad",
			permissions: [
				{
					id: "37",
					name: "Listar",
				},
				{
					id: "38",
					name: "Crear",
				},
				{
					id: "39",
					name: "Editar",
				},
				{
					id: "40",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 15,
			module_name: "Tipo de Registro",
			permissions: [
				{
					id: "33",
					name: "Listar",
				},
				{
					id: "34",
					name: "Crear",
				},
				{
					id: "35",
					name: "Editar",
				},
				{
					id: "36",
					name: "Borrar",
				},
			],
		},
		{
			module_id: 9,
			module_name: "Usuarios",
			permissions: [
				{
					id: "9",
					name: "Listar",
				},
				
				{
					id: "11",
					name: "Crear",
				},
				{
					id: "12",
					name: "Editar",
				},{
					id: "10",
					name: "Borrar",
				},
				{
					id: "3",
					name: "Dashboard - Listar unidades separadas",
				},
				{
					id: "156",
					name: "Dashboard - Listar Seguimiento Clientes",
				},
				{
					id: "2",
					name: "Dashboard - Listar gestión de recaudo",
				},
				{
					id: "155",
					name: "Dashboard - Listar Estado de Legalización",
				},
				{
					id: "157",
					name: "Dashboard - Listar Seguimiento de Actividades Generales",
				},{
					id: "1",
					name: "Dasboard - Publicidad",
				},
			],
		},
		{
			module_id: 30,
			module_name: "Ventas",
			permissions: [	{
					id: "102",
					name: "Listar",
				},
				{
					id: "104",
					name: "Editar",
				},{
					id: "98",
					name: "Reasignar asesor",
				},
				{
					id: "105",
					name: "Desistir venta",
				},{
					id: "96",
					name: "Escriturar Venta",
				},{
					id: "97",
					name: "Carta Aprobación Crédito",
				},	
				{
					id: "100",
					name: "Actualizar Documentos de Ventas",
				},
				
				{
					id: "101",
					name: "Imprimir",
				},
				{
					id: "95",
					name: "Cambio del Cliente/ Cesión de Derechos",
				},
				{
					id: "99",
					name: "Asignar responsables",
				},
				{
					id: "94",
					name: "Aplicar Canje",
				},
				
			
			],
		},
		{
			
			module_name: "Concepto y clasificasion",
			permissions: [	{
				id: "161",
				name: "Ver Concepto de consignación",
			},{
				id: "162",
				name: "Clasificaciones proyectos",
			},]
		}
	];

	useEffect(() => {
		dispatch(
			fetchProfilePermission(props.profileId, async (response) => {
				let _response = await response;
				if (!_response.error) {
					setProfilePermissions(response._payload);
					setCheckedValues(
						response._payload.map((item) => {
							return item.id;
						})
					);
				}
			})
		);
		dispatch(
			fetchAllPermission(async (response) => {
				let _response = await response;
				if (!_response.error) {
					setPermissions(response._payload);
				}
			})
		);
	}, []);

	if (permissions.length === 0) {
		return <Spinner />;
	}

	function onChange(checkedValue, event) {
		let orderedList = [];
		let exist = false;
		let list = [];
		let indes = 0;

		checkedValues.forEach((item, index) => {
			if (item !== checkedValue) list.push(item);
			else {
				exist = true;
				indes = index;
			}
		});
		if (event.target.checked) {
			if (!exist) list.push(parseInt(checkedValue));
		} else {
			if (!exist) {
				for (let i = 0; i < list.length; i++) {
					if (parseInt(checkedValue) != list[i]) {
						orderedList.push(list[i]);
					}
				}
				list = orderedList;
			}
		}
		list = list.sort(function (a, b) {
			return a - b;
		});
		setCheckedValues(list);
	}

	function onSubmit() {
		setLoading(true);
		let data = {
			permissions: checkedValues,
		};
		dispatch(
			fetchSavePermissions(props.profileId, data, async (response) => {
				let _response = await response;
				setLoading(false);
				if (!_response.error) {
					notification["success"]({
						message: "Proceso exitoso",
						description: "Permisos actualizados con éxito",
					});
					if (
						JSON.parse(localStorage.getItem("USER_INFO"))
							.idProfile === props.profileId
					) {
						localStorage.removeItem("USER_PERMISSIONS");
						localStorage.setItem(
							"USER_PERMISSIONS",
							JSON.stringify(data.permissions)
						);
						dispatch(fetchAllProfile());
					}
					props.closed();
				}
			})
		);
	}

	const validateChecked = (permissionId) => {
		let response = false;
		profilePermissions.forEach((item) => {
			if (parseInt(item.id) === parseInt(permissionId)) {
				response = true;
			}
		});
		return response;
	};

	return (
		<>
			<div>
				<Row gutter={[24, 24]}>
					{listPermission.map((item) => (
						<Col span={6}>
							<Card
								hoverable
								type="inner"
								title={item.module_name}
								style={{ width: "100%" }}
							>
								<Row style={{ display: "block" }}>
									{item.permissions
										? item.permissions.map((subItem) => (
												<Col>
													<Checkbox
														key={subItem.id}
														onChange={(e) => {
															onChange(
																subItem.id,
																e
															);
														}}
														defaultChecked={validateChecked(
															subItem.id
														)}
													>
														{subItem.name}
													</Checkbox>
												</Col>
										  ))
										: null}
								</Row>
							</Card>
						</Col>
					))}
				</Row>
				<br />
				<Row justify="end">
					<Col>
						{loading ? (
							<Spin
								style={{ paddingLeft: "5%" }}
								spinning={true}
								size="large"
							/>
						) : (
							<Button onClick={onSubmit}>Crear cambios</Button>
						)}
					</Col>
				</Row>
			</div>
		</>
	);
}

export default PermissionList;
