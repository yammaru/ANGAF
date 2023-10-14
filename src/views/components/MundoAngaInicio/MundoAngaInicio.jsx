import React, { Fragment } from "react";
import Dashboard from '../Dashboard/Dashboard'
import { Carousel, Col, Image, Row } from "antd";

const MundoAngaInicio = () => {
    const elements = {
		name: "lobo1",
		value: 5524,
		path: [
			"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
			"https://m.media-amazon.com/images/I/61r6tpWTdcL._AC_UF894,1000_QL80_.jpg",
			"https://static.wikia.nocookie.net/overlordmaruyama/images/3/3a/Lupusregina_Beta.png",
		],
		tienda: "Anga",
		id: 2,
		role_model: "La modelo mide 1.60m y tiene una talla S",
		available_sizes: ["M", "S", "XL"],
	};
	return (
		<Row>
        <Col>
            <Carousel autoplay>
                {elements.path.map((imagePath, imgIndex) => (
                    <Image
                        width="100%"
                        height={"100vh"}
                        src={imagePath}
                        alt={`Image ${imgIndex}`}
                        preview={false}
                    />
                ))}
            </Carousel>
        </Col>
    </Row>
	);
};

export default MundoAngaInicio;
