import "../css/dashboard.scss";
import React, {useEffect} from 'react'
import { Row, Col, Image, Carousel,Typography  } from "antd";
import { useDispatch, useSelector} from 'react-redux';
import {fetchAllAdvertisingImage} from '../../../../redux/actions/Configuration/AdvertisingImageAction';
const { Title } = Typography;
const CarouselComponent = () => {

	const dispatch = useDispatch();
	const advertisingsImages = useSelector(state => state?.advertisingImage);

	useEffect(() => dispatch(
		fetchAllAdvertisingImage()),
	[]);

	
  return (
	<Row>
		<Col span={14} offset={5}>
			<Carousel  dotPosition='bottom' autoplay>
				{!Array.isArray(advertisingsImages) &&	advertisingsImages?._payload?.filter(x => x.state !== 0).map((item) => (
					<>
						<Image
						width='100%'
						height={280}
						src={item?.multimedia?.path}
						preview={true}
					/>
					 <Title level={4}>	{item?.description}</Title>
					
					</>
				))}
			</Carousel>		
		</Col>
	</Row>
  );
}

export default CarouselComponent;