const puppeteer = require('puppeteer');

const BannerHeaderTests = async (page, URL, FileName) => {
	const BannerHeaders = await page.$$eval('h2', (Headers) =>
		Headers.map((Header) => {
			if (Header.innerText == '') return;

			const style = window.getComputedStyle(Header);
			return {
				fontSize: style.getPropertyValue('font-size'),
				fontWeight: style.getPropertyValue('font-weight'),
				fontFamily: style.getPropertyValue('font-family'),
				color: style.getPropertyValue('color'),
				textContent: Header.innerText,
			};
		})
	);

	const BannerHeaderTests = BannerHeaders.map((Header, index) => {
		console.log(
			`Generating Banner Header Test (${index + 1}/${BannerHeaders.length})`
		);

		if (Header !== null) {
			return {
				name: `${Header.textContent} Banner Header Test`,
				TestType: 'Header',
				test: [
					{
						name: 'Verifies H2 Text',
						test: {
							url: `${URL}`,
							selector: 'h2',
							assertion: 'contain',
							value: `${Header.textContent}`,
						},
					},
					{
						name: 'Verifies H2 font sizing',
						test: {
							url: `${URL}`,
							selector: 'h2',
							assertion: 'have.css',
							property: 'font-size',
							value: '42px',
						},
					},
					{
						name: 'Verifies H2 font weighting',
						test: {
							url: `${URL}`,
							selector: 'h2',
							assertion: 'have.css',
							property: 'font-weight',
							value: '700',
						},
					},
					{
						name: 'Verifies H2 font family',
						test: {
							url: `${URL}`,
							selector: 'h2',
							assertion: 'have.css',
							property: 'font-family',
							value: 'BebasNeue-bold',
						},
					},
				],
			};
		}
	});

	console.log('Generated all banner header tests successfully');

	return BannerHeaderTests;
};

module.exports = { BannerHeaderTests };