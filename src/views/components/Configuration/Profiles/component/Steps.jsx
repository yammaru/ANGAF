
import React from 'react';
import "../css/style.scss";
import { Button } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

const StepsComponent = (props) => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div>
			<h4>{props.steps[current].title}</h4>
      <div className="steps-content" key={props.steps[current]}>
				{props.steps[current].content}
			</div>
			<div className="steps-action">
				{current > 0 && (
					<Button type="primary" style={{ margin: '0 8px' }} onClick={() => prev()}>
						<CaretLeftOutlined disabled />
					</Button>
				)}
				{current < props.steps.length - 1 && (
					<Button type="primary" onClick={() => next()}>
						<CaretRightOutlined />
					</Button>
				)}
			</div>
    </div>
  );
};

export default StepsComponent;