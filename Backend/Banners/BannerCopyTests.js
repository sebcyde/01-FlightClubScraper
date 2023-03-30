const puppeteer = require('puppeteer');
const fs = require('fs');

const BannerCopyTests = async (page, URL, Colours) => {
	const FileName = `./cypress/fixtures/BannerCopy/BannerCopyData`;

	const PElements = await page.$$eval('p', (elements) => {
		return (
			elements
				.filter((el) => el.textContent.trim().length > 0)
				// filter out elements with empty text content
				.map((el) => {
					const styles = getComputedStyle(el);
					return {
						text: el.textContent.trim().replace(/&nbsp;/g, ' '),
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

	const BannerCopyTests = PElements.map((Copy, index) => {
		console.log(
			`Generating Banner Copy Test (${index + 1}/${PElements.length})`
		);

		return {
			TestType: 'Copy',
			Text: Copy.text,
			Name: `Banner Copy Test`,
			test: [
				{
					name: 'Verifies PTag font sizing',
					test: {
						check: 'font-size',
						current: Copy.styles.fontSize,
						assertion: 'equal',
						value: '18px',
					},
				},
				{
					name: 'Verifies PTag font family',
					test: {
						check: 'font-family',
						current: Copy.styles.fontFamily,
						assertion: 'equal',
						value: 'BrandonGrotesqueWeb-Reg',
					},
				},
			],
		};
	});

	// BannerCopyTests.forEach((element) => {
	// 	console.log('Example Copy:', element.Text);
	// 	console.log('break');
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
			JSON.stringify(BannerCopyTests),
			{
				flag: 'a',
			}
		);
		console.log('Test data file creation successful');
	} catch (error) {
		console.log(`Failed to create new test data file`);
		console.log('Error:', error);
	}

	return BannerCopyTests;
};

module.exports = { BannerCopyTests };
