const puppeteer = require('puppeteer');
const fs = require('fs');

const BannerHeaderTests = async (page, URL, Colours) => {
	const FileName = `./cypress/fixtures/BannerHeaders/BannerHeaderData`;

	const h2Elements = await page.$$eval('h2', (elements) => {
		return (
			elements
				.filter((el) => el.textContent.trim().length > 0)
				// filter out elements with empty text content
				.map((el) => {
					const styles = getComputedStyle(el);
					return {
						text: el.textContent.trim(),
						styles: {
							fontSize: styles.fontSize,
							fontWeight: styles.fontWeight,
							fontFamily: styles.fontFamily,
							color: styles.color,
						},
					};
				})
		);
	});

	const BannerHeaderTests = h2Elements.map((Header, index) => {
		console.log(
			`Generating Banner Header Test (${index + 1}/${h2Elements.length})`
		);

		return {
			TestType: 'Header',
			Text: Header.text,
			Name: `${Header.text} Banner Header Test`,
			test: [
				{
					name: 'Verifies H2 font sizing',
					test: {
						check: 'font-size',
						current: Header.styles.fontSize,
						assertion: 'equal',
						value: '40px',
					},
				},
				{
					name: 'Verifies H2 font weighting',
					test: {
						check: 'font-weight',
						current: Header.styles.fontWeight,
						assertion: 'equal',
						value: '700',
					},
				},
				{
					name: 'Verifies H2 font family',
					test: {
						check: 'font-family',
						current: Header.styles.fontFamily,
						assertion: 'equal',
						value: 'BebasNeue-bold',
					},
				},
			],
		};
	});

	// BannerHeaderTests.forEach((element) => {
	// 	console.log('Example Header:', element);
	// });

	// If Test Data already exists - delete it
	if (fs.existsSync(`${FileName}.json`)) {
		console.log(`Removing existing Test Data File at: ${FileName}.json`);
		fs.unlinkSync(`${FileName}.json`);
		console.log('Removal successful');
	}

	// Write test cases to new file
	try {
		console.log(`Creating new test data file at: ${FileName}.json`);
		require('fs').writeFileSync(
			`${FileName}.json`,
			JSON.stringify(BannerHeaderTests),
			{
				flag: 'a',
			}
		);
		console.log('Test data file creation successful');
	} catch (error) {
		console.log(`Failed to create new test data file`);
		console.log('Error:', error);
	}

	return BannerHeaderTests;
};

module.exports = { BannerHeaderTests };
