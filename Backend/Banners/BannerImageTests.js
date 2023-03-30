const puppeteer = require('puppeteer');
const fs = require('fs');

const BannerImageTests = async (page) => {
	const FileName = `./cypress/fixtures/BannerImages/BannerImageData`;

	const ImageElements = await page.$$eval('img', (elements) => {
		return elements
			.filter((el) => el.naturalWidth > 0 && el.naturalHeight > 0)
			.map((el) => {
				const styles = getComputedStyle(el);
				return {
					source: el.currentSrc,
					styles: {
						complete: el.complete,
						naturalWidth: el.naturalWidth,
						naturalHeight: el.naturalHeight,
					},
				};
			});
	});

	const BannerImageTests = ImageElements.map((Image, index) => {
		console.log(
			`Generating Banner Header Test (${index + 1}/${ImageElements.length})`
		);

		return {
			TestType: 'Image',
			Source: Image.source,
			Name: `Banner Image Test`,
			test: [
				{
					name: 'Verifies Image Height',
					test: {
						check: 'Height',
						current: Image.styles.naturalHeight,
						assertion: 'be.gt',
						value: '0px',
					},
				},
				{
					name: 'Verifies Image Width',
					test: {
						check: 'Width',
						current: Image.styles.naturalWidth,
						assertion: 'be.gt',
						value: '0',
					},
				},
				{
					name: 'Verifies Image Completion',
					test: {
						check: 'Complete',
						current: Image.styles.complete,
						assertion: 'equal',
						value: true,
					},
				},
			],
		};
	});

	BannerImageTests.forEach((element) => {
		console.log('Example Image:', element);
	});

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
			JSON.stringify(BannerImageTests),
			{
				flag: 'a',
			}
		);
		console.log('Test data file creation successful');
	} catch (error) {
		console.log(`Failed to create new test data file`);
		console.log('Error:', error);
	}

	return BannerImageTests;
};

module.exports = { BannerImageTests };
