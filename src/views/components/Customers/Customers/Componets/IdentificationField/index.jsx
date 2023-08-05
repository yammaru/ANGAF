import React from "react"
import {Form, Input} from "antd";

const IdentificationField = ({disable,styles}) => {
	const boom=[
			{	
				required: false,
				min: 7,
				max: 11,
			
			},
			{
				validator: async (_, value) => {
					if (value === undefined) {
						return Promise.reject(new Error(" "));
					} else {
						let spaces = /^(?!\s)/;
						if (value !== "") {
							if (value.length < 6) {
								return Promise.reject(
									new Error(
										"La identificación debe tener al menos 7 dígitos."
									)
								);
							}
							if (!spaces.test(value)) {
								return Promise.reject(
									new Error("Identificiación no válida.")
								);
							}
						} else {
							return Promise.reject(
								new Error("Identificiación vacía.")
							);
						}
					}
				},
			},
		]
	
	return <>
		{disable ? (
			<Form.Item
				name="identification"
				label="Número de identificación"
				rules={[{/*...boom,
					{
						min: 7,
						max: 15,
						message: "Debe tener al menos 7 números y no más de 15.",
					},
				*/			}]}
			>
				<Input disabled={disable} defaultValue="Identificacion" placeholder="Identificacion" style={styles.ItemFormStyle}/>
			</Form.Item>
		):(
			<Form.Item
				name="identification"
				label="Número de identificación"
			
			>
				<Input disabled={disable} placeholder="Identificacion" />
			</Form.Item>
		)}
	</>
}

export default IdentificationField