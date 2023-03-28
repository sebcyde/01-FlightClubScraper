const puppeteer = require('puppeteer');

const BannerCopyTests = async (page, URL, FileName) => {
	const BannerCopys = await page.$$eval('p', (Copys) =>
		Copys.map((Copy) => {
			if (Copy.innerText == '') return;

			const style = window.getComputedStyle(Copy);
			return {
				fontSize: style.getPropertyValue('font-size'),
				fontFamily: style.getPropertyValue('font-family'),
				color: style.getPropertyValue('color'),
				textContent: Copy.innerText,
			};
		})
	);

	const BannerCopyTests = BannerCopys.map((Copy, index) => {
		console.log(
			`Generating Banner Copy Test (${index + 1}/${BannerCopys.length})`
		);

		if (Copy !== null) {
			return {
				name: `${Copy.textContent} Banner Copy Test`,
				test: [
					{
						name: 'Verifies p text content',
						test: {
							url: `${URL}`,
							selector: 'p',
							assertion: 'contain',
							value: `${Copy.textContent}`,
						},
					},
					{
						name: 'Verifies p font sizing',
						test: {
							url: `${URL}`,
							selector: 'p',
							assertion: 'have.css',
							property: 'font-size',
							value: '18px',
						},
					},
					{
						name: 'Verifies p font family',
						test: {
							url: `${URL}`,
							selector: 'p',
							assertion: 'have.css',
							property: 'font-family',
							value: 'BrandonGrotesqueWeb-Reg',
						},
					},
				],
			};
		}
	});

	console.log('Generated all banner copy tests successfully');

	// Write the test case to a file
	require('fs').writeFileSync(
		`${FileName}.json`,
		JSON.stringify(BannerCopyTests),
		{
			flag: 'a',
		}
	);

	// Log the file path for debugging purposes
	console.log(`Test case written to ${FileName}`);

	return BannerCopys;
};

module.exports = { BannerCopyTests };
