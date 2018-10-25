import React from 'react';
import { Spin } from 'antd';

import '../styles/Loader.css';

const Loader = () => (
	<div className="loader">
		<Spin tip="Loading" />
	</div>
);

export default Loader;
