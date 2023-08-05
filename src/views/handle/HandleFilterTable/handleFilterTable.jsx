import React from 'react';
import {Input, Button, Space} from 'antd';
import Highlighter from 'react-highlight-words';
import {SearchOutlined,} from '@ant-design/icons';


const state = {
	searchText: '',
	searchedColumn: '',
}

const setState = (searchText, searchedColumn) => {
	state.searchText = searchText;
	state.searchedColumn = searchedColumn;
}

const setStateText = (searchText) => {
	state.searchText = searchText;
}
export const curoffDate = (c) => {
	if (c === 0) {
		return "5-";
	} else if (c === 1) {
		return "15-"
	} else {
		return "";
	}
}
export const convertAllMapDataState = (data) => {

	return data?.map(x => {
		if (typeof x == "object") {
			let keys = Object.keys(x);
			for (let i of keys) {
				if (x[i]) {
					const regex = /^[0-9]*$/;
					const onlyNumbers = regex.test(x[i]); // tru
					if ((onlyNumbers && !Array.isArray(x[i])) && typeof x[i] == "string") {
						x[i] = parseInt(x[i]?.toString());
					}
					if ((onlyNumbers && !Array.isArray(x[i])) && typeof x[i] == "boolean") {
						x[i] = x[i] ? 1 : 0;
					}
				}
			}
		}
		if (Array.isArray(x) && x.length > 0) {
			x = convertAllMapDataState(x)
		}
		return x;
	});
}
export var noWhiteWindow= {render(text) { 
	return { 
	 
		children: <h6 style={{fontSize: "14px"}}>{text}</h6>, 
	}; 
}, }
export const getColumnSearchProps = dataIndex => ({
	filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
		<div style={{padding: 8}}>
			<Input
				placeholder={`Buscar`}
				value={selectedKeys[0]}
				onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
				onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
				style={{width: 188, marginBottom: 8, display: 'block'}}
			/>
			<Space>
				<Button
					type="primary"
					onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
					icon={<SearchOutlined/>}
					size="small"
				>
					Buscar
				</Button>
				<Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
					Resetear
				</Button>
			</Space>
		</div>
	),
	filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
	onFilter: (value, record) =>
		record[dataIndex]
			? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
			: '',
	render: text =>
		state.searchedColumn === dataIndex ? (
			<Highlighter
				highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
				searchWords={[state.searchText]}
				autoEscape
				textToHighlight={text ? text.toString() : ''}
				constructor={""} hasOwnProperty={""} isPrototypeOf={""} propertyIsEnumerable={""} toLocaleString={""}
				toString={""} valueOf={""}/>
		) : (
			text
		),
});

const handleSearch = (selectedKeys, confirm, dataIndex) => {
	confirm();
	setState(selectedKeys[0], dataIndex);
};

const handleReset = clearFilters => {
	clearFilters();
	setStateText('');
};

