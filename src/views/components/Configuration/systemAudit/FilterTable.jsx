import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import DatePickerSearch from "../../../handle/InputSearch/DatePickerSearch";
import { handleFilterButton } from "../../../handle/InputSearch/HandleSearch";
import SelectSearch from "../../../handle/InputSearch/SelectSearch";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllModule } from "../../../../redux/actions/Configuration/ModuleAction";
import { fetchAllResource } from "../../../../redux/actions/Configuration/ResourceAction";
import { fetchAllAuditsType } from "../../../../redux/actions/Configuration/AuditsTypeAction";

const FilterTable = ({ setFilteredData, filteredData }) => {
    const dispatch=useDispatch();
    useEffect(() => {
		dispatch(fetchAllModule());
        dispatch(fetchAllAuditsType());
		dispatch(fetchAllResource());
	}, [dispatch]);

	const audiType = useSelector((state) => state?.auditsType?._payload);
    const modules = useSelector((state) => state?.md?._payload);

	console.log(audiType,modules);

	const [date, setDate] = useState("");

	const [name, setClass] = useState("");
	const [value, setType] = useState("");
	const originalData = {
		module_name: name==""?name:modules.filter((x) => x.id==name)[0].name,
		created_at: date,
		auditType_name: value==""?value:audiType.filter((x) => x.id==name)[0].name,
	};
	const handleFilter = () => {
		setFilteredData(handleFilterButton(filteredData, originalData));
	};
	return (
		<table style={{ borderCollapse: "collapse", backgroundColor: "white", width: "100%" }}>
			<thead
			>
				<td 
				style={{
					paddingLeft: "15px"
				}}> Clase</td> <td style={{
					paddingLeft: "15px"
				}}>tipo</td>
				<td style={{
					paddingLeft: "15px"
				}}>Fecha</td>
			</thead>
			<tbody>
				<tr style={{ height: "50px" }}>
					<td style={{ width: "25%", textAlign: "center" }}>
						<SelectSearch data={modules?modules:[]} onChange={setClass} />
					</td>

					<td style={{ width: "25%", textAlign: "center" }}>
						<SelectSearch data={audiType?audiType:[]} onChange={setType} />
					</td>

					<td style={{ width: "25%", textAlign: "center" }}>
						<DatePickerSearch setDate={setDate} />
					</td>

					<td style={{ textAlign: "center" }}>
						<Button
							style={{
								width: "90%",
								color: "white",
							}}
							onClick={handleFilter}
							type="primary"
						>
							Buscar
						</Button>
					</td>
					<td style={{ width: "15%", textAlign: "center" }}></td>
				</tr>
			</tbody>
		</table>
	);
};

export default FilterTable;
