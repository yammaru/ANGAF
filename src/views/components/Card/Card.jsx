import React from 'react';
import { Card } from 'antd';

const Profile = (props) => {
  return(
		<Card 
		title={props.title} 
		extra={
			<>
				{ props.modal }
				{ props.drawer }
			</>
		}
		style={{ minHeight: props.height }}
		>
			{ props.table }
		</Card>
  );
}

export default Profile;