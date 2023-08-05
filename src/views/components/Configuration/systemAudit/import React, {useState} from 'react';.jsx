import React, {useState} from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Table, Switch, Form, Space } from 'antd';


const Demo = () => {
  const [state, setState] = useState({
     loading: false,
    
    rowSelection: {
		
	},
    
  });

  const columns = [
	{
	  title: 'Name',
	  dataIndex: 'name',
	},
	{
	  title: 'Age',
	  dataIndex: 'age',
	},
	{
	  title: 'Address',
	  dataIndex: 'address',
	},
	{
	  title: 'Action',
	  key: 'action',
	  sorter: true,
	  render: () => (
		<Space size="middle">
		  <a>Delete</a>
		  <a className="ant-dropdown-link">
			More actions <DownOutlined />
		  </a>
		</Space>
	  ),
	},
  ];
  
  const data = [];
  for (let i = 1; i <= 10; i++) {
	data.push({
	  key: i,
	  name: 'John Brown',
	  age: `${i}2`,
	  address: `New York No. ${i} Lake Park`,
	  description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
	});
  }

  const handleToggle = prop => enable => {
    setState({ [prop]: enable });
  };
  const handleRowSelectionChange = enable => {
    setState({ rowSelection: enable ? {} : undefined });
  };

    return (
      <>
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        >
          <Form.Item label="loading">
            <Switch checked={state.loading} onChange={handleToggle('loading')} />
          </Form.Item>
        </Form>

		<Form.Item label="Checkbox">
		 <Switch checked={!!state.rowSelection} onChange={handleRowSelectionChange} />
		</Form.Item>

        <Table
          {...state}
          columns={columns}
          dataSource={data}
        />
      </>
    );
}

export default Demo;