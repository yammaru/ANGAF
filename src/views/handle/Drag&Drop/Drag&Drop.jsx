import React from 'react';
import { CloudUploadOutlined } from "@ant-design/icons";


const upload = ({ label }) => {
	
	return (
		<section>
			<label form="upload">{ label }</label>
			<button>
				<i className={<CloudUploadOutlined />} />
			</button>
		</section>
	);
}

export default upload;