import React from 'react';
import { Breadcrumb } from 'antd';

class Navbar extends React.Component {
	render() {
		return (
			<Breadcrumb>
				<Breadcrumb.Item>Test 1</Breadcrumb.Item>
				<Breadcrumb.Item>Test 2</Breadcrumb.Item>
				<Breadcrumb.Item>Test 3</Breadcrumb.Item>
			</Breadcrumb>
		);
	}
}

export default Navbar;
