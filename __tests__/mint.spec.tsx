import { getPage } from 'next-page-tester';
import { screen, fireEvent } from '@testing-library/react';

describe('Home page', () => {
	it('renders actions', async () => {
		try {
			const { render } = await getPage({
				route: '/',
				useDocument: true,
			});
			render();
		} catch (e) {
			console.log(e);
		}
		// expect(screen.getByText('MINT sUSD')).toBeInTheDocument();
		// fireEvent.click(screen.getByText('Link'));
		// await screen.findByText('Linked page');
	});
});

// import * as React from 'react';
// import { shallow } from 'enzyme';
// import HomePage from '../pages/index';

// describe('Pages', () => {
// 	describe('Index', () => {
// 		it('should render without throwing an error', function () {
// 			const wrap = shallow(<HomePage />);
// 			expect(wrap.text()).toContain('MINT sUSD');
// 		});
// 	});
// });
