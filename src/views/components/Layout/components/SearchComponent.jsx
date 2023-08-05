import 'antd/dist/antd.css';
import React, { useState } from 'react';

function getRandomInt(max, min = 0) {
	return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query) =>
	new Array(getRandomInt(5))
		.join('.')
		.split('.')
		.map((_, idx) => {
			const category = `${query}${idx}`;
			return {
				value: category,
				label: (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
            <span>
              Found {query} on{' '}
							<a
								href={`https://s.taobao.com/search?q=${query}`}
								target="_blank"
								rel="noopener noreferrer"
							>
                {category}
              </a>
            </span>
						<span>{getRandomInt(200, 100)} results</span>
					</div>
				),
			};
		});

const Complete = () => {
	const [ setOptions] = useState([]);

	const handleSearch = (value) => {
		setOptions(value ? searchResult(value) : []);
	};

	const onSelect = (value) => {
	};

	return null;
};
export default Complete;


