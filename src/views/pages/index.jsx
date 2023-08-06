import { Image } from "antd";
import React, { Fragment, useState } from "react";
import logo from "../../includes/images/fondo.png";

const index = () => {
	
	return (
		
		<div class="fullscreen-image">
			<Image
						width='100%'
						src={logo}
						preview={false}
					/>
       
    </div>	
	
	);
};

export default index;
